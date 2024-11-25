
# MERN Todo List App

A simple and stylish Todo List application built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to add, edit, and delete tasks with a clean, responsive UI. It also provides basic functionality for interacting with tasks stored in a MongoDB database.

## Features

- Add, edit, and delete tasks
- View tasks in a clean and modern interface
- Persist tasks using MongoDB database
- Input validation to prevent adding empty tasks
- Responsive layout for mobile and desktop devices

## Tech Stack

- **MongoDB**: Database for storing tasks
- **Express**: Backend framework to handle API requests
- **React**: Frontend framework for building the user interface
- **Node.js**: JavaScript runtime for the server-side application

## Project Structure

```
/client           # React frontend application
  /node_modules   # Frontend dependencies
  /public         # Public assets and index.html
  /src            # React components, state management, and styling

/server           # Node.js backend application
  /node_modules   # Backend dependencies
  /models         # MongoDB models for tasks
  server.js       # Server entry point and API routes
  .env            # Environment variables for sensitive data like MongoDB URI
  /controllers    # Logic for handling requests

.gitignore        # Git ignore file for ignoring node_modules and .env
README.md         # Project description and setup instructions
package.json      # Project metadata and dependencies
```

## Installation

Follow these steps to get the project running locally:

### 1. Clone the repository
```bash
git clone https://github.com/khaledshishani32/mern-todo-app
cd mern-todo-list
```

### 2. Install backend dependencies
Navigate to the `server` folder and install the required dependencies:
```bash
cd server
npm install
```

### 3. Install frontend dependencies
Navigate to the `client` folder and install the required dependencies:
```bash
cd client
npm install
```

### 4. Set up environment variables
In the `server` folder, create a `.env` file to store your environment variables. For example:
```bash
MONGODB_URI=mongodb://localhost:27017/todolist
```

### 5. Start the backend server
In the `server` folder, run the following command to start the server:
```bash
npm start
```

### 6. Start the frontend
In the `client` folder, run the following command to start the React frontend:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`, and the backend will be running on `http://localhost:5000`.

## Usage

Once the app is running, you can:

- **Add a task**: Type a task in the input field and click "Add Task".
- **Edit a task**: Click the "Edit" button next to a task to update it.
- **Delete a task**: Click the "Delete" button next to a task to remove it from the list.

## Contributions

Feel free to fork the project and submit pull requests. If you have any suggestions or improvements, open an issue, and we'll discuss it.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
