const mongoose = require("mongoose");

// Define a schema for the card model
const cardSchema = new mongoose.Schema({
  quote_id: { type: Number },
  billing_address: { type: String, required: true },
  billing_city: { type: String, required: true },
  billing_state: { type: String, required: true },
  billing_zip: { type: String, required: true },
  card_name: { type: String, required: true },
  card_number: { type: String, required: true },
  card_expiry: { type: String, required: true },
  card_cvv: { type: String, required: true },
});

// Create and export the model
module.exports = mongoose.model("Card", cardSchema);
