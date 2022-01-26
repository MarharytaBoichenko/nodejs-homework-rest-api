const express = require("express");
const router = express.Router();
const validation = require("../../middlewares/validation/contactValidation");
const { contactJoiSchema, favoriteJoiSchema } = require("../../model");

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getByID);

router.post("/", validation(contactJoiSchema), ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", validation(contactJoiSchema), ctrl.update);
router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrl.updateFavorite
);

module.exports = router;
