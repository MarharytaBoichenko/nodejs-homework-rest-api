const { User } = require("../../model");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  // 1)  Joi  validation
  // 2) find user in  model   if !user  =  error  401
  // 3) compare  password  in input with  user password in  DB
  // 4)  if  password OK   -  create token
  //  in  res     =  token,     user
  // 5)  if  !password  -   auth error 401

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw createError(401, "Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const { SECRET_KEY } = process.env;
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    // созданный токен записываем в базу  юзеру
    await User.findByIdAndUpdate(
      user._id,
      { token },
      { new: true, runValidators: true }
    );
    res.json({
      user: { token },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = login;
