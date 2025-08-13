const mongoose = require('mongoose');
const Venue = require('./Venue');

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  venue: {
    type: mongoose.Schema.ObjectId,
    ref: 'Venue',
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5'],
  },
  comment: {
    type: String,
    required: [true, 'Please add a comment for the review'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Enforce one review per user per venue
ReviewSchema.index({ venue: 1, user: 1 }, { unique: true });

// Static method to get avg rating and update venue
ReviewSchema.statics.getAverageRating = async function (venueId) {
  const obj = await this.aggregate([
    {
      $match: { venue: venueId },
    },
    {
      $group: {
        _id: '$venue',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  try {
    await Venue.findByIdAndUpdate(venueId, {
      rating: obj[0] ? obj[0].averageRating : 0,
      reviews: obj[0] ? obj[0].reviewCount : 0,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
ReviewSchema.post('save', async function () {
  await this.constructor.getAverageRating(this.venue);
});

// Call getAverageRating before remove
ReviewSchema.post('deleteOne', { document: true, query: false }, async function () {
  await this.constructor.getAverageRating(this.venue);
});

module.exports = mongoose.model('Review', ReviewSchema);