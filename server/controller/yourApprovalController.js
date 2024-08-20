const {responseHelper} = require("../helper/utilityHelper");
const { getYourPendingApprovalCount,getPendingApprovalByYou,getGiftApprovedByYou,getGiftRejectedByYou,approveGift,rejectGift } = require("../service/yourApprovalService");

exports.getYourPendingApprovalCount = async(req,res) => {
    try {
        const email = req.query.payload;
        if(!email) {
            throw new Error("Something went wrong!.");
          } 
        const responseData = await getYourPendingApprovalCount(email);
        responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}

exports.getPendingApprovalByYou = async(req,res) => {
    try {
        const email = req.query.payload;
        if(!email) {
            throw new Error("Something went wrong!.");
          } 
        const responseData = await getPendingApprovalByYou(email);
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
