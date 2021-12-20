const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const confirmCodeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "user",
  },
  code: String,
  expireDate: Date,
});

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
   00000000000000000000   {
        street: String,
        city: String,
        code: String,
        country: String,
      },
    ],
    imgURL: { type: String, default: "uploads\\users\\default.jpg" },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangeAt: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.SALTROUNDS)
  );
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const restToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(restToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  console.log({ restToken }, this.passwordResetToken);
  return restToken;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;
  next();
});


// confirmCodeSchema.methods.generateCode = function () {
//   const confirmationCode = Math.floor(Math.random() * 100000);
//   if (confirmationCode.toString().length < 5) {
//     var confirmationCode = confirmationCode.toString() + "0";
//   }
//   this.code = crypto
//     .createHash("sha256")
//     .update(confirmationCode)
//     .digest("hex");
//   this.expireDate = Date.now() + 10 * 60 * 1000;
//   console.log({ confirmationCode }, this.expireDate);
//   return confirmationCode;
// };


const User = mongoose.model("user", userSchema);

const ConfirmCode =mongoose.model("confirmCode", confirmCodeSchema);
module.exports = {
  User,
  ConfirmCode
}