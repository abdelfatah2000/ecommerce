const app = require("express").Router();
const controller = require("../controllers/product.controllers");
const isAuthenticated = require("../../config/isAuth");
const multer = require("multer");
const Validation = require("../../common/validator");
const {
  addProductValidation,
  updateProductValidation,
  getProductByIdValidation,
  deleteProductValidation,
} = require("../validations/product.validation");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
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
const resizeImages = (req, res, next) => {
  console.log(req.files);
  next();
};

app.post(
  "/addProduct",
  isAuthenticated(),
  Validation(addProductValidation),
  upload.array("images", 3),
  resizeImages,
  controller.addProduct
);
app.put(
  "/updateProduct",
  isAuthenticated(),
  Validation(updateProductValidation),
  controller.updateProduct
);
app.get("/allProducts", isAuthenticated(), controller.getProducts);
app.get(
  "/product/:id",
  isAuthenticated(),
  Validation(getProductByIdValidation),
  controller.getProductById
);
app.get("/search", isAuthenticated(), controller.searchProduct);
app.get("/productNumber", isAuthenticated(), controller.productNumber);
app.delete(
  "/deleteProduct",
  isAuthenticated(),
  Validation(deleteProductValidation),
  controller.deleteProduct
);
module.exports = app;
