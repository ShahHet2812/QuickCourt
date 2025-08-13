const Venue = require('../models/Venue');

// @desc    Get all venues
// @route   GET /api/venues
exports.getVenues = async (req, res) => {
  try {
    let venues = await Venue.find({ status: 'approved' });

    // Normalize venue data to ensure it has the new `courts` structure
    const normalizedVenues = venues.map(venue => {
      const venueObj = venue.toObject();
      if (!Array.isArray(venueObj.courts)) {
        venueObj.courts = [{
          name: 'Main Court',
          sport: venueObj.sport || 'Unknown',
          price: venueObj.price || 0
        }];
      }
      return venueObj;
    });

    res.status(200).json({ success: true, data: normalizedVenues });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get single venue
// @route   GET /api/venues/:id
exports.getVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ success: false, error: 'Venue not found' });
    }

    // Also normalize the single venue object
    const venueObj = venue.toObject();
    if (!Array.isArray(venueObj.courts)) {
      venueObj.courts = [{
        name: 'Main Court',
        sport: venueObj.sport || 'Unknown',
        price: venueObj.price || 0
      }];
    }

    res.status(200).json({ success: true, data: venueObj });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};