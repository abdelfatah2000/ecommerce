const app = require("express").Router();
const controller = require("../controllers/contactus.controllers");

app.post("/contactUs", controller.addmessage);
app.get("/allMessages", con)
module.exports = app;