const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/authentication/auth");
const upload = require("../../middlewares/upload/upload");

const { users: ctrl } = require("../../controllers");

router.get("/current", auth, ctrl.getCurrent);
router.get("/logout", auth, ctrl.logout);
router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);
router.patch("/", auth, ctrl.updateSubscription);

module.exports = router;
