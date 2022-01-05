const Joi = require("joi");

const addProductValidation = {
  name: Joi.string().min(5).required(),
  desc: Joi.string().min(5).required(),
  category: Joi.string().min(5).required(),
  brand: Joi.string().min(5).required(),
  price: Joi.number().required(),
};

const updateProductValidation = {
  params: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};

const getProductByIdValidation = {
  params: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};

const deleteProductValidation = {
  params: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  addProductValidation,
  updateProductValidation,
  getProductByIdValidation,
  deleteProductValidation,
};
