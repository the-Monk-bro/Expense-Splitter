# Task Manager API
This API is built to provide a simple, secure backend for task management. It allows users to create, read, update, and delete tasks while ensuring that all actions are authenticated and user-specific.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## API Documentation
👉 See below for endpoints and examples

### Base URL
```bash
http://localhost:5000/api
```

### Authentication Overview
-Uses JWT (JSON Web Token)
-Token expires in 1 hour
-Required for all task-related routes
-Auth Header Format :
```http
Authorization: Bearer <JWT_TOKEN>
```

-Authentication Endpoints
1. Sign Up (Register User)
**POST /signup**
Creates a new user account
Request body: 
```json
{
  "name": "Mayank",
  "email": "mayank@gmail.com",
  "password": "password123"
}
```

2. Login User
**POST /login
Authenticates user and generates JWT token
Request Body:
```json
{
  "email": "mayank@gmail.com",
  "password": "password123"
}
```


