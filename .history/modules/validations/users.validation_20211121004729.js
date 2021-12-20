const Joi = require("joi");

const addUserValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(5).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      confirmPassword: Joi.ref("password"),
      phone: Joi.string().required(),
    }),
};

const loginValidation = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
    }),
};

const resetPasswordValidation = {
  params: Joi.object().required().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object()
    .required()
    .keys({
      password: Joi.string().min(5).required(),
      confirmPassword: Joi.ref("password"),
    }),
};

const updateUserValidation = {
  params: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};

const forgetPasswordValidation = {
  
}
