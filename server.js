const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // allow frontend

// Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/todoapp")
.then(() => console.log("Database connected"))
.catch(err => console.log(err));

// Schema
const taskSchema = new mongoose.Schema({
    title: String
});

const Task = mongoose.model("Task", taskSchema);

// 👉 Add Task
app.post("/api/tasks", async (req, res) => {
    const { title } = req.body;

    const newTask = new Task({ title });
    await newTask.save();

    res.json({ message: "Task saved" });
});

// 👉 Get Tasks
app.get("/api/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// 👉 Delete Task
app.delete("/api/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});