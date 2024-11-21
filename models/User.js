const mongoose = require('mongoose');

// Create a schema and model for User
const UserSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
