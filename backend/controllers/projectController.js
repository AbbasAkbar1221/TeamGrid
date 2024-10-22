const Project = require('../models/Project');
const User = require('../models/User');

// Create a new project
const createProject = async (req, res) => {
  try {
    const { title, description, manager, teamMembers } = req.body;

    // Validate if manager exists in the database
    const managerExists = await User.findById(manager);
    if (!managerExists) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    // Create the project
    const newProject = new Project({
      title,
      description,
      manager,
      teamMembers,
    });

    // Save the project to the database
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('manager', 'username')        // Only populate the 'name' field from the 'manager' reference
      .populate('teamMembers', 'username')    // Populate only 'name' for team members
      .populate('tasks');                 // Populate all task fields (customize as needed)

    // Optionally, handle case where no projects are found
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: 'No projects found' });
    }

    // Return the populated project data
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    .populate('manager', 'username')        
    .populate('teamMembers', 'username')    
    .populate('tasks');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { title, description, manager, teamMembers } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, manager, teamMembers },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
