const app = require("express").Router();
const controller = require("../controllers/category.controllers");
const isAuthenticated = require("../../config/isAuth");
const multer = require("multer");
const { acceptsEncodings } = require("express/lib/request");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/categories");
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

app.post(
  "/addCatogery",
  upload.single(photo),
  isAuthenticated(),
  controller.addCategory
);

app.get("/getCatogery", isAuthenticated(), controller.getAllCategory);
app.get("/categoryNumber", isAuthenticated(), controller.categoryNumbers);
app.put("/updateCategory/:id", isAuthenticated(), controller.updateCategory);
app.delete("/deleteCategory/:id", )
