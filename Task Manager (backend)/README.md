# Task Manager API
This API is built to provide a simple, secure backend for task management. It allows users to create, read, update, and delete tasks while ensuring that all actions are authenticated and user-specific. Demonstrates JWT auth, user isolation, and CRUD operations.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Run locally
Clone the repository in your local machine and run the following commands. Node.js and npm should be installed before running it.
```bash
npm install
npm start
```

## API Documentation

### Base URL
```bash
http://localhost:5000/api
```

### Authentication Endpoints
#### 1. Sign Up (Register User)
**POST /signup**

Creates a new user account. User need to pass name,email and password as a json object in request.

Request body example: 
```json
{
  "name": "Mayank",
  "email": "mayank@gmail.com",
  "password": "password123"
}
```

#### 2. Login User
**POST /login**

Authenticates user and generates JWT token. User needs to pass email and password as a json object in request.

Request body example:
```json
{
  "email": "mayank@gmail.com",
  "password": "password123"
}
```

### Authentication Overview
- Uses JWT (JSON Web Token)
- Token expires in 1 hour
- Required for all task-related routes. All /task routes are protected using JWT.
- Authorization Header Format (required for all /task routes):
```http
Authorization: Bearer <JWT_TOKEN>
```


### Task Management Endpoints
#### 3. See all Tasks
**GET /task**

Returns all tasks created by the logged-in user.

#### 4. Create a Task
**POST /task**

Creates a new task for the logged-in user. User needs to pass title, description and due date of the task as a json object in request. The default status of a task is 'pending', user can change it later. It automatically creates a task id which user can use later to update or delete the task.

Request body example:
```json
{
  "title": "Finish Backend",
  "description": "Complete task manager API",
  "dueDate": "2026-02-15"
}
```
#### 5. Update a Task
**PUT /task/:id**

Updates an existing task of the logged-in user. User can change description, due date and status of a task (only 'pending', 'in-progress' and 'completed' statuses are allowed). Title of the task cannot be changed.

Request body example:
```json
{
  "description": "Updated description",
  "dueDate": "2026-02-20"
  "status": "completed"
}
```
#### 6. Delete a Task
**DELETE /task/:id**

Deletes an existing task of the logged-in user.

### HTTP Status Codes Used
- 200 — OK
- 201 — Created
- 400 — Bad Request
- 401 — Unauthorized
- 404 — Not Found
- 409 — Conflict

---
&copy; 2026 TaskManagerApiMG
