// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  city: String,
  email: String,
  password: String, // You can add authentication later
});

module.exports = mongoose.model('User', userSchema);
