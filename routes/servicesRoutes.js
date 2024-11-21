// routes/services.js
const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Create a new service
router.post('/', async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific service by slug
router.get('/:slug', async (req, res) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug });
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ message: "Service not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a service by slug
router.put('/:slug', async (req, res) => {
    try {
        const service = await Service.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        );
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ message: "Service not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a service by slug
router.delete('/:slug', async (req, res) => {
    try {
        const service = await Service.findOneAndDelete({ slug: req.params.slug });
        if (service) {
            res.json({ message: "Service deleted successfully" });
        } else {
            res.status(404).json({ message: "Service not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
