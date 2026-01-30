const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  listingType: { type: String, default: 'rent' }, // rent or sell
  propertyType: { type: String, required: true }, // room, pg, flat, house
  price: { type: Number, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true }, // Locality/Area
  address: String,
  images: [String],
  amenities: [String],
  bedrooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
  area: Number, // sqft
  availableFrom: String,
  ownerName: String,
  ownerPhone: String,
  ownerEmail: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
