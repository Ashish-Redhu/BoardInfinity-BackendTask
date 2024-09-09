const express = require('express');
const router = express.Router();
const { Project, User } = require('../models');
const authMiddleware = require('../middleware/auth');

// View Projects assigned to Employee
router.get('/projects', authMiddleware, async (req, res) => {
  if (req.user.role !== 'Employee') return res.status(403).json({ message: 'Access denied' });

  try {
    const projects = await req.user.getProjects();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
