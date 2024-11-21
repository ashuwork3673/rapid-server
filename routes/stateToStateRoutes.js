// routes/stateToStateRoutes.js
const express = require('express');
const router = express.Router();
const StateToState = require('../models/StateToState');

// Create a new StateToState document
router.post('/', async (req, res) => {
  try {
    const newStateToState = new StateToState(req.body);
    await newStateToState.save();
    res.status(201).json(newStateToState);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all StateToState documents
router.get('/', async (req, res) => {
  try {
    const states = await StateToState.find();
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific StateToState document by ID
router.get('/:id', async (req, res) => {
  try {
    const state = await StateToState.findById(req.params.id);
    if (!state) return res.status(404).json({ error: 'State not found' });
    res.json(state);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific StateToState document by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedState = await StateToState.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedState) return res.status(404).json({ error: 'State not found' });
    res.json(updatedState);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a specific StateToState document by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedState = await StateToState.findByIdAndDelete(req.params.id);
    if (!deletedState) return res.status(404).json({ error: 'State not found' });
    res.json({ message: 'State deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
