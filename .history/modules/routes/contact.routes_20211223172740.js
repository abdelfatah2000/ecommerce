const app = require("express").Router();
const controller = require("../controllers/contactus.controllers");

app.post("/contactUs", controller.addmessage);
app.g
module.exports = app;