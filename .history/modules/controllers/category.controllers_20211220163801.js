const Category = require("../model/category.models");
const { StatusCodes } = require("http-status-codes");
const Product = require("../model/products.models");

const addCategory = async (req, res) => {
  try {
    const payload = req.body;
    if (req.file) payload.imgURL = req.file.path;
    const category = new Category(payload);
    await category.save();
    res.status(StatusCodes.CREATED).json({ message: "Category is Added" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please Try Again", error });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      payload,
      { new: true }
    );
    res.status(StatusCodes.OK).json({ category });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please Try Again", error });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(StatusCodes.OK).json({ category });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please Try Again", error });
  }
};

const categoryNumbers = async (req, res) => {
  try {
    const category = await Category.find({}).count();
    res.status(StatusCodes.OK).json({ category });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please Try Again", error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params.id;
    const products = await Product.find({ category: id });
    if (products) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Please delete related products"})
    }
    await Category.findByIdAndDelete({ _id: id });
    res.status(StatusCodes.OK).json({ message: "Category is Deleted" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please Try Again", error });
  }
};

module.exports = {
  addCategory,
  categoryNumbers,
  deleteCategory,
  updateCategory,
  getAllCategory,
};
