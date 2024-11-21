const express = require('express');
const router = express.Router();
const State = require('../models/State');

// Get all states
router.get('/', async (req, res) => {
    try {
        const states = await State.find();
        res.json(states);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one state by ID
router.get('/:id', async (req, res) => {
    try {
        const state = await State.findOne({ id: req.params.id });
        if (state == null) {
            return res.status(404).json({ message: 'Cannot find state' });
        }
        res.json(state);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new state
router.post('/', async (req, res) => {
    const state = new State({
        id: req.body.id,
        title: req.body.title,
        slug: req.body.slug,
        meta: req.body.meta,
        pageH1: req.body.pageH1,
        about1: req.body.about1,
        pageH2: req.body.pageH2,
        about2: req.body.about2,
        content: req.body.content,
        city_zipcode: req.body.city_zipcode
    });

    try {
        const newState = await state.save();
        res.status(201).json(newState);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a state
router.put('/:id', async (req, res) => {
    try {
        const state = await State.findOne({ id: req.params.id });
        if (state == null) {
            return res.status(404).json({ message: 'Cannot find state' });
        }

        if (req.body.title != null) state.title = req.body.title;
        if (req.body.slug != null) state.slug = req.body.slug;
        if (req.body.meta != null) state.meta = req.body.meta;
        if (req.body.pageH1 != null) state.pageH1 = req.body.pageH1;
        if (req.body.about1 != null) state.about1 = req.body.about1;
        if (req.body.pageH2 != null) state.pageH2 = req.body.pageH2;
        if (req.body.about2 != null) state.about2 = req.body.about2;
        if (req.body.content != null) state.content = req.body.content;
        if (req.body.city_zipcode != null) state.city_zipcode = req.body.city_zipcode;

        const updatedState = await state.save();
        res.json(updatedState);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a state
router.delete('/:id', async (req, res) => {
    try {
        const state = await State.findOne({ id: req.params.id });
        if (state == null) {
            return res.status(404).json({ message: 'Cannot find state' });
        }

        await state.remove();
        res.json({ message: 'State deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
