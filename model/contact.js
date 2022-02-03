const Joi = require("joi");
const { model, Schema } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const contactJoiSchema = Joi.object({
  name: Joi.string().min(2).max(15).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(7).max(15).required(),
  favorite: Joi.boolean(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const Contact = model("contact", contactSchema);
module.exports = {
  Contact,
  contactJoiSchema,
  favoriteJoiSchema,
};
