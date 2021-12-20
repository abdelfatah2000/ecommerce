const express = require("express");
const app = express();
require("dotenv").config();


const connection = require("./config/db");
connection();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));


const users = require("./modules/routes/user.routes");
const products = require("./modules/routes/product.routes");
const products = require("./modules/routes/category.routes");
const products = require("./modules/routes/cart.routes");
app.use("/api/users", users);
app.use("/api/products", products)


app.use("/uploads", express.static("uploads"))


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
