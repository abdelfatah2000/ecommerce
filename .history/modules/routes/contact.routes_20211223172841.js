const app = require("express").Router();
const controller = require("../controllers/contactus.controllers");

app.post("/contactUs", controller.addmessage);
app.get("/allMessages", controller.getallmessages);
app.delete("/deleteMessage/:id", con)
module.exports = app;