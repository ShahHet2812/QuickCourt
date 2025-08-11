const User = require('../models/User');
const Venue = require('../models/Venue');
const Booking = require('../models/Booking');

// @desc    Get admin dashboard data
// @route   GET /api/admin/dashboard
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const facilityOwners = await User.countDocuments({ userType: 'owner' });
    const totalBookings = await Booking.countDocuments();
    const pendingFacilities = await Venue.find({ status: 'pending' });
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        facilityOwners,
        totalBookings,
        pendingFacilities,
        users
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Approve a facility
// @route   PUT /api/admin/facilities/:id/approve
exports.approveFacility = async (req, res) => {
  try {
    await Venue.findByIdAndUpdate(req.params.id, { status: 'approved' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Ban a user
// @route   PUT /api/admin/users/:id/ban
exports.banUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: 'banned' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};