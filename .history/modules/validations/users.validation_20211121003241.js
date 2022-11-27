const Joi = require("joi");

const addUserValidation = {
  body: Joi.object().required.key({
    name: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.
  }),
};