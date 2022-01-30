const { Contact } = require("../../model");
const createError = require("http-errors");

const getByID = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw createError(404, "Not  found");
      // создаем ошибку,  присваиваем ей статус и выбрасываем,  она пойдет в  catch оттуда  next  будет искать ф-ю  где  4  аргумента
    }
    res.json(contact);
  } catch (error) {
    /// если передано вместо id  что-то непохожее  на id то  возвращает статус 500
    ///  а нам надо  чтоб  был  404 ,  потому  ставим проверку  и  нужный статус
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404;
    }
    next(error);
  }
};
module.exports = getByID;
