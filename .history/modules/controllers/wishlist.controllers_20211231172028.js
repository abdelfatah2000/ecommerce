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
    const {product} = req.body;
    const data = new Wishlist({
      product,
      user:req.user.id,
    });
    await data.save();
    res.status(StatusCodes.OK).json({ message: "Done" ,data})
  } catch (error) {
    res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Please try again", error });
  }
};

const delete