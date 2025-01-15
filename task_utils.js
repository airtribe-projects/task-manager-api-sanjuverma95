function findTaskById(tasks, id) {
  return tasks.find((t) => t.id === parseInt(id));
}

function deleteTaskById(tasks, id) {
  var indexOfTask = tasks.findIndex((t) => t.id === parseInt(id));
  if (indexOfTask == -1) {
    return false;
  }

  tasks.splice(indexOfTask);

  return {
    deleted: true,
  };
}

function checkTaskValidity({ title, description, completed }) {
  if (!title || typeof title !== "string") {
    return {
      valid: false,
      error: "Provide a valid title",
    };
  }
  if (!description || typeof description !== "string") {
    return {
      valid: false,
      error: "Provide a valid description",
    };
  }
  if (typeof completed !== "boolean") {
    // if (completed == "true") {
    //   completed = true;
    // } else if (completed == "false") {
    //   completed = false;
    // } else {
    return {
      valid: false,
      error: "Provide a valid value for completed",
    };
    // }
  }

  return {
    valid: true,
  };
}

module.exports = { findTaskById, checkTaskValidity, deleteTaskById };
