const Order = require("../model/order.models");
const Product = require("../model/products.models");
const { StatusCodes } = require("http-status-codes");

const addOrder = async (req, res) => {
  try {
    let user = 
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};