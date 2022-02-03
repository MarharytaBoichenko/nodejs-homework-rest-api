const { User } = require("../../model");

const getCurrent = async (req, res, next) => {
  // сюда доходит  если уже  сработала мидлвара  auth и прошли проверки токена
  //здесь  уже   приходит req   с  прикрепленным  user
  try {
    const { email, subscription } = req.user;
    res.json({
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getCurrent;
