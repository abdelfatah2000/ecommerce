const User = require("../model/users.models");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { sendemail } = require("../../../common/emailVarification");
const {
  hashPassword,
  comparePassword,
} = require("../../../common/hashPassword");

const register = async (req, res) => {
  try {
    const {name, age, email, password, phone} = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "This Email is already used" });
    }
    else {
      // newPassword = await hashPassword(payload.password);
      const userData = new User({
        name: payload.name,
        email: payload.email,
        password: newPassword,
        phone: payload.phone,
      });
      var token = jwt.sign({email:payload.email},process.env.JWT_SCERETKEY);
      sendemail(payload.email, token)
      await userData.save();
      res.status(StatusCodes.CREATED).json({ message:"Done"})
    }
  } catch (error) {
    res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Your request could not be processed. Please try again.", error });
  }
};
