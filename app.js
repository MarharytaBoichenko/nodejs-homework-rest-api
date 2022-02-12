const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// для логирования
app.use(logger(formatsLogger));
// для обработки кросдоменных  запросов
app.use(cors());
// для  обработки  текста
app.use(express.json());
// для  того чтоб  отдавать статические  файлы
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// сюда  идет  next  с ошибкой из обработчиков
app.use((err, req, res, next) => {
  // если  у переданной ошибки нет  статуса, то будет 500, если статус был  указан ,  то будет какой указан
  const { status = 500, message = "Server  error" } = err;
  console.log("error");
  return res.status(status).json({ message: message });
});

module.exports = app;
