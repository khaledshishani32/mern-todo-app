// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // to parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todolist', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.log("Error connecting to MongoDB", err);
});

// Task Schema
const taskSchema = new mongoose.Schema({
    text: { type: String, required: true, unique: true },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

// Check if the task already exists in the DB
const taskExists = async (text) => {
    const existingTask = await Task.findOne({ text });
    return existingTask;
};

// Routes for tasks

// GET all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// POST a new task
app.post('/tasks', async (req, res) => {
    const { text } = req.body;

    // Check if task already exists
    const existingTask = await taskExists(text);
    if (existingTask) {
        return res.status(400).json({ message: "Task already exists in the database." });
    }

    const newTask = new Task({ text });
    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error adding task' });
    }
});

// PUT update a task
app.put('/tasks/:id', async (req, res) => {
    const { text } = req.body;
    const taskId = req.params.id;

    // Check if the new task text already exists (excluding the task being updated)
    const existingTask = await taskExists(text);
    if (existingTask && existingTask._id.toString() !== taskId) {
        return res.status(400).json({ message: "Task with this text already exists." });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, { text }, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
});

// DELETE a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
