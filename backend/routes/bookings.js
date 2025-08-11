const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getBookedSlots, cancelBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/mybookings', protect, getMyBookings);
router.get('/booked-slots/:venueId/:court/:date', getBookedSlots);
router.delete('/:id', protect, cancelBooking);

module.exports = router;