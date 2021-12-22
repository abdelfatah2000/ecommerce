const Order = require("../model/order.models");
const Product = require("../model/products.models");
const Cart = require("../model/cart.models");
const { StatusCodes } = require("http-status-codes");

const addOrder = async (req, res) => {
  try {
    let user = req.user.id;
    const cart = await Cart.findOne({ user }).populate(
      "cartItems.product",
      "_id name price imgURL"
    );
    if (cart.cartItems.length === 0) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Your cart is empty" });
    } else {
      const { shippingInfo } = req.body;
      let arr = [];
      cart.cartItems.forEach((item) =>
        arr.push({
          product: item.product._id,
          name: item.product.name,
          img: item.product.imgURL,
          price: item.product.price,
          quantity: item.quantity,
        })
      );
      let taxPrice = arr.reduce(function (a, b) {
        return (a + b.price * b.quantity) * 0.14;
      }, 0);
      let itemPrice = arr.reduce(function (a, b) {
        return a + b.price * b.quantity;
      }, 0);
      const order = new Order({
        user,
        shippingInfo,
        orderItems: arr,
        taxPrice: taxPrice,
        totalPrice: itemPrice + taxPrice,
      });
      await order.save();
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
      await Cart.findOneAndUpdate(
        {
          user: req.user.id,
        },
        { $set: { cartItems: [] } }
      );
      res.status(StatusCodes.OK).json({ order });
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

// Get order history of users
const allUserOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "orderItems.product",
        model: "product",
        select: "name price imgURL",
      });
    res.status(StatusCodes.OK).json({ orders });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};

// Get order by id
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ user: req.user.id, _id: id }).populate({
      path: "orderItems.product",
      model: "product",
      select: "name price imgURL",
    });
    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};


const updateOrder = async(req, res) => {
  try {
    
  }
}


module.exports = {
  addOrder,
  allUserOrder,
  getOrder,
};
