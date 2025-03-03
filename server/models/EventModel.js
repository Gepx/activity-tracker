const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  startTime: Date,
  endTime: Date,
  allDay: {
    type: Boolean,
    default: function () {
      return !this.startTime || !this.endTime;
    },
  },
  reminderTime: Date,
});

module.exports = mongoose.model("Calendar", eventSchema);
