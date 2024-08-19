const app = require("express").Router();
const {getGiftCategory,createGift,getGiftSubmission,getGiftSubmissionByID,getGiftPendingApprovalCount} = require("../controller/giftController");

module.exports = () => {
    // < ------------- GET REQUEST ------------------ > //
    app.get("/get-gift-category",getGiftCategory);
    app.get("/get-gift",getGiftSubmission);
    app.get("/get-gift-by-id",getGiftSubmissionByID);
    app.get("/get-gift-pending-approval-count",getGiftPendingApprovalCount);

    // < ------------- POST REQUEST ------------------ > //
    app.post("/create-gift",createGift);

    return app;
}