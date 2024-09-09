const express = require('express');
const router = express.Router();
const { Project, User } = require('../models');
const authMiddleware = require('../middleware/auth');

// Assign Employee to Project (Manager only)
router.post('/assign-employee/:projectId', authMiddleware, async (req, res) => {
  if (req.user.role !== 'Manager') return res.status(403).json({ message: 'Access denied' });

  const { projectId } = req.params;
  const { employeeId } = req.body;

  try {
    const project = await Project.findByPk(projectId);
    const employee = await User.findByPk(employeeId);

    if (!project || !employee || employee.role !== 'Employee') return res.status(400).json({ message: 'Invalid project or employee' });

    await project.addUser(employee);
    res.status(200).json({ message: 'Employee assigned to project' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove Employee from Project (Manager only)
router.post('/remove-employee/:projectId', authMiddleware, async (req, res) => {
  if (req.user.role !== 'Manager') return res.status(403).json({ message: 'Access denied' });

  const { projectId } = req.params;
  const { employeeId } = req.body;

  try {
    const project = await Project.findByPk(projectId);
    const employee = await User.findByPk(employeeId);

    if (!project || !employee || employee.role !== 'Employee') return res.status(400).json({ message: 'Invalid project or employee' });

    await project.removeUser(employee);
    res.status(200).json({ message: 'Employee removed from project' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
