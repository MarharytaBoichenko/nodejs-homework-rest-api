const { Contact } = require("../../model");

const add = async (req, res, next) => {
  try {
    console.log(req.user);
    /// получаем  id польз,   кто залогинен и делает запрос
    const { _id } = req.user;
    console.log(_id);
    const newContact = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};
module.exports = add;
