const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imgURL: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema