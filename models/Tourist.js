const mongoose = require('mongoose');

const touristSchema = new mongoose.Schema({
  email: { type: String/* , required: true */ },
  phone: { type: String/* , required: true  */},
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

module.exports = mongoose.model('Tourist', touristSchema);

/* const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 5 },
  cuisine: { type: String },
  priceRange: { type: String, enum: ['$', '$$', '$$$', '$$$$'] }
});

module.exports = mongoose.model('Restaurant', restaurantSchema); */