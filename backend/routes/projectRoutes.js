const express = require('express');
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.use(authMiddleware); 

// Create a new project
router.post('/', createProject);

// Get all projects
router.get('/', getAllProjects);

// Get a specific project by ID
router.get('/:id', getProjectById);

// Update a project by ID
router.put('/:id', updateProject);

// Delete a project by ID
router.delete('/:id', deleteProject);

module.exports = router;
