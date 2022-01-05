const app = require("express").Router();
const controller = require("../controllers/contactus.controllers");
const {
  addMessageValidation,
  deleteMessageValidation,
} = require("../validations/contactus.validation");
const Validation = require("../../common/validator");

app.post("/contactUs", Validation(addMessageValidation), controller.addmessage);
app.get("/allMessages", controller.getallmessages);
app.delete(
  "/deleteMessage/:id",
  Validation(deleteMessageValidation),
  controller.deleteMessage
);

module.exports = app;
