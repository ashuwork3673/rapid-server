const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const router = express.Router();

// API endpoint to create a user
router.post('/', async (req, res) => {
    const { user_id, username, password } = req.body;

    // Basic validation
    if (!user_id || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({ user_id, username, password: hashedPassword });
        await userData.save();
        res.status(201).json({ message: 'User Created Successfully', user: { user_id: userData.user_id, username: userData.username } });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'User Creation unsuccessful', error: error.message });
    }
});

// API endpoint for user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ user_id: user.user_id, username: user.username }, process.env.JWT_SECRET || 'your_jwt_secret_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login unsuccessful', error: error.message });
    }

    
});

// API endpoint to retrieve all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});


module.exports = router;
