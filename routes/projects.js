const express = require('express');
const router = express.Router();
const { Project, User } = require('../models');
const authMiddleware = require('../middleware/auth');

// Create Project (Admin only)
router.post('/create', authMiddleware, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Access denied' });

  const { name } = req.body;

  try {
    const newProject = await Project.create({ name });
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Project (Admin only)
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Access denied' });

  const { id } = req.params;

  try {
    await Project.destroy({ where: { id } });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign Manager to Project (Admin only)
router.post('/assign-manager/:projectId', authMiddleware, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Access denied' });

  const { projectId } = req.params;
  const { managerId } = req.body;

  try {
    const project = await Project.findByPk(projectId);
    const manager = await User.findByPk(managerId);

    if (!project || !manager || manager.role !== 'Manager') return res.status(400).json({ message: 'Invalid project or manager' });

    await project.addUser(manager);
    res.status(200).json({ message: 'Manager assigned to project' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
