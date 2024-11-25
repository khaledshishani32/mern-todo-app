// server/server.js
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
    text: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

// Routes for tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const newTask = new Task({ text: req.body.text });
    await newTask.save();
    res.json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
