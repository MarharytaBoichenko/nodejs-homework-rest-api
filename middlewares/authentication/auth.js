const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { SECRET_KEY } = process.env;
const { User } = require("../../model");

const auth = async (req, res, next) => {
  /*
- извлечь  authorization из  заголовков запроса 
- превратить его в строку из  2 слов
-  проверить   первое слово  bearer?  
-  если нет -  ошибку Not Authorized
- если да -   проверяем токен jwt.verify(),  если не валиден -  ошибка уйдет в catch и там
 надо ей поставить статус 401
-  если ошибка не вылезла , то извлекается id  и оп нему ищем в базе user 
-  если user  нет  - ошибка  401 
-  если все ок и user есть  -  добавляем этого user в объект  запроса  и передаем  работу в next  (и идет в контроллер  который вернет текущего user)  
    */

  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw createError(401, "Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    // console.log(user);
    // console.log(user.token   );
    // если нет  user или его токен не валидный (просроченый, например)
    if (!user || !user.token) {
      throw createError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      (error.status = 401), (error.message = "Not authorized");
    }
    next(error);
  }
};

module.exports = auth;
