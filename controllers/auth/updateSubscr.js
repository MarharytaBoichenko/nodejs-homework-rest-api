const { User } = require("../../model/user");
const updateSubscription = (req, res, next) => {
  try {
    //use  midd;lware  auth   -  to  check who is user
    // извлечь  id из req.user  и оп нему  обновить  подписку
  } catch (error) {
    next(error);
  }
};
module.exports = updateSubscription;
