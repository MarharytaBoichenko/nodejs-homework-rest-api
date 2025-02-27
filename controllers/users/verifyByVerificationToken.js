const createError = require("http-errors");
const { User } = require("../../model/user");

const verifyByVerificationToken = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw new createError(404, "User not found");
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    return res.json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = verifyByVerificationToken;
