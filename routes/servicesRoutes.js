const express = require("express");
const mongoose = require("mongoose");
const Services = require("../models/Service"); // Assuming the services model is in a folder called 'models'

const router = express.Router();

// POST: Create a new services with slug
router.post("/services", async (req, res) => {
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
      fq,
    } = req.body;

    // Validate required fields

    // Find the last document and increment its `id`
    const lastservices = await Services.findOne().sort({ id: -1 });
    const newId = lastservices ? lastservices.id + 1 : 1;

    // Create a new services entry
    const newServices = new Services({
      id: newId, // Assign the new incremented `id`
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
      fq,
    });

    // Save the services entry to the database
    const savedServices = await newServices.save();
    return res.status(201).json(savedServices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating services." });
  }
});

// GET: Retrieve all servicess
router.get("/services", async (req, res) => {
  try {
    const services = await Services.find(); // Fetch all servicess from the database
    return res.status(200).json(services); // Send the servicess array as response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving servicess." });
  }
});

// GET: Retrieve a services entry by slug
router.get("/services/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const services = await Services.findOne({ slug });

    if (!services) {
      return res.status(404).json({ message: "services not found" });
    }

    return res.status(200).json(services);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving services." });
  }
});

// PUT: Update a services by slug
router.put("/services/:slug", async (req, res) => {
  try {
    const { slug } = req.params; // Old slug
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
      about2,
      pageH2,
      content,
      fq,
      newslug, // New slug to update
    } = req.body;

    // Find the services by old slug
    const services = await Services.findOne({ slug });
    if (!services) {
      return res.status(404).json({ message: "Services not found" });
    }

    // Update the slug if provided
    if (newslug) {
      const existingServicesWithNewSlug = await Services.findOne({
        slug: newslug,
      });
      if (existingServicesWithNewSlug) {
        return res.status(400).json({ message: "New slug is already in use." });
      }
      services.slug = newslug; // Update to the new slug
    }

    // Update other fields
    services.title = title || services.title;
    blog.meta_title = meta_title || blog.meta_title;
    blog.meta_description = meta_description || blog.meta_description;
    blog.schema = schema || blog.schema;
    blog.canonical = canonical || blog.canonical;
    blog.robust_meta = robust_meta || blog.robust_meta;
    blog.meta = meta || blog.meta;
    services.pageH1 = pageH1 || services.pageH1;
    services.about1 = about1 || services.about1;
    services.about2 = about2 || services.about2;
    services.pageH2 = pageH2 || services.pageH2;
    services.content = content || services.content;
    services.fq = fq || services.fq;

    // Save the updated services
    const updatedservices = await services.save();
    return res.status(200).json(updatedservices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating services." });
  }
});

// DELETE: Delete a services by slug
router.delete("/services/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the services by slug and delete it
    const deletedservices = await Services.findOneAndDelete({ slug });

    if (!deletedservices) {
      return res.status(404).json({ message: "services not found" });
    }

    return res.status(200).json({ message: "services deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting services." });
  }
});

module.exports = router;
