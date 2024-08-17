const app = require("express").Router();
const {getGiftCategory,createGift,getGiftSubmission,getGiftSubmissionByID} = require("../controller/giftController");

module.exports = () => {
    // < ------------- GET REQUEST ------------------ > //
    app.get("/get-gift-category",getGiftCategory);
    app.get("/get-gift",getGiftSubmission);
    app.get("/get-gift-by-id",getGiftSubmissionByID);

    // < ------------- POST REQUEST ------------------ > //
    app.post("/create-gift",createGift);

    return app;
}