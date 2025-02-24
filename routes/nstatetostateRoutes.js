const express = require("express");
const router = express.Router();
const nstatetostate = require("../models/nstatetostate");

// Create a new state
// In your route file
router.post("/", async (req, res) => {
  try {
    // Generate a state_id using the current timestamp
    // Convert the timestamp to base-36
    const laststate = await nstatetostate.findOne().sort({ state_id: -1 });
    const stateId = laststate ? laststate.state_id + 1 : 1;

    // Create a new state with the generated state_id
    const state = new nstatetostate({
      ...req.body, // Spread the body fields (name, slug, etc.)
      state_id: stateId, // Add the generated state_id
    });

    await state.save();
    res.status(201).json(state);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all states
router.get("/", async (req, res) => {
  try {
    const states = await nstatetostate.find();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single state by slug
router.get("/:slug", async (req, res) => {
  try {
    const state = await nstatetostate.findOne({ slug: req.params.slug });
    if (!state) return res.status(404).json({ error: "State not found" });
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a state using slug
router.put("/:slug", async (req, res) => {
  try {
    const state = await nstatetostate.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!state) return res.status(404).json({ error: "State not found" });
    res.status(200).json(state);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a state using slug
router.delete("/:slug", async (req, res) => {
  try {
    const state = await nstatetostate.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!state) return res.status(404).json({ error: "State not found" });
    res.status(200).json({ message: "State deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
