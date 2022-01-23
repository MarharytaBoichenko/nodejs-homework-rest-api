const contactsOperation = require("../../model/index");
const createError = require("http-errors");

const add = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await contactsOperation.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};
module.exports = add;
