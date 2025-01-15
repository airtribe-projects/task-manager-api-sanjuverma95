# Task Management API

A simple task management API built using Node.js and Express.js. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks.

---

## Overview

This API provides the following features:

- Retrieve all tasks, with an optional filter for completed tasks.
- Retrieve a specific task by its ID.
- Create a new task.
- Update an existing task by its ID.
- Delete a task by its ID.

The tasks are stored in-memory during runtime and are initially loaded from a `task.json` file.

---

## Setup Instructions

1.  Clone this repository:

    - `git clone <repository-url>`
    - `cd <repository-directory>`

2.  Install dependencies:

    - `npm install`

3.  Start the server:

    - `node app.js` or `npm run start`

4.  The server will be running on `http://localhost:3000`.

---

## Testing the API

### Using Postman

To test the API, you can use the provided Postman collection:

1.  Import the `Task Manager API.postman_collection.json` file into Postman.
2.  The collection contains pre-configured requests for all API endpoints.
3.  Update the collection variable `{{baseUrl}}` and `{{port}}` to match your server's base URL (e.g., `http://localhost:3000`).
4.  Execute the requests directly to test the API.

### Using curl or Other Tools

You can also test the API manually using curl or similar tools. Refer to the documentation below for endpoint details.

---

## API Endpoints

1.  **Retrieve All Tasks**

    - Endpoint: `GET /tasks`
    - Retrieves all tasks. Supports an optional filter to get completed or incomplete tasks.
    - Query Parameters: `completed` (optional, "true" or "false").
    - Example: `GET http://localhost:3000/tasks` or `GET http://localhost:3000/tasks?completed=true`

2.  **Retrieve a Specific Task by ID**

    - Endpoint: `GET /tasks/:id`
    - Retrieves a task by its ID.
    - Example: `GET http://localhost:3000/tasks/1`

3.  **Create a New Task**

    - Endpoint: `POST /tasks`
    - Creates a new task with the required fields.
    - Request Body:

      ```json
      {
        "title": "New Task",
        "description": "Task description",
        "completed": false
      }
      ```

    - Example: `POST http://localhost:3000/tasks`

4.  **Update an Existing Task by ID**

    - Endpoint: `PUT /tasks/:id`
    - Updates an existing task by its ID.
    - Request Body:

      ```json
      {
        "title": "Updated Task",
        "description": "Updated description",
        "completed": true
      }
      ```

    - Example: `PUT http://localhost:3000/tasks/1`

5.  **Delete a Task by ID**

    - Endpoint: `DELETE /tasks/:id`
    - Deletes a task by its ID.
    - Example: `DELETE http://localhost:3000/tasks/1`

---

## Notes

- The initial tasks are loaded from `task.json`. Make sure this file exists in the project directory.
- This API uses an in-memory store for task data. Changes are not persisted when the server restarts.
- Use the Postman collection for quick testing and exploration of the API.

---
