const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required:true,
    },
    messa
  },
  {
    timestamps: true,
  }
);
