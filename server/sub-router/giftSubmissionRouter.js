const app = require("express").Router();
const {getGiftCategory,createGift,getGiftSubmission,getGiftSubmissionByID,getApprovedGiftSubmission,getRejectedGiftSubmission} = require("../controller/giftSubmissionController");

module.exports = () => {
    // < ------------- GET REQUEST ------------------ > //
    app.get("/get-gift-category",getGiftCategory);
    app.get("/get-gift-submission",getGiftSubmission);
    app.get("/get-approved-gift-submission",getApprovedGiftSubmission);
    app.get("/get-rejected-gift-submission",getRejectedGiftSubmission);
    app.get("/get-gift-by-id",getGiftSubmissionByID);

    // < ------------- POST REQUEST ------------------ > //
    app.post("/create-gift",createGift);

    return app;
}