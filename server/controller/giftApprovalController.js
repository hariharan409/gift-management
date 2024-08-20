const {responseHelper} = require("../helper/utilityHelper");
const { getGiftPendingApprovalCount,getGiftApproval,approveGift } = require("../service/giftApprovalService");

exports.getGiftPendingApprovalCount = async(req,res) => {
    try {
        const email = req.query.payload;
        if(!email) {
            throw new Error("Something went wrong!.");
          } 
        const responseData = await getGiftPendingApprovalCount(email);
        responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}

exports.getGiftApproval = async(req,res) => {
    try {
        const email = req.query.payload;
        if(!email) {
            throw new Error("Something went wrong!.");
          } 
        const responseData = await getGiftApproval(email);
        responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}

exports.approveGift = async(req,res) => {
    try {
        const { giftID,approvalID,approverEmail } = req.query.payload;
        if(!giftID || !approvalID || !approverEmail) {
            throw new Error("Something went wrong!.");
          } 
        const responseData = await approveGift(giftID,approvalID,approverEmail);
        responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}
