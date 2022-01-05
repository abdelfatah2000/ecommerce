const app = require("express").Router();
const controller = require("../controllers/cart.controllers");
const isAuthenticated = require("../../config/isAuth");
const { addToCart, removeCartItem } = require("../validations/cart.validation");
const Validation = require("../../common/validator");

app.post(
  "/addToCart",
  isAuthenticated(),
  Validation(addToCart),
  controller.addToCart
);
app.get("/cartData", isAuthenticated(), controller.getCartData);
app.put(
  "/removeCartItem",
  isAuthenticated(),
  Validation(removeCartItem),
  controller.removeCartItem
);
app.put("/changeQuantity", isAuthenticated(), controller.changeProductQuantity);
module.exports = app;
