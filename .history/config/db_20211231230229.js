const mongoose = require("mongoose");

const connection = () => {
  return mongoose
    .connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "ecommercd"
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
};

module.exports = connection;
