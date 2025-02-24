// models/Hero.js
const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  make_id: { type: Number },
  model: { type: String, required: true },
});

module.exports = mongoose.model("Model", modelSchema);
