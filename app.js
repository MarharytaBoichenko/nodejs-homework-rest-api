const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const mongoose = require("mongoose");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

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
