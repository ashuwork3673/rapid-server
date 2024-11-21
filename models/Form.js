const mongoose = require("mongoose");

// Create a schema and model for Form
const FormSchema = new mongoose.Schema({
  quote_id: { type: Number  },
  username: { type: String },
  email: { type: String },
  phone: { type: String },
  ship_form: { type: String },
  ship_to: { type: String },
  transport_method: { type: String },
  year: { type: String },
  make: { type: String },
  model: { type: String },
  vehicle_type: { type: String },
  distance: { type: String },
  added_on: { type: String },
  status: { type: String },
  sourceUrl: { type: String },
  ip: { type: String },
  note: { type: String },
  note_time: { type: String },
  price: { type: Number },
  pickup_id: { type: String },
  pickup_date: { type: Date },
  payment_url: { type: String },
  // New field for multiple cars
  cars: [
    {
      make: { type: String, required: true },
      transport_method: { type: String, required: true },
      model: { type: String, required: true },
      vehicle_type: { type: String, required: true },
      year: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Form", FormSchema);
