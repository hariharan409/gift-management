const {responseHelper} = require("../helper/utilityHelper");
const { getGiftCategory,createGift,getYourSubmission,getGiftSubmissionByID,getYourApprovedSubmission,getYourRejectedSubmission} = require("../service/YourSubmissionService");

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

exports.getYourSubmission = async(req,res) => {
    try {
        const email = req.query.payload;
        if(!email) {
            throw new Error("Something went wrong!.");
          } 
        const responseData = await getYourSubmission(email);
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

exports.getYourApprovedSubmission = async(req,res) => {
    try {
        const email = req.query.payload;
        if(!email) {
            throw new Error("Something went wrong!.");
        }
        const responseData = await getYourApprovedSubmission(email);
        responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}

exports.getYourRejectedSubmission = async(req,res) => {
    try {
        const email = req.query.payload;
        if(!email) {
            throw new Error("Something went wrong!.");
        }
        const responseData = await getYourRejectedSubmission(email);
        responseHelper(res,responseData,null);
    } catch (error) {
        responseHelper(res,null,error);
    }
}
