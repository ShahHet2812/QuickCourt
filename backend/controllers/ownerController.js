const Venue = require('../models/Venue');
const Booking = require('../models/Booking');

// @desc    Get owner dashboard data
// @route   GET /api/owner/dashboard
exports.getOwnerDashboard = async (req, res) => {
  try {
    const venues = await Venue.find({ owner: req.user.id });
    const venueIds = venues.map(v => v._id);

    // Normalize the venues data to handle both old and new schemas
    const normalizedVenues = venues.map(venue => {
        const venueObj = venue.toObject();
        if (!Array.isArray(venueObj.courts)) {
            // This is an old venue document, convert it to the new structure
            venueObj.courts = [{
                name: 'Main Court',
                sport: venueObj.sport || 'Unknown',
                price: venueObj.price || 0
            }];
        }
        return venueObj;
    });

    const bookings = await Booking.find({ venue: { $in: venueIds } }).populate('user', 'firstName lastName');
    
    const totalBookings = bookings.length;
    const activeCourts = normalizedVenues.reduce((acc, venue) => acc + (venue.courts.length || 0), 0);
    const monthlyEarnings = bookings
      .filter(b => b.status === 'confirmed' || b.status === 'completed')
      .reduce((acc, booking) => acc + booking.totalPrice, 0);
    const occupancyRate = 78; // Placeholder

    const upcomingBookings = bookings
        .filter(b => b.status === 'confirmed' || b.status === 'pending')
        .map(b => ({
            id: b._id,
            facility: normalizedVenues.find(v => v._id.equals(b.venue))?.name,
            court: b.court,
            customer: b.user ? `${b.user.firstName} ${b.user.lastName}` : 'N/A',
            date: new Date(b.date).toISOString().split('T')[0],
            time: b.timeSlots.join(' - '),
            price: b.totalPrice,
            status: b.status
        }));

    // Chart Data
    const bookingTrends = bookings.reduce((acc, booking) => {
        const date = new Date(booking.date).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const earningsSummary = bookings.reduce((acc, booking) => {
        const venueName = normalizedVenues.find(v => v._id.equals(booking.venue))?.name || 'Unknown';
        if (booking.status === 'confirmed' || booking.status === 'completed') {
            acc[venueName] = (acc[venueName] || 0) + booking.totalPrice;
        }
        return acc;
    }, {});

    const peakBookingHours = bookings.reduce((acc, booking) => {
        booking.timeSlots.forEach(slot => {
            const hour = parseInt(slot.split(':')[0], 10);
            acc[hour] = (acc[hour] || 0) + 1;
        });
        return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        kpiData: { totalBookings, activeCourts, monthlyEarnings, occupancyRate },
        facilities: normalizedVenues, // Send the normalized data
        upcomingBookings,
        charts: { bookingTrends, earningsSummary, peakBookingHours }
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
