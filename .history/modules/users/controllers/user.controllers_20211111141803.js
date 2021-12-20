const User = require("../model/users.models");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { sendemail } = require("../../../common/emailVarification");

const register = async (req, res) => {
  // try {
    const payload = req.body;
    const user = await User.findOne({ email });
    console.log("Bye")
    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "This Email is already used" });
    } else {
      console.log("Hi")
      const userData = new User({
        name:payload.name,
        email:payload.email,
        password:payload.password,
        phone:payload.phone,
        // role: "Customer",
      });
      var token = jwt.sign(
        { email: payload.email },
        process.env.JWT_SCERETKEY,
        { expiresIn: "1h" }
      );
      sendemail(email, token);
      await userData.save();
      res.status(StatusCodes.CREATED).json({ message: "Done" });
    }
  // } catch (error) {
  //   res.status(StatusCodes.BAD_REQUEST).json({
  //     message: "Your request could not be processed. Please try again.",
  //     error,
  //   });
  // }
};

module.exports = {
  register,
};
