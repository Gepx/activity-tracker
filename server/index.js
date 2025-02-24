const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const taskRoutes = require("./routes/task");
const eventRoutes = require("./routes/event");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", taskRoutes);
app.use("/api/events", eventRoutes);

// db connection
mongoose
  .connect("mongodb://127.0.0.1/activity-tracker")
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Connection Error: ", err);
  });

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
