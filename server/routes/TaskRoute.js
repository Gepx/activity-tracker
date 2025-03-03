const express = require("express");
const router = express.Router();
const taskController = require("../controllers/TaskController");

router.post("/add-task", taskController.create);
router.get("/get-tasks/:id", taskController.getOne);
router.get("/get-tasks", taskController.getAll);
router.put("/update-tasks/:id", taskController.update);
router.delete("/delete-tasks/:id", taskController.destroy);

module.exports = router;
