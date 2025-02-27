const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
/// подключение  к БД
const { DB_HOST, PORT = 3000 } = process.env;
console.log(DB_HOST);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
