const { Contact } = require("../../model");
const createError = require("http-errors");

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedCont = await Contact.findByIdAndUpdate(
      { _id: contactId },
      req.body,
      { new: true, runValidators: true }
      ////new  true передаем  чтобы  метод  вернул нам обновленный объект(по умолчанию о н возвращает старый)
    );
    if (!updatedCont) {
      throw createError(404, `Contact  with id ${contactId} not found`);
    }
    res.json(updatedCont);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404;
    }
    next(error);
  }
};
module.exports = update;
