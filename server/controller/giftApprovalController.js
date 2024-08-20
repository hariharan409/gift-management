const {responseHelper} = require("../helper/utilityHelper");
const { getGiftPendingApprovalCount,getGiftApproval,getGiftApprovedByYou,getGiftRejectedByYou,approveGift,rejectGift } = require("../service/giftApprovalService");

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

exports.getGiftApprovedByYou = async(req,res) => {
    try {
        const email = req.query.payload;
        if(!email) {
            throw new Error("Something went wrong!.");
          } 
        const responseData = await getGiftApprovedByYou(email);
        responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}

exports.getGiftRejectedByYou = async(req,res) => {
    try {
        const email = req.query.payload;
        if(!email) {
            throw new Error("Something went wrong!.");
          } 
        const responseData = await getGiftRejectedByYou(email);
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

exports.rejectGift = async(req,res) => {
    try {
        const { giftID,rejectionReason,rejecterEmail } = req.query.payload;
        if(!giftID || !rejecterEmail) {
            throw new Error("Something went wrong!.");
          } 
        const responseData = await rejectGift(giftID,rejectionReason,rejecterEmail);
        responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}
