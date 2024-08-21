const { sendEmailToApprover } = require("../third-party-api/email/sendEMail");


exports.sendEmailToApprover = (giftID,giftAmount,requestorEmail,approverEmail) => {
    try {
        sendEmailToApprover(giftID,giftAmount,requestorEmail,approverEmail);
    } catch (error) {
        throw new Error(error.message || error);
    }
}