const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  quote_id: String,
  email: String,
  pickup_date: Date,
  username: String,
  // Include other fields as needed
});

module.exports = mongoose.model('follow_up_mail', formSchema);
