const express = require("express");
const router = express.Router();
const validation = require("../../middlewares/validation/contactValidation");
const { userJoiSchema } = require("../../model/user");
// создаем "страницу "

const { auth: ctrl } = require("../../controllers");
//  используем  validatio joi   как в  контактах -  та же ф-я  ,
router.post("/signup", validation(userJoiSchema), ctrl.addUser);
router.post("/login", validation(userJoiSchema), ctrl.login);
// router.get("/logout", ctrl.logout);
// router.patch("/users", ctrl.updateSubscription)

module.exports = router;
