// models/Carrier.js
const mongoose = require("mongoose");

const CarrierSchema = new mongoose.Schema(
  {
    carrier_name: { type: String, required: true },
    carrier_company_phone: [{ type: String, required: true }],  // Changed to array of strings 
    carrier_company_email: { type: String, required: true },
    carrier_mc_num: { type: String, required: true },
    driver_name: { type: String, required: true },
    driver_phone: [{ type: String, required: true }], // Changed to array of strings
    carrier_routes: [
      {
        route_name: { type: String, required: true },
        states_covered: [{ type: String, required: true }],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carrier", CarrierSchema);
