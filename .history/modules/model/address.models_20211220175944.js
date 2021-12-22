const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {

    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
