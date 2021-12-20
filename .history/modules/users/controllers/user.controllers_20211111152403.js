const User = require("../model/users.models");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../../common/emailVarification");

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
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
        expiresIn: "1h",
      });
      const confirmEmailURL = `http://localhost:${process.env.PORT}/users/verfiy/${token}`;
      const message = `To Verfiy your account click here ${confirmEmailURL}`;
      await sendEmail({
        email: email,
        subject: "Your Account Confirmation",
        message,
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

module.exports = {
  register,
};
