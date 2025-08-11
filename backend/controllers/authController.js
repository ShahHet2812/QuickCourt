const User = require('../models/User');

// ... (signup and login functions remain the same)
// @desc    Register user
// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, userType } = req.body;
    
    let avatarPath = '';
    if (req.file) {
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

    sendTokenResponse(user, 201, res);
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

// Get token from model and send response with user data
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  
  // Create a user object without the password
  const userResponse = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone, // Add this line
    userType: user.userType,
    avatar: user.avatar,
    bio: user.bio,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    createdAt: user.createdAt
  };

  res.status(statusCode).json({ 
    success: true, 
    token,
    user: userResponse 
  });
};