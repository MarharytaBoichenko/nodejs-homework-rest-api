const { User } = require("../../model");
const createError = require("http-errors");

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    console.log(_id);
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        subscription,
      },
      { new: true, runValidators: true }
    );
    ////// надо ли эта проверка?
    if (!updatedUser) {
      throw createError(404, `User  with id ${_id} not found`);
    }
    res.json({ updatedUser });
  } catch (error) {
    if (!error.status) {
      error.status = 404;
    }
    next(error);
  }
};
module.exports = updateSubscription;
