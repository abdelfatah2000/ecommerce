const app = require("express").Router();
const controller = require("../controllers/user.controllers");
const isAuthenticated = require("../../config/isAuth");
const multer = require("multer");
const Validation = require("../")


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users');
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


app.post("/register", controller.register);
app.get("/verfiy/:token", controller.emailVarification);
app.post("/login", controller.login);
app.post("/forgetPassword", controller.forgetPassword)
app.post("/resetPassword/:token", controller.resetPassword)
app.put("/updateUser/:id", isAuthenticated(), upload.single("photo") ,controller.updateUser);
app.delete("/deleteUser/:id", isAuthenticated(), controller.deleteUser);
app.get("/getAllUsers", isAuthenticated(),controller.allUsers);

module.exports = app;
