// routes/imageRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Hero = require('../models/Hero');
const mongoose = require('mongoose');
const router = express.Router();

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Route to upload an image
router.post('/upload-image', upload.single('upload'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    // Send response in CKEditor-compatible format
    res.json({
      uploaded: 1,
      url: imageUrl
    });
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ error: 'Failed to save image' });
  }
});

// Route to fetch all hero images
router.get('/hero-images', async (req, res) => {
  try {
    const heroImages = await Hero.find();
    res.json(heroImages);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

module.exports = router;
