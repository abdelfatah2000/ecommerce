const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

module.exports = () => {
  return async(req,res,next) => {
    try{
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt
    } catch {

    }
  }
}