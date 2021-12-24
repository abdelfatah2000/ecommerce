const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./config/db");
connection();

const { createInvoice } = require("./common/createInvoice");

const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111,
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234,
};

const order = {
  shippingInfo: {
    address: "84 Mohamed Farid St",
    city: "Sidi Bishr",
    country: "Alexandria",
    zipCode: 200,
    phone: "01200186617",
  },
  user: {
    _id: "618d2377269d56d04630a516"
    name: "Abdelfattah Mohamed",
  },
  orderItems: [
    {
      name: "Oppo A9",
      price: 5449,
      quantity: 4,
      category: "Mobile",
      brand: "Oppo",
      img: "uploads\\users\\1640137100562-758475790-Oppo-A9-2020.jpeg",
      product: "61c2818ced95bf1a9c32d084",
      _id: "61c4ad91ad468da79ae6acf1",
    },
  ],
  taxPrice: 3051.440,
  totalPrice: 24847.440000000002,
  orderStatus: "Processing",
  createdAt: "2021-12-23T17:10:41.064Z",
  updatedAt: "2021-12-23T17:10:41.064Z",
  orderId: 1000,
};

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const users = require("./modules/routes/user.routes");
const products = require("./modules/routes/product.routes");
const categories = require("./modules/routes/category.routes");
const carts = require("./modules/routes/cart.routes");
const orders = require("./modules/routes/order.routes");
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/category", categories);
app.use("/api/carts", carts);
app.use("/api/orders", orders);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  createInvoice(order, "invoice.pdf");
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
