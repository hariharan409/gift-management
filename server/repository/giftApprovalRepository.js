const { executeSqlQuery } = require("../config/sqlConnector");
const { SQL_TABLE } = require("../config/sqlSchema");

exports.getGiftPendingApprovalCount = async(email) => {
    try {
        const giftApprovalCount = await executeSqlQuery(
            `SELECT COUNT(*) as pendingApproval FROM ${SQL_TABLE.GIFT_APPROVAL} WHERE approver_email = '${email}' 
            AND is_approved = 0 AND approval_required = 1
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
            ga.approver_email = '${email}' AND ga.is_approved = 0 AND ga.approval_required = 1  ORDER BY giftID ASC
            `,[]
        );
        console.log(approvalList);
        return approvalList;
    } catch (error) {
        throw new Error(error.message || error);
    }
}