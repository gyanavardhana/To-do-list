// Desc: Server file for Task Tracker app
// all the required modules

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

// middleware
app.use(express.json());
app.use(cors());
app.use(express.static('./static'));

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://127.0.0.1:27017/tasktracker', {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

// Define task schema
const taskSchema = new mongoose.Schema({
    title: String
});

// Create task model
const Task = mongoose.model('Task', taskSchema);


// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// CRUD Operations.

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

// delete a task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        res.json(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
