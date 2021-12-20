const Product = require("../model/products.models");
const { StatusCodes } = require("http-status-codes");


const addProduct = (req,res) => {
try {
  const payload = req.body;
  const productData = new Product (payload);
  await productData.save()
  res.status(StatusCodes.CREATED).json({ message: "Product is Added" });
} catch (error) {
  res.sta
}
}