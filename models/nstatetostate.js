const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema(
  {
    state_id: { type: Number, required: true, unique: true },
    state_form: { type: String, required: true },
    state_to: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
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
    h1: { type: String },
    h2: { type: String },
    h1_about: { type: String },
    h2_about: { type: String },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("nstatetostate", StateSchema);
