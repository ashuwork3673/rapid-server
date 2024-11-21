const express = require('express');
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blog');
const router = express.Router();

// Set up Multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    cb(null, uploadPath); // Store the file in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext; // Unique filename based on timestamp
    cb(null, filename); // Store the file with this filename
  }
});

const upload = multer({ storage: storage });

// POST: Create a new blog entry with image upload
router.post('/blogs', upload.array('images', 5), async (req, res) => { // Limit to 5 images per blog post
  try {
    const { title, slug, metaTags, pageH1, about1, pageH2, about2, content } = req.body;

    // Validate required fields
    if (!title || !slug || !pageH1 || !content) {
      return res.status(400).json({ message: 'Title, Slug, Page H1, and Content are required.' });
    }

    // Collect image URLs from the uploaded files
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    // Create a new blog entry
    const newBlog = new Blog({
      title,
      slug,
      metaTags,
      pageH1,
      about1,
      pageH2,
      about2,
      content,
      images, // Save the array of image URLs
    });

    // Save the blog entry to the database
    const savedBlog = await newBlog.save();
    return res.status(201).json(savedBlog);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating blog entry.' });
  }
});

// GET: Retrieve all blog entries
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blogs from the database
    return res.status(200).json(blogs); // Send the blogs array as response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving blogs.' });
  }
});

// GET: Retrieve a blog entry by slug
router.get('/blogs/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    return res.status(200).json(blog);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving blog entry.' });
  }
});

// PUT: Update a blog entry by slug with image upload
router.put('/blogs/:slug', upload.array('images', 5), async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, metaTags, pageH1, about1, pageH2, about2, content } = req.body;

    // Find the blog by slug
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Collect image URLs from the uploaded files
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    // Update blog fields
    blog.title = title || blog.title;
    blog.metaTags = metaTags || blog.metaTags;
    blog.pageH1 = pageH1 || blog.pageH1;
    blog.about1 = about1 || blog.about1;
    blog.pageH2 = pageH2 || blog.pageH2;
    blog.about2 = about2 || blog.about2;
    blog.content = content || blog.content;
    blog.images = [...blog.images, ...images]; // Append new images to existing ones

    // Save the updated blog
    const updatedBlog = await blog.save();
    return res.status(200).json(updatedBlog);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating blog entry.' });
  }
});

module.exports = router;
