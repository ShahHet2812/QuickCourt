const Venue = require('../models/Venue');

// @desc    Get all venues
// @route   GET /api/venues
exports.getVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ status: 'approved' });
    res.status(200).json({ success: true, data: venues });
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
    res.status(200).json({ success: true, data: venue });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};