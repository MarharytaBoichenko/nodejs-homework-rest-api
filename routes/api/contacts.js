const express = require("express");
const router = express.Router();
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validation/contactValidation");

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getByID);

router.post("/", addContactValidation, ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", updateContactValidation, ctrl.update);

module.exports = router;
