const app = require("express").Router();
const controller = require("../controllers/wishlist.controllers");
const isAuthenticated = require("../../config/isAuth");

app.get("/displayWishlist", isAuthenticated(), controller.displayWishlist),
app.post("/addToWishlist", isAuthenticated(), controller.addwishlist),
app.delete("/add")