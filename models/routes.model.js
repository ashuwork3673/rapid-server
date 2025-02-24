const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema(
  {
    state_id: { type: String, required: true },
    state_form: { type: String, required: true },
    state_to: { type: String, required: true },
    state_table: { type: String, required: true },
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
    state_form_img: { type: String, required: false },
    state_form_img_alt: { type: String, required: false },
    state_to_img: { type: String, required: false },
    state_to_img_alt: { type: String, required: false },
    third_img: { type: String, required: false },
    third_img_alt: { type: String, required: false },
    fourth_img: { type: String, required: false },
    fourth_img_alt: { type: String, required: false },
    page_h1: { type: String, required: false },
    page_h2: { type: String, required: false },
    page_about_1: { type: String, required: false },
    page_about_2: { type: String, required: false },
    content: { type: String, required: false },
    route_star: { type: Number, required: false },
    route_distance: { type: String, required: false },
    route_timing: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Route", RouteSchema);
