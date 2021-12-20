const app = require("express").Router();
const controller = require("../controllers/product.controllers");

app.post('/addProduct', controller.addProduct);
app.put("/updateProduct", co)

module.exports = app