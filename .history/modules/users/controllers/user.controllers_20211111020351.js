const User = require("../model/users.models");
const { StatusCode } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const {
  hashPassword,
  comparePassword,
} = require("../../../common/hashPassword");

const addUser = async (req,res) => {
  try {
    const payload = req.body;
    const user = await User.findOne({ email });
    if(user) {
      res.status(StatusCodes.BAD_REQUEST)
    }
  } catch (error) {

  }
}