const contactsOperation = require("../../model/index");
const createError = require("http-errors");

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactToRemove = await contactsOperation.removeContact(contactId);
    if (!contactToRemove) {
      throw createError(404, `Contact  with id ${contactId} not found`);
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = remove;
