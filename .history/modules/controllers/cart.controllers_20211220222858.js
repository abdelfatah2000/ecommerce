const Cart = require("../model/cart.models");
const Product = require("../model/products.models");
const { StatusCodes } = require("http-status-codes");

const addToCart = async (req, res) => {
  try {
    const product = req.body.cartItems.product;
    const isFoundItem = await Product.findOne({
      _id: product,
      countInStock: { $gt: 0 },
    });
    if (isFoundItem) {
      const userCart = await Cart.findOne({ user: req.user.id });
      if (userCart) {
        const product = req.body.cartItems.product;

        // if item in cart => increase quantity
        const item = userCart.cartItems.find((c) => c.product == product);
        let condition, update;
        let currentQuantity = item.quantity + req.body.cartItems.quantity;
        if(isFoundItem.countInStock < currentQuantity) {
          res.status(StatusCodes.BAD_REQUEST).json({message: "Decrease your quantity"})
        }
        
      } else {
        const cart = new Cart({
          user: req.user.id,
          cartItems: [req.body.cartItems],
        });
        await cart.save();
        res.status(StatusCodes.CREATED).json({ cart });
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Product out of stock" });
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

const getCartData = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "cartItems.product",
      "_id name price imgURL"
    );
    if (cart) {
      let cartItems = {};
      cart.cartItems.forEach((item, index) => {
        cartItems[item.product._id.toString()] = {
          _id: item.product._id.toString(),
          name: item.product.name,
          img: item.product.imgURL,
          price: item.product.price,
          qty: item.quantity,
        };
      });
      res.status(StatusCodes.OK).json({ cartItems });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "User has no cart" });
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      {
        $pull: {
          cartItems: {
            product: productId,
          },
        },
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

module.exports = {
  addToCart,
  getCartData,
  removeCartItem,
};
