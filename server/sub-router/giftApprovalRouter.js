const app = require("express").Router();
const {getGiftPendingApprovalCount,getGiftApproval,getGiftApprovedByYou,getGiftRejectedByYou,approveGift,rejectGift} = require("../controller/giftApprovalController");

module.exports = () => {
    // < ------------- GET REQUEST ------------------ > //
    app.get("/get-gift-pending-approval-count",getGiftPendingApprovalCount);
    app.get("/get-gift-approval",getGiftApproval);
    app.get("/get-gift-approved-by-you",getGiftApprovedByYou);
    app.get("/get-gift-rejected-by-you",getGiftRejectedByYou);
    app.get("/approve-gift",approveGift);
    app.get("/reject-gift",rejectGift);

    // < ------------- POST REQUEST ------------------ > //

    return app;
}