const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  imgURL: String,
  role: {
    type: String,
    enum: ["Admin", "Customer"],
    default: "Customer",
  },
  address: [
    {
      street: String,
      city: String,
      code: String,
      country: String,
    },
  ],
});
