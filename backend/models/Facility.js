const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  courts: { type: Number, required: true },
  status: { type: String, enum: ['active', 'maintenance'], default: 'active' },
  monthlyRevenue: { type: Number, default: 0 },
  occupancyRate: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Facility', FacilitySchema);