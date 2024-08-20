const { getGiftCategory,createGift,updateGift,getYourSubmission,getYourSubmissionByID,getYourApprovedSubmission,getYourRejectedSubmission } = require("../repository/YourSubmissionRepository");


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

exports.getYourSubmission = async(email) => {
    try {
        return await getYourSubmission(email);
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getYourSubmissionByID = async(giftID) => {
    try {
        return await getYourSubmissionByID(giftID);
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getYourApprovedSubmission = async(email) => {
    try {
        return await getYourApprovedSubmission(email);
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getYourRejectedSubmission = async(email) => {
    try {
        return await getYourRejectedSubmission(email);
    } catch (error) {
        throw new Error(error.message);
    }
}