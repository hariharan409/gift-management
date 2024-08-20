const { getYourPendingApprovalCount,getPendingApprovalByYou,getGiftApprovedByYou,getGiftRejectedByYou,approveGift,rejectGift } = require("../repository/yourApprovalRepository");

exports.getYourPendingApprovalCount = async(email) => {
    try {
        return await getYourPendingApprovalCount(email);
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getPendingApprovalByYou = async(email) => {
    try {
        return await getPendingApprovalByYou(email);
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