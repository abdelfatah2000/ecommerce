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

    const data = await Product.find({ countInStock: { $gt: 0 } }).select(
      "name price brand"
    );
    console.log(req.body);
    res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

const getProductById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ message: "Product is Deleted" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again" }, error);
  }
};

const searchProduct = async (req, res) => {
  // try {
    const searchField = req.query.name;
    const regex =  $regex: searchField, $options: "$i"} 
    const data = await Product.find({
      $text: {},
    });
    res.status(StatusCodes.OK).json({ data });
  // } catch (error) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: "Please try again" }, error);
  // }
};

module.exports = {
  addProduct,
  updateProduct,
  getProducts,
  getProductById,
  searchProduct,
  deleteProduct,
};
