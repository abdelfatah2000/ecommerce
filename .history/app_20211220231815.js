const express = require("express");
const app = express();
require("dotenv").config();

const connection = require("./config/db");
connection();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const users = require("./modules/routes/user.routes");
const products = require("./modules/routes/product.routes");
const categories = require("./modules/routes/category.routes");
const carts = require("./modules/routes/cart.routes");
const orders = require("./modules/routes/order.routes");
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/category", categories);
app.use("/api/carts", carts);
app.use("/api/orders", orders);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
