const Contact = require("../models/contact");

module.exports.createContact = async (req, res) => {
  try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
    });

    await contact.save();
    res.status(201).json({ message: "Contact created successfully" }, contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to create contact" });
  }
};

module.exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

module.exports.updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (req.body.status) {
      contact.status = req.body.status;
    }

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
