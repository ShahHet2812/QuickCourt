const Facility = require('../models/Facility');
const Booking = require('../models/Booking');

// @desc    Get owner dashboard data
// @route   GET /api/owner/dashboard
exports.getOwnerDashboard = async (req, res) => {
  try {
    const facilities = await Facility.find({ owner: req.user.id });
    const bookings = await Booking.find({ 'venue.owner': req.user.id });

    // Calculate KPIs
    const totalBookings = bookings.length;
    const activeCourts = facilities.reduce((acc, facility) => acc + facility.courts, 0);
    const monthlyEarnings = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

    res.status(200).json({
      success: true,
      data: {
        totalBookings,
        activeCourts,
        monthlyEarnings,
        facilities,
        upcomingBookings: bookings.filter(b => b.status === 'confirmed' || b.status === 'pending')
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};