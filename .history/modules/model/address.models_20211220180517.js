const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: true,
    },
    : {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;