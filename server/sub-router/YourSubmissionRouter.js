const app = require("express").Router();
const {getGiftCategory,createGift,getYourSubmission,getYourSubmissionByID,getYourApprovedSubmission,getYourRejectedSubmission} = require("../controller/YourSubmissionController");

module.exports = () => {
    // < ------------- GET REQUEST ------------------ > //
    app.get("/get-gift-category",getGiftCategory);
    app.get("/get-your-gift-submission",getYourSubmission);
    app.get("/get-your-approved-gift-submission",getYourApprovedSubmission);
    app.get("/get-your-rejected-gift-submission",getYourRejectedSubmission);
    app.get("/get-your-submission-by-id",getYourSubmissionByID);

    // < ------------- POST REQUEST ------------------ > //
    app.post("/create-gift",createGift);

    return app;
}