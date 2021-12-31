const Wishlist = require("../model/wishlist.models");
const { StatusCodes } = require("http-status-codes");

const displayWishlist = async (req, res) => {
  try {
    const data = await Wishlist.find({ user: req.user.id });
    res.status(StatusCodes.OK).json({ message: "Done", data });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

const addwishlist = async (req, res) => {
  try {
    const { product } = req.body;
    const product = await Wishlist.findOne({ product: product });
    if (product) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Product is already Added" });
    } else {
      const data = new Wishlist({
        product,
        user: req.user.id,
      });
      await data.save();
      res.status(StatusCodes.OK).json({ message: "Done", data });
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

const deleteproduct = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Done", data });

    await Wishlist.findByIdAndDelete({product:});
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};
