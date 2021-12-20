const app = require("express").Router();
const controller = require("../controllers/user.controllers");
const isAuthenticated = require("../../../config/isAuth");

app.post("/register", controller.register);
app.get("/verfiy/:token", controller.emailVarification);
app.post("/login", controller.login);
app.post("/forgetPassword", controller.forgetPassword)
app.post("/resetPassword/:token", controller.resetPassword)
app.put("/updateUser/:id", isAuthenticated() ,controller.updateUser);
app.delete("/deleteUser/:id", isAuthenticated(), controller.deleteUser);
app.get("getAllUsers")

module.exports = app;
