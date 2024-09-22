// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userID: { type: String, required: true }, // user phone
  modelID: { type: String, required: true }, 
  theme: { type: String, required: true }, // fk to template table
  description: { type: String, required: true }, // original notes
  picture: String, // need to decide how to store images
  status: { type: String, enum: ['draft', 'generated', 'published'], default: 'draft' }, 
  prompt: String, // submitted text
  llmResponse: String, // generated text
  review: String, // final review
});

module.exports = mongoose.model('Message', messageSchema);
