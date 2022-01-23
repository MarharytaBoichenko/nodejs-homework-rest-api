const contactsOperation = require("../../model/index");
const createError = require("http-errors");

const update = async (req, res, next) => {
  try {
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
