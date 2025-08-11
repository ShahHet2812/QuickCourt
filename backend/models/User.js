const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  // ... existing fields (firstName, lastName, email, etc.)
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, select: false },
  userType: { type: String, enum: ['customer', 'owner', 'admin'], default: 'customer' },
  avatar: { type: String },
  isVerified: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'banned'], default: 'active' },
  bio: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  
  // Add this settings object
  settings: {
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    bookingReminders: { type: Boolean, default: true },
    promotionalEmails: { type: Boolean, default: false },
    twoFactorAuth: { type: Boolean, default: false },
    profileVisibility: { type: String, enum: ['public', 'private', 'friends'], default: 'public' },
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'America/New_York' },
  },

  createdAt: { type: Date, default: Date.now }
});

// ... (rest of the file remains the same)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);