const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    u
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
