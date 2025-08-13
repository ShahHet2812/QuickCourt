const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  image: { type: String },
  sport: { type: String, required: true },
  amenities: [String],
  courts: { type: Number, default: 1 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'pending_update', 'pending_deletion'],
    default: 'pending'
  },
  // Field to store proposed changes for an update
  pendingUpdates: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Venue', VenueSchema);