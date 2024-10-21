const express = require('express');
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Create a new project (only for admins and managers)
router.post('/', roleMiddleware(['admin', 'manager']), createProject);

// Get all projects (for all authenticated users)
router.get('/', getAllProjects);

// Get a specific project by ID (for all authenticated users)
router.get('/:id', getProjectById);

// Update a project by ID (only for admins and managers)
router.put('/:id', roleMiddleware(['admin', 'manager']), updateProject);

// Delete a project by ID (only for admins and managers)
router.delete('/:id', roleMiddleware(['admin', 'manager']), deleteProject);


module.exports = router;
