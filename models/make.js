// models/Hero.js
const mongoose = require("mongoose");

const makeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  make: { type: String },
});

module.exports = mongoose.model("Make", makeSchema);
