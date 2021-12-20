const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "category",
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imgURL: 
      {
        type: String,
      },
    ],
    countInStock: Number,
    rating: Number,
  },
  {
    timestamps: true,
  }
);

productSchema.index({'$**': 'text'});

const productModel = mongoose.model("product", productSchema)
module.exports = productModel
