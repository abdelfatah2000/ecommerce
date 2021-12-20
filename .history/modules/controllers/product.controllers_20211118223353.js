const Product = require("../model/products.models");
const { StatusCodes } = require("http-status-codes");

const addProduct = async (req, res) => {
  try {
    const payload = req.body;
    const productData = new Product(payload);
    await productData.save();
    res.status(StatusCodes.CREATED).json({ message: "Product is Added" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const payload = req.body
    await 
  } catch (error) {}
};

module.exports = {
  addProduct,
};
