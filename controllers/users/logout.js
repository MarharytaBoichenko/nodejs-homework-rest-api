const { User } = require("../../model");
const createError = require("http-errors");

const logout = async (req, res, next) => {
  // уже  кто запрашивает проверено,  токен проверен ,  удаляем токен из базы

  try {
    const { id } = req.user;
    console.log(id);
    const user = await User.findById(id);
    if (!user) {
      throw createError(401, "Not authorized");
    }
    await User.findByIdAndUpdate(id, { token: null });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
module.exports = logout;
