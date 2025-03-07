const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact");

router.post("/", contactController.createContact);
router.get("/", contactController.getAllContacts);
router.put("/:id", contactController.updateContactStatus);

module.exports = router;
