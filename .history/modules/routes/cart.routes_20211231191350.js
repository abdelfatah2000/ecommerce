const app = require("express").Router();
const controller = require("../controllers/cart.controllers");
const isAuthenticated = require("../../config/isAuth");


app.post("/addToCart", isAuthenticated(),controller.addToCart);
app.get("/cartData", isAuthenticated(),controller.getCartData);
app.put("/removeCartItem", isAuthenticated(), controller.removeCartItem)
app.put("/changeQuantity", isAuthenticated(),controller.changeProductQuantity);
module.exports = app;
