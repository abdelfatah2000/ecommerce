const Joi = require("joi");

const addMessageValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(5),
      email: Joi.email().required().min(5),
      message: Joi.string().required().min(10),
    }),
};

const deleteMessageValidation = {
  params: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  addMessageValidation,
  deleteMessageValidation,
}
