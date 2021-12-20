const Category = require("../model/category.models");
const { StatusCodes } = require("http-status-codes");

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
    const category = await Category.findOne({_id:req.params.id})
    
  } catch (error) {
    res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Please Try Again", error });
  }
};
