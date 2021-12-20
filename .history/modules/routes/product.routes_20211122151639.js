const app = require("express").Router();
const controller = require("../controllers/product.controllers");

app.post('/addProduct', controller.addProduct);
app.put("/updateProduct", controller.updateProduct);
app.get("http://localhost:3000", controller.getProducts);
app.get("/product/:id", controller.getProductById);
app.get("/search", controller.searchProduct);

module.exports = app