const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
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
    imgURL: String,
    isVerfied:{
      type: Bool
    }
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(process.env.SALTROUNDS));
  next();
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
