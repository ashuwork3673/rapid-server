// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    meta: { type: String },
    pageH1: { type: String, required: true },
    about1: { type: String },
    pageH2: { type: String },
    about2: { type: String },
    content: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
