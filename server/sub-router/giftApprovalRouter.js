const app = require("express").Router();
const {getGiftPendingApprovalCount,getGiftApproval,approveGift,rejectGift} = require("../controller/giftApprovalController");

module.exports = () => {
    // < ------------- GET REQUEST ------------------ > //
    app.get("/get-gift-pending-approval-count",getGiftPendingApprovalCount);
    app.get("/get-gift-approval",getGiftApproval);
    app.get("/approve-gift",approveGift);
    app.get("/reject-gift",rejectGift);

    // < ------------- POST REQUEST ------------------ > //

    return app;
}