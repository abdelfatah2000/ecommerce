const Product = require('../model/address.models');
const { StatusCodes } = require("http-status-codes");

const addAddress = async (req, res) => {
  try{

  } catch (error) {
    res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Please try again", error });
  }
}