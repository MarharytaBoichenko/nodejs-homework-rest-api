const contactsOperation = require("../../model/index");
const createError = require("http-errors");

const getByID = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperation.getContactById(contactId);
    console.log(contact);
    if (!contact) {
      throw new createError(404, "Not  found");
      // создаем ошибку,  присваиваем ей статус и выбрасываем,  она пойдет в  catch оттуда  next  будет искать ф-ю  где  4  аргумента
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};
module.exports = getByID;
