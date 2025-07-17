const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');

// ✅ Add new task
router.post('/', auth, async (req, res) => {
  const { title } = req.body;

  try {
    const newTask = new Task({
      title,
      user: req.user.id // From JWT
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("POST /api/tasks error:", err.message);
    res.status(500).send('Server Error');
  }
});


// ✅ Get all tasks for logged-in user
router.get('/', auth, async (req, res) => {
  console.log("USER:", req.user); // 👈 Debug user
  try {
    const tasks = await Task.find({ user: req.user.id });
    console.log("TASKS:", tasks); // 👈 Debug tasks
    res.json(tasks);
  } catch (err) {
    console.error("ERROR:", err); // 👈 Debug error
    res.status(500).send('Server Error');
  }
});


// ✅ Update a task by ID
router.put('/:id', auth, async (req, res) => {
  const { title, completed } = req.body;

  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Check if user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task.title = title !== undefined ? title : task.title;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ✅ Delete a task by ID
router.delete('/:id', auth, async (req, res) => {
  console.log("DELETE called with ID:", req.params.id);
  console.log("User ID:", req.user.id);

  try {
    let task = await Task.findById(req.params.id);
    console.log("Found Task:", task);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.user.toString() !== req.user.id) {
      console.log("Unauthorized! Task belongs to:", task.user);
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await task.deleteOne();

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error("DELETE Error:", err);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
