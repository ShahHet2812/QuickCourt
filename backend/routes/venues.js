const express = require('express');
const router = express.Router();
const { getVenues, getVenue } = require('../controllers/venueController');

router.get('/', getVenues);
router.get('/:id', getVenue);

module.exports = router;