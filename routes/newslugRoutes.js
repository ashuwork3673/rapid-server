const express = require("express");
const path = require("path");
const NewSlug = require("../models/newslug");
const router = express.Router();

// Set up Multer storage for image uploads

// POST: Create a new blog entry with image upload
router.post("/newslugs", async (req, res) => {
  // Limit to 5 images per blog post
  try {
    const lastslug = await NewSlug.findOne().sort({ id: -1 });
    const newId = lastslug ? lastslug.id + 1 : 1;
    const {
      title,
      slug,
      meta_title, // for meta data
      meta_description, // for meta data
      schema, // schema content
      canonical, // canonical upadate for seo purpose
      robust_meta, // canonical update for seo purpose
      meta, // canonical update for seo purpose
      pageH1, // canonical update for seo purpose
      about1,
      pageH2,
      about2,
      content,
    } = req.body;

    // Validate required fields unified things kenonical

    // Collect image URLs from the uploaded files

    // Create a new blog entry
    const newSlug = new NewSlug({
      id: newId,
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
    const savedNewSlug = await newSlug.save();
    return res.status(201).json(savedNewSlug);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating blog entry." });
  }
});

// GET: Retrieve all blog entries
router.get("/newslugs", async (req, res) => {
  try {
    const newslugs = await NewSlug.find(); // Fetch all blogs from the database
    return res.status(200).json(newslugs); // Send the blogs array as response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving blogs." });
  }
});

// GET: Retrieve a blog entry by slug
router.get("/newslugs/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const newslugs = await NewSlug.findOne({ slug });

    if (!newslugs) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(newslugs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving blog entry." });
  }
});

// PUT: Update a blog entry by slug with image upload
// PUT: Update a blog entry by slug with image upload
router.put("/newslugs/:slug", async (req, res) => {
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

    // Find the blog by current slug
    const blogToUpdate = await NewSlug.findOne({ slug });

    if (!blogToUpdate) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // If a new slug is provided, ensure it doesn't conflict with an existing blog
    if (newslug && newslug !== slug) {
      const existingBlogWithNewSlug = await NewSlug.findOne({ slug: newslug });
      if (existingBlogWithNewSlug) {
        return res.status(400).json({ message: "New slug is already in use." });
      }
      blogToUpdate.slug = newslug; // Update to the new slug
    }

    // Update other blog fields
    blogToUpdate.title = title || blogToUpdate.title;
    blogToUpdate.meta_title = meta_title || blogToUpdate.meta_title;
    blogToUpdate.meta_description =
      meta_description || blogToUpdate.meta_description;
    blogToUpdate.schema = schema || blogToUpdate.schema;
    blogToUpdate.canonical = canonical || blogToUpdate.canonical;
    blogToUpdate.robust_meta = robust_meta || blogToUpdate.robust_meta;
    blogToUpdate.meta = meta || blogToUpdate.meta;
    blogToUpdate.pageH1 = pageH1 || blogToUpdate.pageH1;
    blogToUpdate.about1 = about1 || blogToUpdate.about1;
    blogToUpdate.pageH2 = pageH2 || blogToUpdate.pageH2;
    blogToUpdate.about2 = about2 || blogToUpdate.about2;
    blogToUpdate.content = content || blogToUpdate.content;

    // Save the updated blog
    const updatedBlog = await blogToUpdate.save();
    return res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating blog entry." });
  }
});

module.exports = router;
