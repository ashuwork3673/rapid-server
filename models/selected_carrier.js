const mongoose = require('mongoose');

const SelectedCarrier = new mongoose.Schema(
  {
    quote_id: { type: Number, unique: true, required: true }, // Enforce unique constraint on quote_id
    carrier_name: { type: String, required: true },
    carrier_company_phone: [{ type: String, required: true }], // Array of phone numbers
    carrier_company_email: { type: String, required: true },
    carrier_mc_num: { type: String, required: true },
    driver_name: { type: String, required: true },
    driver_phone: [{ type: String, required: true }], // Array of phone numbers
    carrier_routes: [
      {
        route_name: { type: String, required: true },
        states_covered: [{ type: String, required: true }],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('selected_carrier', SelectedCarrier);
