const express = require("express");
const router = express.Router();
const Make = require("../models/make");

// Create a new make
router.post("/", async (req, res) => {
  try {
    const { id, make } = req.body;
    if (!id) return res.status(400).json({ error: "ID is required" });

    const newMake = new Make({ id, make });
    await newMake.save();
    res.status(201).json(newMake);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all makes
router.get("/", async (req, res) => {
  try {
    const makes = await Make.find();
    res.json(makes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single make by ID
router.get("/:id", async (req, res) => {
  try {
    const make = await Make.findOne({ id: req.params.id });
    if (!make) return res.status(404).json({ error: "Make not found" });

    res.json(make);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a make by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedMake = await Make.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedMake) return res.status(404).json({ error: "Make not found" });

    res.json(updatedMake);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a make by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedMake = await Make.findOneAndDelete({ id: req.params.id });
    if (!deletedMake) return res.status(404).json({ error: "Make not found" });

    res.json({ message: "Make deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
