const express = require("express");
const mongoose = require("mongoose");
const State = require("../models/State"); // Assuming the State model is in a folder called 'models'

const router = express.Router();

// POST: Create a new state with slug
router.post("/states", async (req, res) => {
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
      city_zipcode,
    } = req.body;

    // Find the last document and increment its `id`
    const lastState = await State.findOne().sort({ id: -1 });
    const newId = lastState ? lastState.id + 1 : 1;

    // Create a new state entry
    const newState = new State({
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
      city_zipcode,
    });

    // Save the state entry to the database
    const savedState = await newState.save();
    return res.status(201).json(savedState);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating state." });
  }
});

// GET: Retrieve all states
router.get("/states", async (req, res) => {
  try {
    const states = await State.find(); // Fetch all states from the database
    return res.status(200).json(states); // Send the states array as response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving states." });
  }
});

// GET: Retrieve a state entry by slug
router.get("/states/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const state = await State.findOne({ slug });

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    return res.status(200).json(state);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving state." });
  }
});

// PUT: Update a state by slug
router.put("/states/:slug", async (req, res) => {
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
      city_zipcode,
      newslug,
    } = req.body;

    // Find the state by slug
    const state = await State.findOne({ slug });

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    if (newslug) {
      const existingStateWithNewSlug = await State.findOne({ slug: newslug });
      if (existingStateWithNewSlug) {
        return res.status(400).json({ message: "New slug is already in use." });
      }
      state.slug = newslug; // Update to the new slug
    }

    // Update state fields
    state.title = title || state.title;
    state.meta_title = meta_title || state.meta_title;
    state.meta_description = meta_description || state.meta_description;
    state.schema = schema || state.schema;
    state.canonical = canonical || state.canonical;
    state.robust_meta = robust_meta || state.robust_meta;
    state.meta = meta || state.meta;
    state.pageH1 = pageH1 || state.pageH1;
    state.about1 = about1 || state.about1;
    state.pageH2 = pageH2 || state.pageH2;
    state.about2 = about2 || state.about2;
    state.content = content || state.content;
    state.city_zipcode = city_zipcode || state.city_zipcode;

    // Save the updated state
    const updatedState = await state.save();
    return res.status(200).json(updatedState);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating state." });
  }
});

// DELETE: Delete a state by slug
router.delete("/states/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the state by slug and delete it
    const deletedState = await State.findOneAndDelete({ slug });

    if (!deletedState) {
      return res.status(404).json({ message: "State not found" });
    }

    return res.status(200).json({ message: "State deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting state." });
  }
});

module.exports = router;
