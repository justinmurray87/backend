// models/Template.js
const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  theme: { type: String, required: true },
  content: { type: String, required: true }  // Template with placeholders like {description}
});

module.exports = mongoose.model('Template', templateSchema);
