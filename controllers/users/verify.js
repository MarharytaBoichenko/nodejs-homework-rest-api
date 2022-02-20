const createError = require("http-errors");
const { User } = require("../../model/user");
const sendMail = require("../../helpers");
const validation = require("../../middlewares/validation/contactValidation");

const verify = async (req, res, next) => {
  try {
    // сначала проверяем  валидность полей в роуте    - email

    // если валидация ок
    const { email } = req.body;
    if (!email) {
      throw createError(400, "missing required field email");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(400, "Please register");
    }
    if (user.verify === true) {
      throw createError(400, "Verification has already been passed");
    }
    const mail = {
      to: email,
      subject: "Verification",
      html: `<a href='http://localhost:3000/api/users/verify/${user.verificationToken} >Please  confirm your  email</a>`,
    };
    sendMail(mail);
    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = verify;
