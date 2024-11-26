const mongoose = require('mongoose');

// User Schema Definition
const UserSchema = new mongoose.Schema({
  unique_id: {
    type: String,
    default: () => `user-${Math.floor(Math.random() * 1000000)}`, // Automatically generate a unique ID
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'manager'], // Example roles
    default: 'user',
  },
  status: {
    type: Boolean,
    default: true, // true = active, false = inactive
  },
  department: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    default: () => '0.0.0.0', // Default IP if not provided
  },
  last_login: {
    type: Date,
    default: Date.now, // Store current date as the default value
  },
});

// Model
module.exports = mongoose.model('User', UserSchema);
