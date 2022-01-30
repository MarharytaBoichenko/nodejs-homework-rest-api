const { Contact } = require("../../model");
const getAll = async (_, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({ data: contacts, status: 200, length: contacts.length });
  } catch (error) {
    next(error);
  }
};
module.exports = getAll;
