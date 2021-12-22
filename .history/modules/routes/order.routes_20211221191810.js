const app = require("express").Router();
const controller = require("../controllers/order.controllers");
const isAuthenticated = require("../../config/isAuth");

app.post("/addOrder", isAuthenticated(), controller.addOrder);
app.get("/userOrders", isAuthenticated(), controller)
module.exports = app;