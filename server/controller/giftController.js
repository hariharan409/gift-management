const {responseHelper} = require("../helper/utilityHelper");
const { getGiftCategory,createGift,getGiftSubmission,getGiftSubmissionByID,getGiftPendingApprovalCount,getGiftApproval } = require("../service/giftService");

exports.getGiftCategory = async(_,res) => {
    try {
        const responseData = await getGiftCategory();
        responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}


exports.createGift = async(req,res) => {
    try {
      const gift = req.body;
      if(!gift) {
        throw new Error("Something went wrong!.");
      } 
      const responseData = await createGift(gift);
      responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}

exports.getGiftSubmission = async(req,res) => {
    try {
        const email = req.query.payload;
        if(!email) {
            throw new Error("Something went wrong!.");
          } 
        const responseData = await getGiftSubmission(email);
        responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}

exports.getGiftSubmissionByID = async(req,res) => {
    try {
        const giftID = parseInt(req.query.payload);
        if(!giftID) {
            throw new Error("Something went wrong!.");
          } 
        const responseData = await getGiftSubmissionByID(giftID);
        responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}

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
