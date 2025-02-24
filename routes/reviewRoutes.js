// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const Review = require("../models/review");

// Route to create a new review
router.post("/reviews", async (req, res) => {
  try {
    const { company_slug, name, rating, review } = req.body;
    const newReview = new Review({ company_slug, name, rating, review });
    await newReview.save();
    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
});

// Route to fetch all reviews
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error});
  }
});

// Route to fetch reviews by company_slug
router.get("/reviews/:company_slug", async (req, res) => {
  try {
    const reviews = await Review.find({
      company_slug: req.params.company_slug,
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

// Route to update a review
router.put("/reviews/:id", async (req, res) => {
  try {
    const { company_slug, name, rating, review } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { company_slug, name, rating, review },
      { new: true } // This option returns the updated document
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found"});
    }

    res
      .status(200)
      .json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
});

// Route to delete a review
router.delete("/reviews/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
});

module.exports = router;
