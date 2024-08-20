const app = require("express").Router();
const yourSubmissionRouter = require("./sub-router/YourSubmissionRouter");
const yourApprovalRouter = require("./sub-router/yourApprovalRouter");

const routeCheck = () => {
    app.get("/", (_,res) => res.send({ response: "Gift and hospitality APIs are ready to serve." }).status(200));
}

module.exports = () => {
    routeCheck();
    app.use("/gift/submission",yourSubmissionRouter());
    app.use("/gift/approval",yourApprovalRouter());

    return app;
};