const app = require("express").Router();
const giftRouter = require("./sub-router/giftRouter");

const routeCheck = () => {
    app.get("/", (_,res) => res.send({ response: "Gift and hospitality APIs are ready to serve." }).status(200));
}

module.exports = () => {
    routeCheck();
    app.use("/gift",giftRouter());

    return app;
};