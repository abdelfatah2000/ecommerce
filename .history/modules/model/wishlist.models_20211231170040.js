const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const wishlistModel = mongoose.model("wishlist", wishlistSchema);

module.exports = wishlistModel;