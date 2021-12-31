const app = require("express").Router();
const controller = require("../controllers/wishlist.controllers");
const isAuthenticated = require("../../config/isAuth");

app.get("/displayWishlist", isAuthenticated(), controller.displayWishlist);
app.post("/addWishlist", isAuthenticated(), controller.addwishlist);
app.delete("/deleteWishlist", isAuthenticated(), controller.deleteproduct);

module.exports = app;