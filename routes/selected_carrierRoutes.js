const express = require("express");
const Carrier = require("../models/selected_carrier");
const router = express.Router();

// Create a new carrier
router.post("/", async (req, res) => {
  try {
    // Extract quote_id and check if carrier already exists with the same quote_id
    const {
      quote_id,
      carrier_name,
      carrier_company_phone,
      carrier_company_email,
      carrier_mc_num,
      driver_name,
      driver_phone,
      carrier_routes,
    } = req.body;

    // Check if a carrier with the same quote_id already exists
    const existingCarrier = await Carrier.findOne({ quote_id });

    if (existingCarrier) {
      // If a carrier with the same quote_id exists, return a conflict message
      return res
        .status(400)
        .json({ message: "A carrier with this quote_id already exists." });
    }

    // If no carrier with the same quote_id exists, create a new carrier
    const carrier = new Carrier({
      quote_id,
      carrier_name,
      carrier_company_phone,
      carrier_company_email,
      carrier_mc_num,
      driver_name,
      driver_phone,
      carrier_routes,
    });

    const savedCarrier = await carrier.save(); // MongoDB will auto-generate _id
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

// Update a carrier by ID
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

// Delete a carrier by ID
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
