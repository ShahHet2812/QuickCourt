const Review = require('../models/Review');
const Venue = require('../models/Venue');

// @desc    Get all reviews for a specific venue
// @route   GET /api/venues/:venueId/reviews
exports.getVenueReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ venue: req.params.venueId }).populate({
      path: 'user',
      select: 'firstName lastName avatar',
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Add a review
// @route   POST /api/venues/:venueId/reviews
exports.addReview = async (req, res) => {
  try {
    req.body.venue = req.params.venueId;
    req.body.user = req.user.id; // From protected route middleware

    // Check if user has already reviewed this venue
    const existingReview = await Review.findOne({
      user: req.user.id,
      venue: req.params.venueId,
    });

    if (existingReview) {
      return res.status(400).json({ success: false, error: 'You have already reviewed this venue.' });
    }

    const review = await Review.create(req.body);

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
exports.updateReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }

    // Ensure user is the review owner
    if (review.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ success: false, error: 'Not authorized to update this review' });
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Recalculate average rating after update
    await review.constructor.getAverageRating(review.venue);

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }

    // Ensure user is the review owner
    if (review.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ success: false, error: 'Not authorized to delete this review' });
    }
    
    // Store venueId before deletion for rating calculation
    const venueId = review.venue;

    await review.deleteOne();
    
    // Recalculate average rating after deletion
    await Review.getAverageRating(venueId);

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};