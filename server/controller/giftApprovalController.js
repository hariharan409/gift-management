const {responseHelper} = require("../helper/utilityHelper");
const { getGiftPendingApprovalCount,getGiftApproval } = require("../service/giftApprovalService");

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
