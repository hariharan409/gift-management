const { executeSqlQuery } = require("../config/sqlConnector");
const { SQL_TABLE } = require("../config/sqlSchema");

exports.getGiftPendingApprovalCount = async(email) => {
    try {
        const giftApprovalCount = await executeSqlQuery(
            `SELECT COUNT(*) as pendingApproval FROM ${SQL_TABLE.GIFT_APPROVAL} WHERE approver_email = '${email}' 
            AND is_approved = 0 AND approval_required = 1 AND can_approve = 1
            `,[]
        ).then((response) => response[0].pendingApproval); 
        return giftApprovalCount;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getGiftApproval = async(email) => {
    try {
        const approvalList = await executeSqlQuery(
            `SELECT ga.id as approvalID,gs.id as giftID,gs.vendor_name as vendorName,gs.gift_amount as giftAmount
            FROM ${SQL_TABLE.GIFT_APPROVAL} as ga LEFT JOIN ${SQL_TABLE.GIFT_SUBMISSION} as gs ON ga.gift_id = gs.id WHERE
            ga.approver_email = '${email}' AND ga.is_approved = 0 AND ga.approval_required = 1 AND ga.can_approve = 1 ORDER BY giftID ASC
            `,[]
        );
        return approvalList;
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