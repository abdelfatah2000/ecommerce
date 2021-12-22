const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}
);
