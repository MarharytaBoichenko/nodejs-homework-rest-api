const { Contact } = require("../../model");

const getAll = async (req, res, next) => {
  //  уже прошла мидлвара auth , user проверен

  try {
    const { _id } = req.user;
    const { page, limit, favorite } = req.query;
    const skip = (page - 1) * limit;
    // третий аргумент в find -  объект отвечает за пагинацию  -  ск  страниц пропустить и к-во  эл-тов показать
    const contacts = await Contact.find({ owner: _id, favorite }, "", {
      skip: skip,
      limit: Number(limit),
    }).populate("owner", "email");
    // populate  указывает  какую инфу  взять из  owner,  чтобы не просто  id показывался , а еще и  указанные поля

    res.json({ data: contacts, status: 200, length: contacts.length });
  } catch (error) {
    next(error);
  }
};
module.exports = getAll;
