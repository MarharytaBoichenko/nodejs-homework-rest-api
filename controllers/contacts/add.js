const contactsOperation = require("../../model/index");
const createError = require("http-errors");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(2).max(12).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(7).max(11).required(),
});

const add = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const validationRes = schema.validate(req.body);
    if (validationRes.error) {
      throw createError(400, validationRes.error.message);
    }
    const newContact = await contactsOperation.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};
module.exports = add;
