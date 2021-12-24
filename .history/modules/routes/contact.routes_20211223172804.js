const app = require("express").Router();
const controller = require("../controllers/contactus.controllers");

app.post("/contactUs", controller.addmessage);
app.get("/allMessages", controller.getallmessages)
module.exports = app;