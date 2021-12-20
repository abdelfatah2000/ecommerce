const User = require("../model/users.models");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../../common/email");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const register = async (req, res) => {
  try {
    const { name, email, password, phone, confirmPassword } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "This Email is already used" });
    } else {
      const userData = new User({
        name: name,
        email,
        password,
        phone,
        role: "Customer",
      });
      var token = jwt.sign({ email: email }, process.env.JWT_SCERETKEY, {
        expiresIn: "30m",
      });
      const confirmEmailURL = `http://localhost:${process.env.PORT}/api/users/verfiy/${token}`;
      const message = `to verfiy your account <a href = "${confirmEmailURL}" target="_blank">Click here</a>`;
      await sendEmail({
        email: req.body.email,
        subject: "Your Account Confirmation",
        html: message,
      });

      await userData.save();
      res.status(StatusCodes.CREATED).json({ message: "Done" });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Your request could not be processed. Please try again.",
      error,
    });
  }
};

const emailVarification = async (req, res) => {
  try {
    const token = req.params.token;
    var decoded = jwt.verify(token, process.env.JWT_SCERETKEY);
    const user = await User.updateOne(
      { email: decoded.email },
      { isVerified: true }
    );
    res
      .status(StatusCodes.OK)
      .json({ message: "Your account is Verfied", user });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const payload = req.body;
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid email or password" });
    } else {
      if (user.isVerified === false) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Verfiy your account" });
      } else {
        const match = await bcrypt.compare(payload.password, user.password);
        if (!match) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Invalid email or password" });
        } else {
          const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SCERETKEY
          );
          res
            .status(StatusCodes.OK)
            .json({ message: "Login Successfully", token });
        }
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

const forgetPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid email" });
  } else {
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const resetURL = `http://localhost:${process.env.PORT}/api/users/resetPassword/${resetToken}`;
    const message = `to change your password <a href = "${resetURL}" target="_blank">Click here</a>`;
    console.log("hey");
    try {
      await sendEmail({
        email: req.body.email,
        subject: "Reset Password",
        html: message,
      });
      res.status(StatusCodes.OK).json({ message: "Email is sent" });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please try again", error });
    }
  }
};

const resetPassword = async (req, res) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedPassword,
    passwordResetExpires: { $gt: Date.now() },
  });
  try {
    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Token is expired, please try again", error });
    } else {
      user.password = req.body.password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      const token = jwt.sign({ id: user.id }, process.env.JWT_SCERETKEY);
      res.status(StatusCodes.OK).json({ message: "success", token });
    }
  } catch (error) {}
};

const updateUser = async (req, res) => {
  try {
    const payload = req.body;
    await User.findByIdAndUpdate({ _id: req.params.id }, payload, {
      new: true,
    });
    res.status(StatusCodes.OK).json({ message: "User is Updated" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User is not Updated", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove({ _id: req.params.id });
    res.status(StatusCodes.OK).json({ message: "User is Deleted" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

const allUsers = async (req, res) => {
  try {
    con
    const users = await User.find({
      isVerified: true,
      role: "Customer",
    });
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};
module.exports = {
  register,
  emailVarification,
  login,
  forgetPassword,
  resetPassword,
  updateUser,
  deleteUser,
  allUsers,
};
