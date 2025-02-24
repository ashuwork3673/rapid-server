// routes/carrierRoutes.js
const express = require("express");
const Carrier = require("../models/Carrier");
const router = express.Router();
// Create a new carrier
router.post("/", async (req, res) => {
  try {
    const carrier = new Carrier(req.body);
    const savedCarrier = await carrier.save();
    res.status(201).json(savedCarrier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Get all carriers
router.get("/", async (req, res) => {
  try {
    const carriers = await Carrier.find();
    res.status(200).json(carriers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get a carrier by ID
router.get("/:id", async (req, res) => {
  try {
    const carrier = await Carrier.findById(req.params.id);
    if (!carrier) return res.status(404).json({ message: "Carrier not found" });
    res.status(200).json(carrier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update a carrier by ID because of exclusive things inquartgae inbuilt  preprocessing
router.put("/:id", async (req, res) => {
  try {
    const carrier = await Carrier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!carrier) return res.status(404).json({ message: "Carrier not found" });
    res.status(200).json(carrier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Delete a carrier by ID informarly things invalid engaging
router.delete("/:id", async (req, res) => {
  try {
    const carrier = await Carrier.findByIdAndDelete(req.params.id);
    if (!carrier) return res.status(404).json({ message: "Carrier not found" });
    res.status(200).json({ message: "Carrier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
