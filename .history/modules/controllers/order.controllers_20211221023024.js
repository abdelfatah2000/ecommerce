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

    const flatten = (obj, roots = [], sep = '.') => Object
  // find props of given object
  .keys(obj)
  // return an object by iterating props
  .reduce((memo, prop) => Object.assign(
    // create a new object
    {},
    // include previously returned object
    memo,
    Object.prototype.toString.call(obj[prop]) === '[object Object]'
      // keep working if value is an object
      ? flatten(obj[prop], roots.concat([prop]), sep)
      // include current prop and value and prefix prop with the roots
      : {[roots.concat([prop]).join(sep)]: obj[prop]}
  ), {})
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
