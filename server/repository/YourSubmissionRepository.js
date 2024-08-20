const { executeSqlQuery } = require("../config/sqlConnector");
const { SQL_TABLE } = require("../config/sqlSchema");


exports.getGiftCategory = async() => {
    try {
        const giftCategoryList = await executeSqlQuery(
            `SELECT * FROM ${SQL_TABLE.GIFT_CATEGORY} order by id`,[]
        );
        if(giftCategoryList instanceof Array && giftCategoryList.length > 0) {
            return giftCategoryList;
        }
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.createGift = async(gift) => {
    try {
        /* THE QUERY select SCOPE_IDENTITY() AS id; HELPS TO RETURN THE PRIMARY KEY OF PERSISTED DATA ON THE DATABASE TABLE */
        const result = await executeSqlQuery(
            `INSERT INTO ${SQL_TABLE.GIFT_SUBMISSION} (gift_category_id,gift_type,business_purpose,requestor_email,
            gift_description,vendor_name,remarks,gift_amount,is_vendor_government_official,internal_higher_position_name,
            receipt_image) VALUES (${gift.giftCategory.id},'${gift.giftType}','${gift.businessDescription}','${gift.requestorEmail}',
            '${gift.giftDescription}','${gift.vendor}','${gift.remarks}',${gift.giftValue},${gift.isGovernmentOfficial},
            '${gift.higherPositionName}','${gift.receiptImage}');
            select SCOPE_IDENTITY() AS id;
            `,[]
        );
        const giftID = result[0].id;
        if(giftID && gift.emailAcknowledgements instanceof Array && gift.emailAcknowledgements.length > 0) {
            for(const approval of gift.emailAcknowledgements) {
                await executeSqlQuery(
                    `INSERT INTO ${SQL_TABLE.GIFT_APPROVAL} (gift_id,approver_email,approval_sequence,is_approved,approval_required,can_approve)
                    VALUES (${giftID},'${approval.email}',${approval.approvalSequence},${approval.isApproved},${approval.email ? 1 : 0},
                    ${approval.canApprove});
                    `,[]
                );
            }
        };
        return true;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.updateGift = async(gift) => {
    try {
        /* UPDATING THE GIFT SUBMISSION FORM */
        await executeSqlQuery(
            `UPDATE ${SQL_TABLE.GIFT_SUBMISSION} SET 
            gift_category_id = ${gift.giftCategory.id},
            gift_type = '${gift.giftType}',
            business_purpose = '${gift.businessDescription}',
            requestor_email = '${gift.requestorEmail}',
            gift_description = '${gift.giftDescription}',
            vendor_name = '${gift.vendor}',
            remarks = '${gift.remarks}',
            gift_amount = ${gift.giftValue},
            is_vendor_government_official = ${gift.isGovernmentOfficial},
            internal_higher_position_name = '${gift.higherPositionName}',
            receipt_image = '${gift.receiptImage}' WHERE id = ${gift.id}
            `,[]
        );
        /* REMOVING THE DATA FROM APPROVAL TABLE BY GIFT ID AND REINSERT AGAIN */
        await executeSqlQuery(
            `DELETE FROM ${SQL_TABLE.GIFT_APPROVAL} WHERE gift_id = ${gift.id}
            `,[]
        );

        if(gift.emailAcknowledgements instanceof Array && gift.emailAcknowledgements.length > 0) {
            for(const approval of gift.emailAcknowledgements) {
                await executeSqlQuery(
                    `INSERT INTO ${SQL_TABLE.GIFT_APPROVAL} (gift_id,approver_email,approval_sequence,is_approved,approval_required,can_approve)
                    VALUES (${gift.id},'${approval.email}',${approval.approvalSequence},${approval.isApproved},${approval.email ? 1 : 0},
                    ${approval.canApprove});
                    `,[]
                );
            }
        };
        return true;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getYourSubmission = async(email) => {
    try {
        const giftSubmissionList = await executeSqlQuery(
            `SELECT id,vendor_name as vendorName,gift_amount as giftAmount,isEdit = 1 FROM ${SQL_TABLE.GIFT_SUBMISSION} 
            WHERE requestor_email = '${email}' AND is_rejected = 0 AND is_approved = 0 order by id desc`,[]
        );
        if(giftSubmissionList instanceof Array && giftSubmissionList.length > 0) {
            for(const gift of giftSubmissionList) {
                const giftApprovalList = await executeSqlQuery(
                    `SELECT id,approver_email as approverEmail,approval_sequence as approvalSequence,is_approved as isApproved,
                    can_approve as canApprove FROM ${SQL_TABLE.GIFT_APPROVAL} WHERE gift_id = ${gift.id} AND approval_required = 1 
                    ORDER BY approvalSequence asc`,[]
                );
                gift.approvalList = giftApprovalList;
                /* IF ANY ONE OF THE APPROVERS HAS APPROVED THE FORM, WE SHOULD RESTRICT USER TO EDIT THE FORM*/
                if(giftApprovalList.filter((approval) => approval.isApproved).length > 0) {
                    gift.isEdit = 0;
                };
            };
        };
        return giftSubmissionList;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getYourApprovedSubmission = async(email) => {
    try {
        const giftApprovedSubmissionList = await executeSqlQuery(
            `SELECT id,gift_amount as giftValue,vendor_name as vendor FROM ${SQL_TABLE.GIFT_SUBMISSION} 
            WHERE requestor_email = '${email}' AND is_approved = 1 order by id desc`,[]
        );
        return giftApprovedSubmissionList;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getYourRejectedSubmission = async(email) => {
    try {
        const giftRejectedSubmissionList = await executeSqlQuery(
            `SELECT id,rejection_reason as rejectedReason,rejected_by as rejectedBY FROM ${SQL_TABLE.GIFT_SUBMISSION} 
            WHERE requestor_email = '${email}' AND is_rejected = 1 order by id desc`,[]
        );
        return giftRejectedSubmissionList;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getGiftSubmissionByID = async(giftID) => {
    try {
        /* ID IS UNIQUE, SO IT IS ALWAYS GOING TO RETURN SINGLE OBJECT OF ARRAY */
        const giftSubmission = await executeSqlQuery(
            `SELECT 
            id,
            vendor_name as vendor,
            gift_type as giftType,
            business_purpose as businessDescription,
            requestor_email as requestorEmail,
            gift_description as giftDescription,
            remarks,
            gift_amount as giftValue,
            internal_higher_position_name as higherPositionName,
            is_vendor_government_official as isGovernmentOfficial,
            receipt_image as receiptImage,
            (SELECT * FROM ${SQL_TABLE.GIFT_CATEGORY} WHERE id = gift_category_id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS giftCategory
            FROM ${SQL_TABLE.GIFT_SUBMISSION} WHERE id=${giftID}`,[]
        ).then((tempArray) => {
            if(tempArray instanceof Array && tempArray.length > 0) {
                let tempObj = tempArray[0];
                tempObj.giftCategory = JSON.parse(tempObj.giftCategory);
                return tempObj;
            }
        });
        if(giftSubmission) {
            const giftApprovalList = await executeSqlQuery(
                `SELECT id,approver_email as email,approval_sequence as approvalSequence,is_approved as isApproved, 
                approval_required as approvalRequired,can_approve as canApprove FROM ${SQL_TABLE.GIFT_APPROVAL} WHERE 
                gift_id = ${giftSubmission.id} ORDER BY approvalSequence asc`,[]
            ); 
            if(giftApprovalList instanceof Array && giftApprovalList.length > 0) {
                giftSubmission.emailAcknowledgements = giftApprovalList;
            }
        }
        return giftSubmission;
    } catch (error) {
        throw new Error(error.message || error);
    }
}