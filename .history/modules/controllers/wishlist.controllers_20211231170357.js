const Wishlist = require("../model/wishlist.models");
const { StatusCodes } = require("http-status-codes");

const displayWishlist = async (req, res) => {
  try{
    const data = await Wis
  } catch (error) {
    res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Please try again", error });
  }
}