const Wishlist = require("../model/wishlist.models");
const { StatusCodes } = require("http-status-codes");

const displayWishlist = async (req, res) => {
  try{
    const data = await Wishlist.find({user:req.user.id});
  } catch (error) {
    res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Please try again", error });
  }
}