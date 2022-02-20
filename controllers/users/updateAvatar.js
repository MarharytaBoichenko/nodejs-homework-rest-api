const { User } = require("../../model");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

//  куда будем сохранять файл после временной папки
const publicDir = path.join(__dirname, "..", "..", "public", "avatars");
console.log(publicDir);

const updateAvatar = async (req, res, next) => {
  // извлекаем имя  файла и путь

  const { path: firstName, originalname } = req.file;

  //   //  новое имя -  это будет новый полный путьк файлу  включая имя  в  папке куда мы  его перместим
  try {
    const img = await Jimp.read(firstName);
    img.resize(256, 256);
    await img.writeAsync(firstName);
    const { _id } = req.user;
    //     // достаем id  для переименования аватарки
    //     //  из  имени  файла достаем расширение файла
    const [extension] = originalname.split(".").reverse();
    const newFileName = `${_id}.${extension}`;
    const newFilePath = path.join(publicDir, newFileName);
    //     // // путем переименования  полного пути  к файлу перемещаем его из временной папки
    console.log(firstName);
    console.log(newFilePath);
    await fs.rename(firstName, newFilePath);
    const avatarURL = path.join("avatars", newFileName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    //     // //  отправляем ответ
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(firstName);
    next(error);
  }
};
module.exports = updateAvatar;
