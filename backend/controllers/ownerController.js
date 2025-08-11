const Venue = require('../models/Venue');
const Booking = require('../models/Booking');

// @desc    Get owner dashboard data
// @route   GET /api/owner/dashboard
exports.getOwnerDashboard = async (req, res) => {
  try {
    const venues = await Venue.find({ owner: req.user.id });
    const venueIds = venues.map(v => v._id);
    const bookings = await Booking.find({ venue: { $in: venueIds } }).populate('user', 'firstName lastName');
    
    const totalBookings = bookings.length;
    const activeCourts = venues.reduce((acc, venue) => acc + (venue.courts || 1), 0);
    const monthlyEarnings = bookings
      .filter(b => b.status === 'confirmed' || b.status === 'completed')
      .reduce((acc, booking) => acc + booking.totalPrice, 0);
    const occupancyRate = 78; // Placeholder

    const upcomingBookings = bookings
        .filter(b => b.status === 'confirmed' || b.status === 'pending')
        .map(b => ({
            id: b._id,
            facility: venues.find(v => v._id.equals(b.venue))?.name,
            court: b.court,
            customer: b.user ? `${b.user.firstName} ${b.user.lastName}` : 'N/A',
            date: new Date(b.date).toISOString().split('T')[0],
            time: b.timeSlots.join(' - '),
            price: b.totalPrice,
            status: b.status
        }));

    res.status(200).json({
      success: true,
      data: {
        kpiData: { totalBookings, activeCourts, monthlyEarnings, occupancyRate },
        facilities: venues,
        upcomingBookings
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Create a new venue/facility for review
// @route   POST /api/owner/venues
exports.createVenue = async (req, res) => {
  try {
    req.body.owner = req.user.id;
    const venue = await Venue.create(req.body);
    res.status(201).json({ success: true, data: venue });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Request an update for a venue
// @route   PUT /api/owner/venues/:id
exports.requestUpdateVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ success: false, error: 'Venue not found' });
    }
    if (venue.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'User not authorized to update this venue' });
    }
    venue.pendingUpdates = req.body;
    venue.status = 'pending_update';
    await venue.save();
    res.status(200).json({ success: true, data: venue });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Request to delete a venue
// @route   DELETE /api/owner/venues/:id
exports.requestDeleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ success: false, error: 'Venue not found' });
    }
    if (venue.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'User not authorized to delete this venue' });
    }
    venue.status = 'pending_deletion';
    await venue.save();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
