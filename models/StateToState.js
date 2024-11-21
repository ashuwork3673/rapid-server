// models/StateToState.js
const mongoose = require('mongoose');

const StateToStateSchema = new mongoose.Schema({
  state_id: {
    type: Number,
    required: true,
    unique: true
  },
  state_form: {
    type: String,
    required: true
  },
  state_to: {
    type: String,
    required: true
  },
  state_table: {
    type: String,
    default: null
  },
  slug: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  meta: {
    type: String,
    default: null
  },
  state_form_img: {
    type: String,
    default: null
  },
  state_form_img_alt: {
    type: String,
    default: null
  },
  state_to_img: {
    type: String,
    default: null
  },
  state_to_img_alt: {
    type: String,
    default: null
  },
  third_img: {
    type: String,
    default: null
  },
  third_img_alt: {
    type: String,
    default: null
  },
  fourth_img: {
    type: String,
    default: null
  },
  fourth_img_alt: {
    type: String,
    default: null
  },
  page_h1: {
    type: String,
    default: null
  },
  page_h2: {
    type: String,
    default: null
  },
  page_about_1: {
    type: String,
    default: null
  },
  page_about_2: {
    type: String,
    default: null
  },
  content: {
    type: String,
    default: null
  },
  route_star: {
    type: Number,
    default: null
  },
  route_distance: {
    type: String,
    default: null
  },
  route_timing: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('StateToState', StateToStateSchema);
