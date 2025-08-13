const express = require('express');
const {
  addReview,
  updateReview,
  deleteReview,
  getVenueReviews, // Added the import for the new function
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Added this new route to fetch reviews for a specific venue
router.get('/', getVenueReviews);
router.post('/', protect, addReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;