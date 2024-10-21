const express = require('express');
const {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();
router.use(authMiddleware);

// Create a new task
router.post('/', createTask);

// Get all tasks for a specific project
router.get('/project/:projectId', getTasksByProject);

// Get a specific task by ID
router.get('/:id', getTaskById);

// Update a task by ID
router.put('/:id', updateTask);

// Delete a task by ID
router.delete('/:id', deleteTask);

module.exports = router;
