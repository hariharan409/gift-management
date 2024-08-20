const { getGiftPendingApprovalCount,getGiftApproval,approveGift } = require("../repository/giftApprovalRepository");

exports.getGiftPendingApprovalCount = async(email) => {
    try {
        return await getGiftPendingApprovalCount(email);
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getGiftApproval = async(email) => {
    try {
        return await getGiftApproval(email);
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.approveGift = async(giftID,approvalID,approverEmail) => {
    try {
        return await approveGift(giftID,approvalID,approverEmail);
    } catch (error) {
        throw new Error(error.message);
    }
}