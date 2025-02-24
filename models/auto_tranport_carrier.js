const mongoose = require("mongoose");

// Define the schema for the Blog model
const auto_transport_carrierSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: false,
  },
  company_name: {
    type: String,
    required: false,
  },
  stars: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: false,
    unique: true, // Ensure slug is unique
  },
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
  addr1: {
    type: String,
  },
  addr2: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  mc: {
    type: String,
    required: false,
  },
  us_dot: {
    type: String,
  },
  company_text: {
    type: String,
  },
  seo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update updatedAt before saving
auto_transport_carrierSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

// Create and export the model
const auto_transport_carrier = mongoose.model(
  "auto_transport_carrier",
  auto_transport_carrierSchema
);

module.exports = auto_transport_carrier;
