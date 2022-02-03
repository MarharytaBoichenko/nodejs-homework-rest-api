const express = require("express");
const router = express.Router();
const validation = require("../../middlewares/validation/contactValidation");
const { contactJoiSchema, favoriteJoiSchema } = require("../../model");

const { contacts: ctrl } = require("../../controllers");
const auth = require("../../middlewares/authentication/auth");

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", ctrl.getByID);

router.post("/", auth, validation(contactJoiSchema), ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", validation(contactJoiSchema), ctrl.update);
router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrl.updateFavorite
);

module.exports = router;
