const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      
    }
  },
  {
    timestamps: true,
  }
);
