require("dotenv").config();
const express = require("express");
const EXPRESS_SERVER = express();
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const router = require("./mainRouter.js");

//BACKEND [ APP PORT NUMBER, SUB DIRECTORY ] FETCHING FROM ENV FILE
const PORT = process.env.GIFT_MANAGEMENT_SERVER_PORT;
const APP_SUBDIRECTORY = process.env.GIFT_MANAGEMENT_SERVER_SUBDIRECTORY;

EXPRESS_SERVER.use(cors());
EXPRESS_SERVER.options("*", cors());
EXPRESS_SERVER.use(bodyParser.json({ limit: "50mb" }));
EXPRESS_SERVER.use(`/${APP_SUBDIRECTORY}/public`, express.static("public"));
EXPRESS_SERVER.use(`/${APP_SUBDIRECTORY}`,router());

const GIFT_MANAGEMENT_SERVER = http.createServer(EXPRESS_SERVER);

GIFT_MANAGEMENT_SERVER.listen(PORT, () => {
  console.log(`The server is up and listening on port ${PORT}`);
});