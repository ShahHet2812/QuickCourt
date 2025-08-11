const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

    // Create verification token
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Send email
    try {
        await sendEmail({
            email: user.email,
            subject: 'Email Verification',
            message: `Your verification code is ${verificationCode}`
        });

        res.status(201).json({ success: true, data: 'Verification email sent' });
    } catch (error) {
        console.error(error);
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save();
        return res.status(500).json({ success: false, error: 'Email could not be sent' });
    }

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Verify email
// @route   POST /api/auth/verifyemail
exports.verifyEmail = async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ success: false, error: 'Please provide email and code' });
    }

    const user = await User.findOne({ 
        email, 
        verificationCode: code,
        verificationCodeExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ success: false, error: 'Invalid code' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
};

// @desc    Resend verification email
// @route   POST /api/auth/resendverification
exports.resendVerificationEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, error: 'Please provide an email' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (user.isVerified) {
        return res.status(400).json({ success: false, error: 'User is already verified' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    try {
        await sendEmail({
            email: user.email,
            subject: 'Email Verification',
            message: `Your new verification code is ${verificationCode}`
        });

        res.status(200).json({ success: true, data: 'Verification email sent' });
    } catch (error) {
        console.error(error);
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save();
        return res.status(500).json({ success: false, error: 'Email could not be sent' });
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

    // Add this check: if user is an admin, bypass the banned status check
    if (user.userType !== 'admin' && user.status === 'banned') {
      return res.status(403).json({ success: false, error: 'Your account has been banned. Please contact support.' });
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