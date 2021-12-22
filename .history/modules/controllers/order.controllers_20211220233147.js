const Order = require("../model/order.models");
const Product = require("../model/products.models");
const Cart = require("../model/cart.models");
const { StatusCodes } = require("http-status-codes");

const addOrder = async (req, res) => {
  try {
    let user = req.user.id;
    const cart = await Cart.findOne({ user });
    if (cart.cartItems.length === 0) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Your cart is empty" });
    } else {
      let cartDetails = cart.cartItems;
      cartDetails.forEach((item) => {
        Product.updateOne(
          { _id: item.product },
          {
            $inc: {
              countInStock: -item.quantity,
            },
          },
          { new: true },
          (error) => {
            if (error) {
              res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Couldn't decrease item's quantity", error });
            }
          }
        );
      });
    }
    const { shippingInfo, taxPrice, totalPrice } = req.body;
    let cartItems = {};
    cart.cartItems.forEach((item, index) => {
      cartItems[item.product._id.toString()] = {
        _id: item.product._id.toString(),
        name: item.product.name,
        img: item.product.imgURL,
        price: item.product.price,
        quantity: item.quantity,
      };
    });
    console.log(orderItems);
    const order = new Order({
      user: req.user.id,
      shippingInfo,
      orderItems: cartItems,
      taxPrice,
      totalPrice,
    });
    await order.save();
    await Cart.findOneAndUpdate(
      {
        user: req.user.id,
      },
      { $set: { cartItems: [] } }
    );
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

module.exports = {
  addOrder,
};
