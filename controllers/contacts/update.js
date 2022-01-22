const contactsOperation = require("../../model/index");
const createError = require("http-errors");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(2).max(12).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(3).max(15).required(),
});

const update = async (req, res, next) => {
  try {
    const validationRes = schema.validate(req.body);
    if (validationRes.error) {
      throw createError(400, validationRes.error.message);
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const updatedCont = await contactsOperation.updateContact(
      contactId,
      name,
      email,
      phone
    );
    if (!updatedCont) {
      throw createError(404, `Contact  with id ${contactId} not found`);
    }
    res.json(updatedCont);
  } catch (error) {
    next(error);
  }
};
module.exports = update;
