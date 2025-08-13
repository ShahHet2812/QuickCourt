const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  venue: { type: mongoose.Schema.ObjectId, ref: 'Venue', required: true },
  court: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  timeSlots: [String],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  playerName: { type: String, required: true },
  playerEmail: { type: String, required: true },
  playerPhone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Add a compound index for unique bookings
BookingSchema.index({ venue: 1, court: 1, date: 1, timeSlots: 1 }, { unique: true });

module.exports = mongoose.model('Booking', BookingSchema);