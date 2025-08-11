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

    const pendingFacilities = await Venue.find({ 
      status: { $in: ['pending', 'pending_update', 'pending_deletion'] } 
    }).populate('owner', 'firstName lastName');
    
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      data: {
        adminKpis: { totalUsers, facilityOwners, totalBookings },
        pendingFacilities: pendingFacilities.map(f => ({
            id: f._id,
            name: f.name,
            owner: f.owner ? `${f.owner.firstName} ${f.owner.lastName}` : 'N/A',
            sport: f.sport,
            location: f.location,
            courts: f.courts,
            submittedDate: f.createdAt.toISOString().split('T')[0],
            status: f.status,
            pendingUpdates: f.pendingUpdates
        })),
        users
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Approve a new facility
// @route   PUT /api/admin/facilities/:id/approve
exports.approveFacility = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!venue) return res.status(404).json({ success: false, error: 'Facility not found' });
    res.status(200).json({ success: true, data: venue });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Reject a new facility or pending change
// @route   DELETE /api/admin/facilities/:id/reject
exports.rejectFacility = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);
        if (!venue) return res.status(404).json({ success: false, error: 'Facility not found' });

        if (venue.status === 'pending_update' || venue.status === 'pending_deletion') {
            venue.status = 'approved';
            venue.pendingUpdates = undefined;
            await venue.save();
        } else {
            await venue.deleteOne();
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

// @desc    Approve a venue's update request
// @route   PUT /api/admin/venues/:id/approve-update
exports.approveVenueUpdate = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue || !venue.pendingUpdates) {
      return res.status(404).json({ success: false, error: 'Venue or pending update not found' });
    }
    Object.assign(venue, venue.pendingUpdates);
    venue.pendingUpdates = undefined;
    venue.status = 'approved';
    await venue.save();
    res.status(200).json({ success: true, data: venue });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Approve a venue's deletion request
// @route   DELETE /api/admin/venues/:id/approve-delete
exports.approveVenueDelete = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndDelete(req.params.id);
        if (!venue) return res.status(404).json({ success: false, error: 'Venue not found' });
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Ban/Unban a user
// @route   PUT /api/admin/users/:id/toggle-ban
exports.toggleUserBan = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    // Add this check: prevent banning admin users
    if (user.userType === 'admin') {
      return res.status(403).json({ success: false, error: 'Admin accounts cannot be banned.' });
    }

    user.status = user.status === 'active' ? 'banned' : 'active';
    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};