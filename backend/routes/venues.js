const express = require('express');
const router = express.Router();
const { getVenues, getVenue } = require('../controllers/venueController');

// Import the review router
const reviewsRouter = require('./reviews');

router.use('/:venueId/reviews', reviewsRouter);

router.get('/', getVenues);
router.get('/:id', getVenue);

module.exports = router;