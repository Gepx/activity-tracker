const Task = require("../models/task");

// Create a new task
module.exports.create = async (req, res) => {
  try {
    const { options, title, deadlineDate, desc } = req.body;
    const task = new Task({
      options,
      title,
      deadlineDate,
      desc,
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error: error });
  }
};

// Get one task
module.exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json({ message: "Task found", task });
  } catch (error) {
    res.status(500).json({ message: "Error getting task", error: error });
  }
};

// Get all tasks
module.exports.getAll = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks", error: error });
  }
};

// Update taks
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error });
  }
};

// Delete task
module.exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error });
  }
};
