const express = require("express");
const router = express.Router();
const Model = require("../models/model");

// Create a new model
router.post("/", async (req, res) => {
  try {
    const { id, make_id, model } = req.body;
    if (!id || !model || !make_id) {
      return res
        .status(400)
        .json({ error: "All fields are required (id, make_id, model)" });
    }

    const newModel = new Model({ id, make_id, model });
    await newModel.save();
    res.status(201).json(newModel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all models
// Get models filtered by make_id
router.get("/", async (req, res) => {
  try {
    const { make_id } = req.query; // Extract make_id from query parameters
    const models = make_id
      ? await Model.find({ make_id }) // Find models matching the make_id
      : await Model.find(); // If no make_id is provided, fetch all models
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a model by ID
router.get("/:id", async (req, res) => {
  try {
    const model = await Model.findOne({ id: req.params.id });
    if (!model) return res.status(404).json({ error: "Model not found" });

    res.json(model);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a model by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedModel = await Model.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedModel)
      return res.status(404).json({ error: "Model not found" });

    res.json(updatedModel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a model by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedModel = await Model.findOneAndDelete({ id: req.params.id });
    if (!deletedModel)
      return res.status(404).json({ error: "Model not found" });

    res.json({ message: "Model deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
