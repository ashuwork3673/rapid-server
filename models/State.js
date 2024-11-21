const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    meta: { type: String, required: false },
    pageH1: { type: String, required: false },
    about1: { type: String, required: false },
    pageH2: { type: String, required: false },
    about2: { type: String, required: false },
    content: { type: String, required: false },
    city_zipcode: { type: String, required: false }
});

module.exports = mongoose.model('State', stateSchema);
