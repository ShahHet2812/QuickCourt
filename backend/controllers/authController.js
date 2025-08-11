const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, userType } = req.body;
    
    let avatarPath = '';
    if (req.file) {
      // Create a server-accessible path for the avatar
      avatarPath = `/uploads/avatars/${req.file.filename}`;
    }

    const user = await User.create({ 
      firstName, 
      lastName, 
      email, 
      phone, 
      password, 
      userType,
      avatar: avatarPath 
    });

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ success: true, token });
};