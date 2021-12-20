const app = require("express").Router();
const controller = require("../controllers/product.controllers");

app.post('/addProduct', controller.addProduct);
app.put("/updateProduct", controller.updateProduct);


module.exports = app