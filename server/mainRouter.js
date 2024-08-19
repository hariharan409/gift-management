const app = require("express").Router();
const giftSubmissionRouter = require("./sub-router/giftSubmissionRouter");
const giftApprovalRouter = require("./sub-router/giftApprovalRouter");

const routeCheck = () => {
    app.get("/", (_,res) => res.send({ response: "Gift and hospitality APIs are ready to serve." }).status(200));
}

module.exports = () => {
    routeCheck();
    app.use("/gift/submission",giftSubmissionRouter());
    app.use("/gift/approval",giftApprovalRouter());

    return app;
};