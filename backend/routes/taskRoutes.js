const express = require('express');
const {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();
router.use(authMiddleware); // Apply authentication middleware to all routes

// Create a new task (only for admins and managers)
router.post('/', roleMiddleware(['admin', 'manager']), createTask);

// Get all tasks for a specific project (for all authenticated users)
router.get('/project/:projectId', getTasksByProject);

// Get a specific task by ID (for all authenticated users)
router.get('/:id', getTaskById);

// Update a task by ID (only for admins and managers)
router.put('/:id', roleMiddleware(['admin', 'manager']), updateTask);

// Delete a task by ID (only for admins and managers)
router.delete('/:id', roleMiddleware(['admin', 'manager']), deleteTask);

module.exports = router;
