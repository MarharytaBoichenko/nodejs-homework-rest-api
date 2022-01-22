const express = require("express");
const router = express.Router();

const contactsControllers = require("../../controllers/products");

router.get("/", contactsControllers.getAll);

router.get("/:contactId", contactsControllers.getByID);

router.post("/", contactsControllers.add);

router.delete("/:contactId", contactsControllers.remove);

router.put("/:contactId", contactsControllers.update);

module.exports = router;
