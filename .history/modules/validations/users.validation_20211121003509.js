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

