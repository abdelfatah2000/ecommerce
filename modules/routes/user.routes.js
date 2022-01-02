const app = require("express").Router();
const controller = require("../controllers/user.controllers");
const isAuthenticated = require("../../config/isAuth");
const multer = require("multer");
const Validation = require("../../common/validator");
const {
  addUserValidation,
  loginValidation,
  resetPasswordValidation,
  updateUserValidation,
  forgetPasswordValidation,
  deleteUserValidation,
} = require("../validations/users.validation");

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

app.post("/register", Validation(addUserValidation), controller.register);
app.post("/verfiy", controller.varificationCode);
app.post("/resendCode", controller.resendConfirmationCode);
app.post("/login", Validation(loginValidation), controller.login);
app.post(
  "/forgetPassword",
  Validation(forgetPasswordValidation),
  controller.forgetPassword
);
app.post(
  "/resetPassword/:token",
  Validation(resetPasswordValidation),
  controller.resetPassword
);
app.put(
  "/updateUser/:id",
  isAuthenticated(),
  Validation(updateUserValidation),
  upload.single("photo"),
  controller.updateUser
);
app.delete(
  "/deleteUser/:id",
  Validation(deleteUserValidation),
  isAuthenticated(),
  controller.deleteUser
);
app.get("/getAllUsers", isAuthenticated(), controller.allUsers);

module.exports = app;
