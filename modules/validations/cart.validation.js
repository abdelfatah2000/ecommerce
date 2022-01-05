const Joi = require("joi");

const addToCart = {
  body: Joi.object().required().keys({
    product: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
};

const removeCartItem = {
  body: Joi.object().required().keys({
    productId: Joi.string().required(),
  }),
};

module.exports = {
  addToCart,
  removeCartItem
}