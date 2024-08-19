const app = require("express").Router();
const {getGiftCategory,createGift,getGiftSubmission,getGiftSubmissionByID,getGiftPendingApprovalCount,getGiftApproval} = require("../controller/giftController");

module.exports = () => {
    // < ------------- GET REQUEST ------------------ > //
    app.get("/get-gift-category",getGiftCategory);
    app.get("/get-gift-submission",getGiftSubmission);
    app.get("/get-gift-by-id",getGiftSubmissionByID);
    app.get("/get-gift-pending-approval-count",getGiftPendingApprovalCount);
    app.get("/get-gift-approval",getGiftApproval);

    // < ------------- POST REQUEST ------------------ > //
    app.post("/create-gift",createGift);

    return app;
}