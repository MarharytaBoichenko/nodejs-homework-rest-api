const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/authentication/auth");

const { users: ctrl } = require("../../controllers");

router.get("/current", auth, ctrl.getCurrent);
router.get("/logout", auth, ctrl.logout);
router.patch("/", auth, ctrl.updateSubscription);

module.exports = router;
