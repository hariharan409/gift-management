const app = require("express").Router();
const {getYourPendingApprovalCount,getPendingApprovalByYou,getGiftApprovedByYou,getGiftRejectedByYou,approveGift,rejectGift} = require("../controller/yourApprovalController");

module.exports = () => {
    // < ------------- GET REQUEST ------------------ > //
    app.get("/get-your-pending-approval-count",getYourPendingApprovalCount);
    app.get("/get-pending-approval-by-you",getPendingApprovalByYou);
    app.get("/get-gift-approved-by-you",getGiftApprovedByYou);
    app.get("/get-gift-rejected-by-you",getGiftRejectedByYou);
    app.get("/approve-gift",approveGift);
    app.get("/reject-gift",rejectGift);

    // < ------------- POST REQUEST ------------------ > //

    return app;
}