const { getGiftPendingApprovalCount,getGiftApproval,getGiftApprovedByYou,getGiftRejectedByYou,approveGift,rejectGift } = require("../repository/giftApprovalRepository");

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

exports.getGiftApprovedByYou = async(email) => {
    try {
        return await getGiftApprovedByYou(email);
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getGiftRejectedByYou = async(email) => {
    try {
        return await getGiftRejectedByYou(email);
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

exports.rejectGift = async(giftID,rejectionReason,rejecterEmail) => {
    try {
        return await rejectGift(giftID,rejectionReason,rejecterEmail);
    } catch (error) {
        throw new Error(error.message);
    }
}