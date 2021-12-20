const Joi = require("joi");

const addUserValidation = {
  body: Joi.object().required.key({})
}