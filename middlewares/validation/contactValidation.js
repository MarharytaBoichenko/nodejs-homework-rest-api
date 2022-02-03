const createError = require("http-errors");

const validation = (schema) => {
  return (req, _, next) => {
    const validationRes = schema.validate(req.body);
    if (validationRes.error) {
      console.log("here in an  error ");
      throw createError(400, validationRes.error.message);
    }
    next();
  };
};

module.exports = validation;
