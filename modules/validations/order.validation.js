const Joi = require("joi");

const shippingInfoSchema = {
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  zipCode: Joi.number().required(),
  phone: Joi.string().required(),
};

const addOrderValidation = {
  body: Joi.object().required().keys({
    shippingInfo: shippingInfoSchema,
  }),
};

const getOrderByIdValidation = {
  params: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};

const updateOrderValidation = {
  params: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  updateOrderValidation,
  getOrderByIdValidation,
  addOrderValidation,
};
