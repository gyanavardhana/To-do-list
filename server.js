const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tasktracker', {});

// Define task schema
const taskSchema = new mongoose.Schema({
    title: String
});

// Create task model
const Task = mongoose.model('Task', taskSchema);

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add a new task
app.post('/tasks', async (req, res) => {
    const { title } = req.body;
    try {
        const newTask = new Task({ title });
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Edit a task
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const task = await Task.findById(id);
        task.title = title;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        res.json(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});