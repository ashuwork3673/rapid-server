const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  meta_title: {
    type: String,
  },
  meta_description: {
    type: String,
  },
  schema: {
    type: String,
  },
  robust_meta: {
    type: String,
  },
  canonical: {
    type: String,
  },
  meta: {
    type: String, // Store the meta tags as a string or as an array of strings
    required: false,
  },
  pageH1: { type: String, required: false },
  about1: { type: String, required: false },
  pageH2: { type: String, required: false },
  about2: { type: String, required: false },
  content: { type: String, required: false },
  city_zipcode: [
    {
      index: { type: Number, unique: true },
      city: { type: String },
      zipcode: { type: String }, // Changed from 'city_zipcode' to 'zipcode'
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("State", stateSchema);
