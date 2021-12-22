const app = require("express").Router();
const controller = require("../controllers/order.controllers");
const isAuthenticated = require("../../config/isAuth");

app.post("/addOrder", isAuthenticated(), controller.addOrder);
app.get("/userOrders", isAuthenticated(), controller.allUserOrder);
app.get("/getOrder/:id", isAuthenticated(), controller.getOrder);
app.put("/orderStatus", isA)

module.exports = app;
