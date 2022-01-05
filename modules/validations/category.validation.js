const Joi = require("joi");

const addCategoryValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(5),
    }),
};

const updateCategoryValidation = {
  params: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  addCategoryValidation,
  updateCategoryValidation,
}