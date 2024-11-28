const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authMiddleware = require('./authMiddleware'); // Middleware for JWT authentication

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

// Get all users
router.get('/users', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Check if users are found
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Return the list of all user details
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the URL parameter
    const { username,password, email, full_name, phone, role, department } = req.body; // Get updated user data from the body

    // Check if user exists
    const user = await User.findById(id); // Find the user by ID
    if (!user) return res.status(404).json({ message: 'User not found' }); // Return error if user is not found

    // Update user fields with new data (only update fields that are provided in the request)
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.full_name = full_name || user.full_name;
    user.phone = phone || user.phone;
    user.role = role || user.role;
    user.department = department || user.department;

    // Save the updated user
    await user.save();
    res.status(200).json({ message: 'User updated successfully', user }); // Return success response with updated user

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message }); // Return error response in case of an exception
  }
});

// Delete User
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Attempt to delete the user by ID
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



module.exports = router;
