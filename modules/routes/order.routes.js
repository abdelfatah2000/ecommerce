const app = require("express").Router();
const controller = require("../controllers/order.controllers");
const isAuthenticated = require("../../config/isAuth");
const Validation = require("../../common/validator");
const {
  updateOrderValidation,
  getOrderByIdValidation,
  addOrderValidation,
} = require("../validations/order.validation");

app.post(
  "/addOrder",
  isAuthenticated(),
  Validation(addOrderValidation),
  controller.addOrder
);
app.get("/userOrders", isAuthenticated(), controller.allUserOrder);
app.get(
  "/getOrder/:id",
  isAuthenticated(),
  Validation(getOrderByIdValidation),
  controller.getOrder
);
app.put(
  "/orderStatus/:id",
  isAuthenticated(),
  Validation(updateOrderValidation),
  controller.updateOrder
);

module.exports = app;
