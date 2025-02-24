const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const Route = require("../models/routes.model");

// Create a new route
router.post(
  "/",
  upload.fields([
    { name: "state_form_img", maxCount: 1 },
    { name: "state_to_img", maxCount: 1 },
    { name: "third_img", maxCount: 1 },
    { name: "fourth_img", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const files = req.files;

      console.log("Uploaded files:", files); // Log the uploaded files for debugging

      // Collect image paths and alt texts
      const routeData = {
        ...req.body,
        state_form_img: files?.state_form_img
          ? files.state_form_img[0].path
          : null,
        state_form_img_alt: req.body.state_form_img_alt || "",
        state_to_img: files?.state_to_img ? files.state_to_img[0].path : null,
        state_to_img_alt: req.body.state_to_img_alt || "",
        third_img: files?.third_img ? files.third_img[0].path : null,
        third_img_alt: req.body.third_img_alt || "",
        fourth_img: files?.fourth_img ? files.fourth_img[0].path : null,
        fourth_img_alt: req.body.fourth_img_alt || "",
      };

      const newRoute = new Route(routeData);
      const savedRoute = await newRoute.save();
      res.status(201).json(savedRoute);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: error.message });
    }
  }
);

// Get all routes
router.get("/", async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
});

// Get a specific route by slug
router.get("/:slug", async (req, res) => {
  try {
    const route = await Route.findOne({ slug: req.params.slug });
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json(route);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
});

// Update a route by slug
router.put(
  "/:slug",
  upload.fields([
    { name: "state_form_img", maxCount: 1 },
    { name: "third_img", maxCount: 1 },
    { name: "fourth_img", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const files = req.files;

      console.log("Updated files:", files); // Log the updated files for debugging

      // Extract the new slug from the request body
      const newSlug = req.body.newslug || req.params.slug; // Default to the existing slug if no newslug is provided

      // Prepare updated fields
      const updateData = {
        ...req.body,
        state_form_img: files?.state_form_img
          ? files.state_form_img[0].path
          : req.body.state_form_img,
        state_to_img: files?.state_to_img
          ? files.state_to_img[0].path
          : req.body.state_to_img,
        third_img: files?.third_img
          ? files.third_img[0].path
          : req.body.third_img,
        fourth_img: files?.fourth_img
          ? files.fourth_img[0].path
          : req.body.fourth_img,
        slug: newSlug, // Update the slug
      };

      const updatedRoute = await Route.findOneAndUpdate(
        { slug: req.params.slug },
        updateData,
        { new: true }
      );
      if (!updatedRoute)
        return res.status(404).json({ message: "Route not found" });
      res.json(updatedRoute);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: error.message });
    }
  }
);

// Delete a route by slug
router.delete("/:slug", async (req, res) => {
  try {
    const deletedRoute = await Route.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!deletedRoute)
      return res.status(404).json({ message: "Route not found" });
    res.json({ message: "Route deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
