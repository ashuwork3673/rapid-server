const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware for JWT Authentication
const authMiddleware = require('./authMiddleware');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, full_name, phone, role, department } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({ 
      username, 
      email, 
      password: hashedPassword, 
      full_name, 
      phone, 
      role, 
      department 
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send user details along with token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role, // Add any additional user details you need
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

  

// Protected route example (using authMiddleware)
router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Profile data', user: req.user });
});

module.exports = router;
