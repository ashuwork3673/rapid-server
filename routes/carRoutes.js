const express = require("express");
const mongoose = require("mongoose");
const Car = require("../models/Cars"); // Assuming the car model is in a folder called 'models'

const router = express.Router();

// POST: Create a new car with slug
router.post("/cars", async (req, res) => {
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
      cars,
    } = req.body;

    // Validate required fields
    

    // Find the last document and increment its `id`
    const lastcar = await Car.findOne().sort({ id: -1 });
    const newId = lastcar ? lastcar.id + 1 : 1;

    // Create a new car entry
    const newCar = new Car({
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
      cars,
    });

    // Save the car entry to the database
    const savedCar = await newCar.save();
    return res.status(201).json(savedCar);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating car." });
  }
});

// GET: Retrieve all cars
router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find(); // Fetch all cars from the database
    return res.status(200).json(cars); // Send the cars array as response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving cars." });
  }
});

// GET: Retrieve a car entry by slug
router.get("/cars/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const car = await Car.findOne({ slug });

    if (!car) {
      return res.status(404).json({ message: "car not found" });
    }

    return res.status(200).json(car);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving car." });
  }
});

// PUT: Update a car by slug
router.put("/cars/:slug", async (req, res) => {
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
      cars,
      newslug, // New slug to update
    } = req.body;

    // Find the car by old slug
    const car = await Car.findOne({ slug });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Update the slug if provided
    if (newslug) {
      const existingCarWithNewSlug = await Car.findOne({ slug: newslug });
      if (existingCarWithNewSlug) {
        return res.status(400).json({ message: "New slug is already in use." });
      }
      car.slug = newslug; // Update to the new slug
    }

    // Update other fields
    car.title = title || car.title;
    car.meta_title = meta_title || car.meta_title;
    car.meta_description = meta_description || car.meta_description;
    car.schema = schema || car.schema;
    car.canonical = canonical || car.canonical;
    car.robust_meta = robust_meta || car.robust_meta;
    car.meta = meta || car.meta;
    car.pageH1 = pageH1 || car.pageH1;
    car.about1 = about1 || car.about1;
    car.about2 = about2 || car.about2;
    car.pageH2 = pageH2 || car.pageH2;
    car.content = content || car.content;
    car.cars = cars || car.cars;

    // Save the updated car
    const updatedCar = await car.save();
    return res.status(200).json(updatedCar);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating car." });
  }
});

// DELETE: Delete a car by slug
router.delete("/cars/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the car by slug and delete it
    const deletedcar = await Car.findOneAndDelete({ slug });

    if (!deletedcar) {
      return res.status(404).json({ message: "car not found" });
    }

    return res.status(200).json({ message: "car deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting car." });
  }
});

module.exports = router;
