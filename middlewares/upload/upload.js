const multer = require("multer");
const path = require("path");

// multer settings

const tempDir = path.join(__dirname, "..", "..", "tmp");
console.log(tempDir);

const multerConfig = multer.diskStorage({
  // сохраняет во временную папку
  destination: tempDir,
  // под каким именем сохраняет
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.originalName + "-" + uniqueSuffix);

    cb(null, file.originalname);
  },
});

// это промежуточная ф-я  которая будет сохранять файлы
const upload = multer({ storage: multerConfig });

module.exports = upload;
