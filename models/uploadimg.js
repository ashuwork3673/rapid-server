const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  quote_id: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  img: [{type:String}], // Array of image paths
});

const Img = mongoose.model("Img", imgSchema); // Updated to "Img"

module.exports = Img;
