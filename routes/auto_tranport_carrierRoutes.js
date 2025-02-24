const express = require("express");
const router = express.Router();
const auto_tranport_carrier = require("../models/auto_tranport_carrier");

// Create auto_tranport_carrier
router.post("/", async (req, res) => {
  const {
    company_name,
    stars,
    slug,
    meta_title,
    meta_description,
    schema,
    robust_meta,
    meta,
    canonical,
    addr1,
    addr2,
    phone,
    mc,
    us_dot,
    company_text,
    seo,
  } = req.body;

  try {
    // Ensure that slug is unique
    const existingSlug = await auto_tranport_carrier.findOne({ slug });
    if (existingSlug) {
      return res.status(400).json({ message: "Slug must be unique" });
    }

    const lastForm = await auto_tranport_carrier.findOne().sort({ id: -1 });

    // Generate the new quote_id by incrementing the last form's id
    const newQuoteId = lastForm ? lastForm.id + 1 : 1;
    const newCarrier = new auto_tranport_carrier({
      id: newQuoteId,
      company_name,
      stars,
      slug,
      meta_title,
      meta_description,
      schema,
      robust_meta,
      canonical,
      meta,
      addr1,
      addr2,
      phone,
      mc,
      us_dot,
      company_text,
      seo,
    });

    const savedCarrier = await newCarrier.save();
    res.status(201).json(savedCarrier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating carrier" });
  }
});

// Read all carriers
router.get("/", async (req, res) => {
  try {
    const carriers = await auto_tranport_carrier.find();
    res.json(carriers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching carriers" });
  }
});

// Read single auto_tranport_carrier by slug
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const carrier = await auto_tranport_carrier.findOne({ slug });
    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }
    res.json(carrier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching carrier" });
  }
});

// Update auto_tranport_carrier by slug
router.put("/:slug", async (req, res) => {
  const { slug } = req.params;
  const {
    company_name,
    stars,
    meta_title,
    meta_description,
    schema,
    robust_meta,
    canonical,
    meta,
    addr1,
    addr2,
    phone,
    mc,
    us_dot,
    company_text,
    seo,
  } = req.body;

  try {
    const updatedCarrier = await auto_tranport_carrier.findOneAndUpdate(
      { slug: slug },
      {
        company_name,
        stars,
        meta_title,
        meta_description,
        schema,
        robust_meta,
        canonical,
        meta,
        addr1,
        addr2,
        phone,
        mc,
        us_dot,
        company_text,
        seo,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedCarrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    res.json(updatedCarrier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating carrier" });
  }
});

// Delete auto_tranport_carrier by slug
router.delete("/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const deletedCarrier = await auto_tranport_carrier.findOneAndDelete({
      slug,
    });

    if (!deletedCarrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    res.json({ message: "Carrier deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting carrier" });
  }
});

module.exports = router;
