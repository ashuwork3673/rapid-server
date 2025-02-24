// models/Review.js
const mongoose = require("mongoose");

// Define the schema for reviews
const reviewSchema = new mongoose.Schema(
  {
    company_slug: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

// Create a model based on the schema
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
