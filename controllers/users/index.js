const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./update");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const verifyByVerificationToken = require("./verifyByVerificationToken");

module.exports = {
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyByVerificationToken,
  verify,
};
