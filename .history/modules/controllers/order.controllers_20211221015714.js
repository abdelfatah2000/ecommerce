const Order = require("../model/order.models");
const Product = require("../model/products.models");
const Cart = require("../model/cart.models");
const { StatusCodes } = require("http-status-codes");

const addOrder = async (req, res) => {
  // try {
  let user = req.user.id;
  const cart = await Cart.findOne({ user }).populate(
    "cartItems.product",
    "_id name price imgURL"
  );
  if (cart.cartItems.length === 0) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Your cart is empty" });
  } else {
    const { shippingInfo, taxPrice, totalPrice } = req.body;
    let orderItems = {};
    cart.cartItems.forEach((item, index) => {
      orderItems[item.product._id.toString()] = {
        product: item.product._id.toString(),
        name: item.product.name,
        img: item.product.imgURL,
        price: item.product.price,
        quantity: item.quantity,
      };
    });

    // for (i in cart.cartItems) {
    //   console.log(cart.cartItems[i]);
    // }
    console.log(orderItems);
    orderItems,
      await Order.create({
        user: user,
        shippingInfo: shippingInfo,
        orderItems: [orderItems],
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      });
    // const order = new Order({
    //   user,
    //   shippingInfo,
    //   orderItems,
    //   taxPrice,
    //   totalPrice,
    // });
    // await order.save();
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
  await Cart.findOneAndUpdate(
    {
      user: req.user.id,
    },
    { $set: { cartItems: [] } }
  );
  // } catch (error) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: "Please try again", error });
  // }
};

module.exports = {
  addOrder,
};
