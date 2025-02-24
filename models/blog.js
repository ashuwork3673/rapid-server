const mongoose = require("mongoose");

// Define the schema for the Blog model
const blogSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  slug: {
    type: String,
    unique: true, // Ensures the slug is unique for each blog
  },
  // metaTags: {
  //   type: String, // Store the meta tags as a string or as an array of strings
  //   required: false,
  // },
  meta_title: {
    type: String,
  },
  meta_description: {
    type: String,
  },
  schema: {
    type: String,
  },
  robust_meta: {
    type: String,
  },
  canonical: {
    type: String,
  },
  meta: {
    type: String,
  },
  pageH1: {
    type: String,
  },
  about1: {
    type: String,
    required: false,
  },
  pageH2: {
    type: String,
    required: false,
  },
  about2: {
    type: String,
    required: false,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Blog model
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
