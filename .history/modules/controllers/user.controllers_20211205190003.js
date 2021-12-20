const { User, ConfirmCode } = require("../model/users.models");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../common/email");
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

      await userData.save();
      var code;
      const confirmationCode = Math.floor(Math.random() * 100000);
      if (confirmationCode.toString().length < 5) {
        code = confirmationCode.toString() + "0";
      } else {
        code = confirmationCode.toString();
      }
      console.log(code);
      const hashCode = crypto.createHash("sha256").update(code).digest("hex");
      const expireDate = Date.now() + 10 * 60 * 1000;
      await userData.save();
      const confirmCode = new ConfirmCode({
        userId: userData._id,
        code: hashCode,
        expireDate,
      });
      await confirmCode.save();
      const message = `<h2>${code}</h2>`;
      await sendEmail({
        email: req.body.email,
        subject: "Account Confirmation Code",
        html: message,
      });
      res.status(StatusCodes.CREATED).json({ message: "Done" });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Your request could not be processed. Please try again.",
      error,
    });
  }
};

const varificationCode = async (req, res) => {
  try {
    const payload = req.body;
    const hashedCode = crypto
      .createHash("sha256")
      .update(payload.code.toString())
      .digest("hex");
    const confirmCode = await ConfirmCode.findOne({
      code: hashedCode,
      expireDate: { $gt: Date.now() },
    });
    if (!confirmCode) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Code is expired, please try again" });
    } else {
      const user = await User.findOne({ _id: confirmCode.userId });
      user.isVerified = true;
      await user.save({ validateBeforeSave: false });
      await confirmCode.remove();
      res.status(StatusCodes.OK).json({ message: "Done" });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

const resendConfirmationCode = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findByEmail({email});
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({ message:"Register first",error });
    }
    else {
      const confirmCode = await ConfirmCode.findOne({userId: user._id})
      if (!confirmCode) {
        var code;
        const confirmationCode = Math.floor(Math.random() * 100000);
        if (confirmationCode.toString().length < 5) {
          code = confirmationCode.toString() + "0";
        } else {
          code = confirmationCode.toString();
        }
        console.log(code);
        const hashCode = crypto.createHash("sha256").update(code).digest("hex");
        const expireDate = Date.now() + 10 * 60 * 1000;
        const confirmCode = new ConfirmCode({
          userId: user._id,
          code: hashCode,
          expireDate,
        });
        await confirmCode.save();
      }
      else {
        var code;
        const confirmationCode = Math.floor(Math.random() * 100000);
        if (confirmationCode.toString().length < 5) {
          code = confirmationCode.toString() + "0";
        } else {
          code = confirmationCode.toString();
        }
        console.log(code);
        confirmCode.code = code;
        confirmCode.expireDate = expireDate;
        

        // const message = `<h2>${code}</h2>`;
        // await sendEmail({
        //   email: req.body.email,
        //   subject: "Account Confirmation Code",
        //   html: message,
        // });
      }
    }
  } catch (error) {

  }
}

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
        .json({ message: "Token is expired, please try again" });
    } else {
      // Take two input password and confirmpassword
      const { password, confirmPassword } = req.body;
      user.password = password;
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
    if (req.file) payload.imgURL = req.file.path;
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
    const users = await User.find({
      isVerified: true,
      role: "Customer",
    }).select("name phone email -_id");
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

const updatePassword = async (req, res) => {
  try {
    const payload = req.body;
    const user = await User.findById(req.user.id);
    const match = await bcrypt.compare(payload.oldPassword, user.password);
    if (!match) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Old password is incorrect" });
    } else {
      user.password = payload.newPassword;
      await user.save();
      res.status(StatusCodes.OK).json({ message: "Password is Updated" });
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

const userData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email phone");
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

module.exports = {
  register,
  login,
  varificationCode,
  forgetPassword,
  resetPassword,
  updateUser,
  deleteUser,
  allUsers,
  userData,
  updatePassword,
};
