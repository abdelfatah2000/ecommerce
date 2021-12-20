const Product = require("../model/products.models");
const { StatusCodes } = require("http-status-codes");


const addProduct = (req,res) => {
  const payload = req.body;
  const productData = new Product (payload);
  await productData
}