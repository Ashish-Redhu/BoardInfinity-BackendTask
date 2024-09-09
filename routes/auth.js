const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Route (Admin only)
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if an Admin already exists
    const existingAdmin = await User.findOne({ where: { role: 'Admin' } });

    // If no Admin exists, allow the first user to be the Admin
    if (!existingAdmin) {
      if (role !== 'Admin') {
        return res.status(400).json({ message: 'First user must be an Admin' });
      }
    } else {
      // Only an Admin can create users
      if (role !== 'Manager' && role !== 'Employee') {
        return res.status(400).json({ message: 'Invalid role' });
      }

      // Get the current user (this logic assumes that the admin is logged in and the token is provided in the request header)
      const token = req.header('Authorization');
      if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

      const decoded = jwt.verify(token, 'your_jwt_secret');
      const loggedInUser = await User.findByPk(decoded.id);

      if (!loggedInUser || loggedInUser.role !== 'Admin') {
        return res.status(403).json({ message: 'Only Admin can create users' });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
