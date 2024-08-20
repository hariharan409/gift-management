const {responseHelper} = require("../helper/utilityHelper");
const { getGiftCategory,createGift,getGiftSubmission,getGiftSubmissionByID,getApprovedGiftSubmission,getRejectedGiftSubmission} = require("../service/giftSubmissionService");

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

exports.getApprovedGiftSubmission = async(req,res) => {
    try {
        const email = req.query.payload;
        if(!email) {
            throw new Error("Something went wrong!.");
        }
        const responseData = await getApprovedGiftSubmission(email);
        responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}

exports.getRejectedGiftSubmission = async(req,res) => {
    try {
        const email = req.query.payload;
        if(!email) {
            throw new Error("Something went wrong!.");
        }
        const responseData = await getRejectedGiftSubmission(email);
        responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}
