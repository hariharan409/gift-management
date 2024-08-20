const { getGiftCategory,createGift,updateGift,getGiftSubmission,getGiftSubmissionByID,getApprovedGiftSubmission,getRejectedGiftSubmission } = require("../repository/giftSubmissionRepository");


exports.getGiftCategory = async() => {
    try {
        return await getGiftCategory();
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.createGift = async(gift) => {
    try {
        /* IF THE PROPERTY - ID HAVING DATA, MEANS USER IS TRYING TO UPDATE THE FORM, ELSE USER IS SUBMITTING NEW FORM */
        return await gift.id ? updateGift(gift) : createGift(gift);
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getGiftSubmission = async(email) => {
    try {
        return await getGiftSubmission(email);
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getGiftSubmissionByID = async(giftID) => {
    try {
        return await getGiftSubmissionByID(giftID);
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getApprovedGiftSubmission = async(email) => {
    try {
        return await getApprovedGiftSubmission(email);
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getRejectedGiftSubmission = async(email) => {
    try {
        return await getRejectedGiftSubmission(email);
    } catch (error) {
        throw new Error(error.message);
    }
}