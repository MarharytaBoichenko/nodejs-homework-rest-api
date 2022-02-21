const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const sendMail = require("../../helpers");
const { v4 } = require("uuid");
const { User } = require("../../model");

const addUser = async (req, res, next) => {
  try {
    // 1) joi validation =  вынесена  ф-я мидлвара  в роуте
    // 2) есть ли такой  user  уже?
    const { email, password, avatarURL } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      throw createError(409, "Email already in use");
    }
    // если нет добавляем его  в базу
    // пароль хешируем с солью

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const usersAvatar = String(gravatar.url(email));
    //создаем  verificationToken  и его будем тоже добавлять  в БД пользователю
    const verificationToken = v4();
    await User.create({
      email,
      password: hashedPassword,
      avatarURL: usersAvatar,
      verificationToken,
    });

    // создаем и  отправляем пользователю письмо для  подтверждения
    const mail = {
      to: email, // Change to your recipient  // Change to your verified sender
      subject: "Verification",
      html: `<a href='http://localhost:3000/api/users/verify/${verificationToken} >Please  confirm your  email</a>`,
    };
    await sendMail(mail);
    // после пользователь должен  перейти по  ссылке подтвердить, у нас  это будет  GET  запрос
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
        avatarURL: usersAvatar,
        verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addUser;
