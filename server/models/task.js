const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  options: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  deadlineDate: {
    type: Date,
  },
  desc: {
    type: String,
  },
});

taskSchema.set("timestamps", true);

module.exports = mongoose.model("Task", taskSchema);
