const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
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
    type: String,
  },
  pageH1: { type: String, required: false },
  about1: { type: String, required: false },
  pageH2: { type: String, required: false },
  about2: { type: String, required: false },
  content: { type: String, required: false },
  cars: [
    {
      index: { type: Number, unique: true },
      car: { type: String },
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

module.exports = mongoose.model("Car", carSchema);
