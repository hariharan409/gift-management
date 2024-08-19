const app = require("express").Router();
const {getGiftPendingApprovalCount,getGiftApproval} = require("../controller/giftApprovalController");

module.exports = () => {
    // < ------------- GET REQUEST ------------------ > //
    app.get("/get-gift-pending-approval-count",getGiftPendingApprovalCount);
    app.get("/get-gift-approval",getGiftApproval);

    // < ------------- POST REQUEST ------------------ > //

    return app;
}