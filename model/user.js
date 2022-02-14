const { model, Schema } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;

const userSchema = Schema(
  {
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
      /// /происать  индекс в базу !!!!

      match: emailRegexp,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
      minlength: 8,
      match: passwordRegexp,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      require: true,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

// validation  Joi

const userJoiSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required().pattern(passwordRegexp).min(8),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
  avatarURL: Joi.string(),
});
module.exports = {
  User,
  userJoiSchema,
};
