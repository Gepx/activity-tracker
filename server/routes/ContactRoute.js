const express = require("express");
const router = express.Router();
const contactController = require("../controllers/ContactController");

router.post("/", contactController.createContact);
router.get("/", contactController.getAllContacts);
router.put("/:id", contactController.updateContactStatus);

module.exports = router;
