const app = require("express").Router();
const controller = require("../controllers/product.controllers");
const isAuthenticated = require("../../config/isAuth");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users");
  },
  filename: (req, file, cb) => {
    let prefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, prefix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter,
}); 

app.post("/addProduct", controller.addProduct);
app.put("/updateProduct", controller.updateProduct);
app.get("/allProducts", controller.getProducts);
app.get("/product/:id", controller.getProductById);
app.get("/search", controller.searchProduct);
app.get("/productNumber")
module.exports = app;
