const express = require("express");
const mongoose = require("mongoose");
const City_to_city = require("../models/city_to_city"); // Assuming the city_to_city model is in a folder called 'models'

const router = express.Router();

// POST: Create a new city_to_city with slug
router.post("/city_to_city", async (req, res) => {
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

    // Find the last document and increment its `id`
    const lastcity_to_city = await City_to_city.findOne().sort({ id: -1 });
    const newId = lastcity_to_city ? lastcity_to_city.id + 1 : 1;

    // Create a new city_to_city entry
    const newCity_to_city = new City_to_city({
      id: newId, // Assign the new incremented `id` instances cover and new id seted
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

    // Save the city_to_city entry to the database
    const savedCity_to_city = await newCity_to_city.save();
    return res.status(201).json(savedCity_to_city);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating city_to_city." });
  }
});

// GET: Retrieve all city_to_citys some things acoordingly
router.get("/city_to_city", async (req, res) => {
  try {
    const city_to_city = await City_to_city.find(); // Fetch all city_to_citys from the database
    return res.status(200).json(city_to_city); // Send the city_to_citys array as response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving city_to_city." });
  }
});

// GET: Retrieve a city_to_city entry by slug
router.get("/city_to_city/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const city_to_city = await City_to_city.findOne({ slug });

    if (!city_to_city) {
      return res.status(404).json({ message: "city_to_city not found" });
    }

    return res.status(200).json(city_to_city);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving city_to_city." });
  }
});

// PUT: Update a city_to_city by slug
router.put("/city_to_city/:slug", async (req, res) => {
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
      newslug, // New slug to update
    } = req.body;

    // Find the city_to_city by old slug
    const city_to_city = await City_to_city.findOne({ slug });
    if (!city_to_city) {
      return res.status(404).json({ message: "City to city not found" });
    }

    // Update the slug if provided
    if (newslug) {
      const existingCity_to_cityWithNewSlug = await City_to_city.findOne({
        slug: newslug,
      });
      if (existingCity_to_cityWithNewSlug) {
        return res.status(400).json({ message: "New slug is already in use." });
      }
      city_to_city.slug = newslug; // Update to the new slug
    }

    // Update other fields
    city_to_city.title = title || city_to_city.title;
    city_to_city.meta_title = meta_title || city_to_city.meta_title;
    city_to_city.meta_description =
      meta_description || city_to_city.meta_description;
    city_to_city.schema = schema || city_to_city.schema;
    city_to_city.canonical = canonical || city_to_city.canonical;
    city_to_city.robust_meta = robust_meta || city_to_city.robust_meta;
    city_to_city.meta = meta || city_to_city.meta;
    city_to_city.pageH1 = pageH1 || city_to_city.pageH1;
    city_to_city.about1 = about1 || city_to_city.about1;
    city_to_city.about2 = about2 || city_to_city.about2;
    city_to_city.pageH2 = pageH2 || city_to_city.pageH2;
    city_to_city.content = content || city_to_city.content;

    // Save the updated city_to_city
    const updatedcity_to_city = await city_to_city.save();
    return res.status(200).json(updatedcity_to_city);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating city_to_city." });
  }
});

// DELETE: Delete a city_to_city by slug
router.delete("/city_to_city/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the city_to_city by slug and delete it
    const deletedcity_to_city = await City_to_city.findOneAndDelete({ slug });

    if (!deletedcity_to_city) {
      return res.status(404).json({ message: "city_to_city not found" });
    }

    return res
      .status(200)
      .json({ message: "city_to_city deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting city_to_city." });
  }
});

module.exports = router;
