const { getGiftPendingApprovalCount,getGiftApproval } = require("../repository/giftApprovalRepository");

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