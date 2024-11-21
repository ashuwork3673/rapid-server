// models/Hero.js
const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  altText: { type: String, default: 'Hero Image' },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null }
});

module.exports = mongoose.model('Hero', heroSchema);
