const Event = require("../models/EventModel");

// Create a new event
module.exports.createEvent = async (req, res) => {
  try {
    const { title, startTime, endTime, allDay, reminderTime } = req.body;
    const event = new Event({
      title,
      startTime,
      endTime,
      allDay,
      reminderTime,
    });
    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Error adding event", error: error });
  }
};

// Get Events
module.exports.getEvents = async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error getting events", error: error });
  }
};

// Get one event
module.exports.getOneEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    res.status(200).json({ message: "Event found", event });
  } catch (error) {
    res.status(500).json({ message: "Error getting event", error: error });
  }
};

// Update event
module.exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error });
  }
};

module.exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEvent = await Event.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Event deleted successfully", event: deleteEvent });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error });
  }
};
