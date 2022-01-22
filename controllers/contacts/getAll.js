const contactsOperation = require("../../model/index");

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};
module.exports = getAll;
