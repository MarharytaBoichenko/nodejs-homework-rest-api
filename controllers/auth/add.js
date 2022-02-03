const { User } = require("../../model");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const addUser = async (req, res, next) => {
  try {
    // 1) joi validation =  вынесена  ф-я мидлвара  в роуте
    // 2) есть ли такой  user  уже?
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      throw createError(409, "Email already in use");
    }
    // если нет добавляем его  в базу
    // пароль хешируем с солью
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    await User.create({ email, password: hashedPassword });
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addUser;
