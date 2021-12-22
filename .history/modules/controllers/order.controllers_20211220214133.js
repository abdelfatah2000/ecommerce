const Order = require("../model/order.models");
const Product = require("../model/products.models");
const Cart = require("../model/cart.models");
const { StatusCodes } = require("http-status-codes");

const addOrder = async (req, res) => {
  try {
    let user = req.user.id
    const cart = await Cart.findOne({user});
    if (cart.cartItems.length === 0) {
      res.status(StatusCodes.BAD_REQUEST).json({message: "Your cart is empty"});
    } else {
      let cartDetails = cart.cartItems;
      cartDetails.forEach(item => {
        Product.updateOne(
          {_id:item.product},
          {
            $inc: {
              countInStock: -item.qu
            }
          }
          )
      })
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};
