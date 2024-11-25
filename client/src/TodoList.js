// client/src/TodoList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data));
  }, []);

  const addTask = () => {
    axios.post('http://localhost:5000/tasks', { text: newTask })
      .then(response => {
        setTasks([...tasks, response.data]);
        setErrorMessage(""); // Clear error message if task is added successfully
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message); // Display error message from the backend

          // Clear the error message after 5 seconds
          setTimeout(() => {
            setErrorMessage(""); // Clear error after 5 seconds
          }, 3000);
        }
      });
    setNewTask(""); // Clear input field
  };

  const removeTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)));
  };

  const editTask = (id, newText) => {
    axios.put(`http://localhost:5000/tasks/${id}`, { text: newText })
      .then(response => {
        const updatedTasks = tasks.map(task => task._id === id ? response.data : task);
        setTasks(updatedTasks);
        setErrorMessage(""); // Clear error message if task is updated successfully
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message); // Display error message from the backend

          // Clear the error message after 5 seconds
          setTimeout(() => {
            setErrorMessage(""); // Clear error after 5 seconds
          }, 3000);
        }
      });
  };

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>

      {/* Display error message if task already exists */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button 
        onClick={addTask}
        disabled={!newTask.trim()} // Disable button if input is empty or just spaces
      >
        Add Task
      </button>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <span className={task.completed ? "completed" : ""}>{task.text}</span>
            <div className="task-actions">
              <button onClick={() => editTask(task._id, prompt('Edit Task:', task.text))}>Edit</button>
              <button onClick={() => removeTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
