const Joi = require("joi");
const createError = require("http-errors");

const schema = Joi.object({
  name: Joi.string().min(2).max(15).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(7).max(15).required(),
});

const addContactValidation = (req, res, next) => {
  const validationRes = schema.validate(req.body);
  if (validationRes.error) {
    throw createError(400, validationRes.error.message);
  }
  next();
};

const updateContactValidation = (req, res, next) => {
  const validationRes = schema.validate(req.body);
  if (validationRes.error) {
    throw createError(400, validationRes.error.message);
  }
  next();
};

module.exports = {
  addContactValidation,
  updateContactValidation,
};
