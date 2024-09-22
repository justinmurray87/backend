// models/Place.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  lastReviewedDate: {
    type: Date,
    required: true
  },
  averageRating: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  vibe: {
    type: String,
    required: true
  },
  bestFeature: {
    type: String,
    required: true // Assuming 'bestDish' from restaurants is equivalent to 'bestFeature' for places
  },
  type: {
    type: String,
    required: true // New field to specify the type of place (e.g., 'restaurant', 'cafe', 'park', etc.)
  }
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;
