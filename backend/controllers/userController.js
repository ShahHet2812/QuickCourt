const User = require('../models/User');
const Booking = require('../models/Booking');
const Venue = require('../models/Venue');

// ... (getMe and updateProfile functions remain the same)
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
};

exports.updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      bio: req.body.bio,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    };

    if (req.file) {
      fieldsToUpdate.avatar = `/uploads/avatars/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get user activity stats
// @route   GET /api/users/stats
exports.getUserStats = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('venue');

        const totalBookings = bookings.length;
        const hoursPlayed = bookings.reduce((acc, booking) => acc + booking.timeSlots.length, 0);

        const sportCounts = bookings.reduce((acc, booking) => {
            if (booking.venue && booking.venue.courts) {
                const court = booking.venue.courts.find(c => c.name === booking.court);
                if (court) {
                    acc[court.sport] = (acc[court.sport] || 0) + 1;
                }
            }
            return acc;
        }, {});

        const favoriteSport = Object.keys(sportCounts).reduce((a, b) => sportCounts[a] > sportCounts[b] ? a : b, 'N/A');

        res.status(200).json({
            success: true,
            data: {
                totalBookings,
                hoursPlayed,
                favoriteSport
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// ... (updateSettings and deleteAccount functions remain the same)
exports.updateSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    user.settings = req.body;
    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    await user.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};