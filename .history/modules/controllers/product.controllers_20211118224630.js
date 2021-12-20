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
    const payload = req.body;
    await Product.findByIdAndUpdate({ _id: req.params.id }, payload, {
      new: true,
    });
    res.status(StatusCodes.OK).json({ message: "Product is Updated" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

const getProducts = async (req, res) => {
  try {
    // let { page} = req.query;
    // let size = 10
    // if (!page) {
    //   page = 1
    // }
  
    // const skip = (page - 1) * size
    // const data = await Product.find({}).limit(size).skip(skip)
    // res.json({ data , page , skip });

    const data = await Product.find({countInStock: {$gt: 0}})
    res.status(Sta)
  } catch (error) {

  }
}

module.exports = {
  addProduct,
  updateProduct,
};
