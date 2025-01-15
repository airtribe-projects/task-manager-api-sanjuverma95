const express = require("express");
const taskUtils = require("./task_utils");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All Tasks
// var tasks = [
//   {
//     id: 2,
//     title: "Create a new project",
//     description: "Create a new project using Magic",
//     completed: false,
//   },
// ];
let tasks = require("./task.json").tasks;

// Implement GET /tasks: Retrieve all tasks.
app.get("/tasks", (req, res) => {
  if (req.query.completed) {
    var completed = req.query.completed === "true";
    return res.status(200).json({
      tasks: tasks.filter((t) => t.completed == completed),
    });
  }

  return res.status(200).json({ ...tasks });
});

// Implement GET /tasks/:id: Retrieve a specific task by its ID.
app.get("/tasks/:id", (req, res) => {
  var id = req.params.id;
  var task = taskUtils.findTaskById(tasks, id);

  if (!task) {
    return res.status(404).json({
      message: "Bad Request",
      error: `Task with ID ${id} does not exist`,
    });
  }

  return res.status(200).json(task);
});

// Implement POST /tasks: Create a new task with the required fields (title, description, completed).
app.post("/tasks", (req, res) => {
  var taskToAdd = req.body;
  var taskValidity = taskUtils.checkTaskValidity(taskToAdd);

  if (!taskValidity.valid) {
    return res.status(400).json({
      message: "Bad Request",
      error: taskValidity.error,
    });
  }

  taskToAdd.id = Math.max(0, ...tasks.map((t) => t.id)) + 1;

  tasks.push(taskToAdd);

  return res.status(201).json({
    message: "Successfully created!",
    id: taskToAdd.id,
  });
});

// Implement PUT /tasks/:id: Update an existing task by its ID.
app.put("/tasks/:id", (req, res) => {
  var id = req.params.id;
  var taskToUpdate = taskUtils.findTaskById(tasks, id);
  if (!taskToUpdate) {
    return res.status(404).json({
      message: "Bad Request",
      error: `Task with ID ${id} does not exist`,
    });
  }

  var updatedTask = req.body;
  var taskValidity = taskUtils.checkTaskValidity(updatedTask);
  if (!taskValidity.valid) {
    return res.status(400).json({
      message: "Bad Request",
      error: taskValidity.error,
    });
  }

  taskToUpdate.title = updatedTask.title;
  taskToUpdate.description = updatedTask.description;
  taskToUpdate.completed = updatedTask.completed;

  return res.status(200).json({
    message: "Successfully updated",
    id: taskToUpdate.id,
  });
});

// Implement DELETE /tasks/:id: Delete a task by its ID.
app.delete("/tasks/:id", (req, res) => {
  var id = req.params.id;

  if (!taskUtils.deleteTaskById(tasks, id)) {
    return res.status(404).json({
      message: `Bad request`,
      error: `Task with ID ${id} does not exist`,
    });
  }

  return res.status(200).json({
    message: "Successfully deleted",
    id: id,
  });
});

// Listen
app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
