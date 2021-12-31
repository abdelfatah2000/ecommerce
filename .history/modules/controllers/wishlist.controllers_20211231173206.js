const Wishlist = require("../model/wishlist.models");
const { StatusCodes } = require("http-status-codes");

const displayWishlist = async (req, res) => {
  try{
    const data = await Wishlist.find({user:req.user.id});
    res.status(StatusCodes.OK).json({ message: "Done" ,data})
  } catch (error) {
    res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Please try again", error });
  }
};

const addwishlist = async (req, res) => {
  try{
    const product = await Wishlist.findOne({product:})
    res.status(StatusCodes.OK).json({ message: "Done" ,data})
  } catch (error) {
    res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Please try again", error });
  }
};

const deleteproduct = async (req, res) => {
  try{
    await Wishlist.findByIdAndDelete({})
  } catch (error) {
    res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Please try again", error });
  }
}