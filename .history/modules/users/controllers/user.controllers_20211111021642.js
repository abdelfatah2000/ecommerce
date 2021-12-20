const User = require("../model/users.models");
const { StatusCodes } = require("http-status-code");
const jwt = require("jsonwebtoken");
const { sendemail } = require("../../../common/emailVarification");
const {
  hashPassword,
  comparePassword,
} = require("../../../common/hashPassword");

const register = async (req, res) => {
  try {
    const payload = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "This Email is already used" });
    }
    else {
      newPassword = await hashPassword(payload.password);
      const userData = new User({
        name: payload.name,
        email: payload.email,
        password: newPassword,
        phone: payload.phone,
      });
      var token = jwt.sign({email:payload.email},process.env.JWT_SCERETKEY);
      sendemail(payload.emaill)
    }
  } catch (error) {}
};
