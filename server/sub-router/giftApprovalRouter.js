const app = require("express").Router();
const {getGiftPendingApprovalCount,getGiftApproval,approveGift} = require("../controller/giftApprovalController");

module.exports = () => {
    // < ------------- GET REQUEST ------------------ > //
    app.get("/get-gift-pending-approval-count",getGiftPendingApprovalCount);
    app.get("/get-gift-approval",getGiftApproval);
    app.get("/approve-gift",approveGift);

    // < ------------- POST REQUEST ------------------ > //

    return app;
}