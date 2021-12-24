const mongoose = require("mongoose");
autoIncrement = require('mongoose-auto-increment');
const connection = require("../../config/db");
autoIncrement.initialize(connection);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      zipCode: {
        type: Number,
      },
      phone: {
        type: Number,
        required: true,
      },
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        img: {
          type: String,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
      },
    ],
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["Processing", "Shipped", "Cancelled", "Returned", "Delevired"],
      default: "Processing",
    },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

orderSchema.plugin(autoIncrement.plugin, { model: 'order', field: 'orderId' });
orderSchema.plugin(autoIncrement.plugin, {
  model: 'order',
  field: 'bookId',
  startAt: 100,
  incrementBy: 100
});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
