const { Contact } = require("../../model");
const createError = require("http-errors");

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updatedCont = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { favorite }
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
module.exports = updateFavorite;
