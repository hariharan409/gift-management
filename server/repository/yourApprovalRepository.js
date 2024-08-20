const { executeSqlQuery } = require("../config/sqlConnector");
const { SQL_TABLE } = require("../config/sqlSchema");

exports.getYourPendingApprovalCount = async(email) => {
    try {
        const giftApprovalCount = await executeSqlQuery(
            `SELECT COUNT(*) as pendingApproval FROM ${SQL_TABLE.GIFT_APPROVAL} as ga LEFT JOIN ${SQL_TABLE.GIFT_SUBMISSION} as gs ON ga.gift_id = gs.id 
            WHERE ga.approver_email = '${email}' AND ga.is_approved = 0 AND ga.approval_required = 1 AND ga.can_approve = 1 AND gs.is_rejected = 0 AND 
            gs.is_approved = 0
            `,[]
        ).then((response) => response[0].pendingApproval); 
        return giftApprovalCount;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getPendingApprovalByYou = async(email) => {
    try {
        const approvalList = await executeSqlQuery(
            `SELECT ga.id as approvalID,gs.id as giftID,gs.vendor_name as vendorName,gs.gift_amount as giftAmount
            FROM ${SQL_TABLE.GIFT_APPROVAL} as ga LEFT JOIN ${SQL_TABLE.GIFT_SUBMISSION} as gs ON ga.gift_id = gs.id WHERE
            ga.approver_email = '${email}' AND ga.is_approved = 0 AND ga.approval_required = 1 AND ga.can_approve = 1 AND gs.is_rejected = 0 AND gs.is_approved = 0 ORDER BY giftID DESC
            `,[]
        );
        return approvalList;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getGiftApprovedByYou = async(email) => {
    try {
        const giftApprovedList = await executeSqlQuery(
            `SELECT ga.id as approvalID,gs.id as giftID,gs.vendor_name as vendorName,gs.gift_amount as giftAmount
            FROM ${SQL_TABLE.GIFT_APPROVAL} as ga LEFT JOIN ${SQL_TABLE.GIFT_SUBMISSION} as gs ON ga.gift_id = gs.id WHERE
            ga.approver_email = '${email}' AND ga.is_approved = 1 AND ga.approval_required = 1 AND gs.is_rejected = 0 ORDER BY giftID DESC
            `,[]
        );
        return giftApprovedList;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getGiftRejectedByYou = async(email) => {
    try {
        const giftRejectedList = await executeSqlQuery(
            `SELECT ga.id as approvalID,gs.id as giftID,gs.rejection_reason as rejectedReason,gs.requestor_email as requestedBy
            FROM ${SQL_TABLE.GIFT_APPROVAL} as ga LEFT JOIN ${SQL_TABLE.GIFT_SUBMISSION} as gs ON ga.gift_id = gs.id WHERE
            ga.approver_email = '${email}' and gs.is_rejected = 1 and gs.rejected_by = '${email}' ORDER BY giftID DESC
            `,[]
        );
        return giftRejectedList;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.approveGift = async(giftID,approvalID,approverEmail) => {
    try {
        await executeSqlQuery(
            `UPDATE ${SQL_TABLE.GIFT_APPROVAL} SET is_approved = 1,can_approve = 0,approved_at = GETDATE() WHERE id = ${approvalID}`,[]
        );
        const nextApproverList = await executeSqlQuery(
            `SELECT TOP(1) * FROM ${SQL_TABLE.GIFT_APPROVAL} WHERE approval_required = 1 AND is_approved = 0 
            AND can_approve = 0 AND gift_id = ${giftID} ORDER BY approval_sequence ASC
            `,[]
        );
        if(nextApproverList instanceof Array && nextApproverList.length > 0) {
            await executeSqlQuery(
                `UPDATE ${SQL_TABLE.GIFT_APPROVAL} SET can_approve = 1 WHERE id = ${nextApproverList[0].id}
                `,[]
            )
        } else {
            await executeSqlQuery(
                `UPDATE ${SQL_TABLE.GIFT_SUBMISSION} SET is_approved = 1 WHERE id = ${giftID}`,[]
            );
        }
        return await this.getGiftApproval(approverEmail);
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.rejectGift = async(giftID,rejectionReason,rejecterEmail) => {
    try {
        await executeSqlQuery(
            `UPDATE ${SQL_TABLE.GIFT_SUBMISSION} SET is_rejected = 1,rejection_reason = '${rejectionReason}',rejected_by = '${rejecterEmail}'
            WHERE id = ${giftID}
            `,[]
        );
        return await this.getGiftApproval(rejecterEmail);
    } catch (error) {
        throw new Error(error.message || error);
    }
}