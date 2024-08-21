const { sendEmailToApprover, sendGiftSuccessEmailToRequestor, sendGiftRejectionEmailToRequestor } = require("../third-party-api/email/sendEMail");


exports.sendEmailToApprover = (giftID,giftAmount,requestorEmail,approverEmail) => {
    try {
        sendEmailToApprover(giftID,giftAmount,requestorEmail,approverEmail);
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.sendGiftSuccessEmailToRequestor = (giftID,requestorEmail,giftAmount) => {
    try {
        sendGiftSuccessEmailToRequestor(giftID,requestorEmail,giftAmount);
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.sendGiftRejectionEmailToRequestor = (giftID,requestorEmail,giftAmount,rejecterEmail,rejectionReason) => {
    try {
        sendGiftRejectionEmailToRequestor(giftID,requestorEmail,giftAmount,rejecterEmail,rejectionReason);
    } catch (error) {
        throw new Error(error.message || error);
    }
}