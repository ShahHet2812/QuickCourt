const Booking = require('../models/Booking');
const Venue = require('../models/Venue');

// @desc    Create new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    // 1. User Type Restriction: Only customers can book
    if (req.user.userType !== 'customer') {
      return res.status(403).json({ success: false, error: 'Only customers are allowed to create bookings.' });
    }

    req.body.user = req.user.id;

    const { date, timeSlots } = req.body;

    // 2. Time Constraint: Prevent booking past slots
    const now = new Date();
    const bookingDateTime = new Date(date);
    const [startHour] = timeSlots[0].split(':').map(Number);
    bookingDateTime.setHours(startHour);

    if (bookingDateTime < now) {
      return res.status(400).json({ success: false, error: 'Cannot book a time slot that has already passed.' });
    }

    // 3. Concurrency Control: The unique index in the model will handle this automatically.
    // If two users try to book the same slot at the same time, the second attempt will fail
    // due to the unique index constraint, throwing a database error which we catch below.
    const booking = await Booking.create(req.body);
    res.status(201).json({ success: true, data: booking });

  } catch (error) {
    if (error.code === 11000) { // Handle duplicate key error for concurrent bookings
      return res.status(409).json({ success: false, error: 'This time slot has just been booked. Please select another.' });
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('venue');
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get booked slots for a specific court at a venue on a specific date
// @route   GET /api/bookings/booked-slots/:venueId/:court/:date
exports.getBookedSlots = async (req, res) => {
    try {
        const { venueId, court, date } = req.params;
        const bookings = await Booking.find({
            venue: venueId,
            court: court, // Add court to the query
            date: new Date(date),
            status: { $in: ['confirmed', 'pending'] }
        });

        const bookedTimeSlots = bookings.reduce((acc, booking) => {
            return acc.concat(booking.timeSlots);
        }, []);

        res.status(200).json({ success: true, data: bookedTimeSlots });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }

        // Make sure user is the booking owner
        if (booking.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not authorized to cancel this booking' });
        }

        await booking.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};