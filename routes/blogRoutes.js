const express = require("express");
const path = require("path");
const Blog = require("../models/blog");
const router = express.Router();

// Set up Multer storage for image uploads

// POST: Create a new blog entry with image upload
router.post("/blogs", async (req, res) => {
  // Limit to 5 images per blog post
  try {
    const {
      title,
      slug,
      meta_title,
      meta_description,
      schema,
      canonical,
      robust_meta,
      meta,
      pageH1,
      about1,
      pageH2,
      about2,
      content,
    } = req.body;

    // Validate required fields
    

    // Collect image URLs from the uploaded files

    // Create a new blog entry
    const newBlog = new Blog({
      title,
      slug,
      meta_title,
      meta_description,
      schema,
      canonical,
      robust_meta,
      meta,
      pageH1,
      about1,
      pageH2,
      about2,
      content,
    });

    // Save the blog entry to the database
    const savedBlog = await newBlog.save();
    return res.status(201).json(savedBlog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating blog entry." });
  }
});

// GET: Retrieve all blog entries
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blogs from the database
    return res.status(200).json(blogs); // Send the blogs array as response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving blogs." }); // starting in the instrances of things improperly
  }
});

// GET: Retrieve a blog entry by slug
router.get("/blogs/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" }); // if blogs not found
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving blog entry." }); // if blogs getting any type of error
  }
});

// PUT: Update a blog entry by slug with image upload
router.put("/blogs/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const {
      title,
      meta_title,
      meta_description,
      schema,
      canonical,
      robust_meta,
      meta,
      pageH1,
      about1,
      pageH2,
      about2,
      content,
      newslug,
    } = req.body;

    // Find the blog by slug
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (newslug) {
      const existingBlogWithNewSlug = await Blog.findOne({ slug: newslug });
      if (existingBlogWithNewSlug) {
        return res.status(400).json({ message: "New slug is already in use." });
      }
      blog.slug = newslug; // Update to the new slug
    }

    // Collect image URLs from the uploaded files

    // Update blog fields
    blog.title = title || blog.title;
    blog.meta_title = meta_title || blog.meta_title;
    blog.meta_description = meta_description || blog.meta_description;
    blog.schema = schema || blog.schema;
    blog.canonical = canonical || blog.canonical;
    blog.robust_meta = robust_meta || blog.robust_meta;
    blog.meta = meta || blog.meta;
    blog.pageH1 = pageH1 || blog.pageH1;
    blog.about1 = about1 || blog.about1;
    blog.pageH2 = pageH2 || blog.pageH2;
    blog.about2 = about2 || blog.about2;
    blog.content = content || blog.content;

    // Save the updated blog
    const updatedBlog = await blog.save();
    return res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating blog entry." });
  }
});

module.exports = router;
