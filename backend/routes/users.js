const express = require('express');
const router = express.Router();
const { getMe, updateProfile, updateSettings, deleteAccount, getUserStats } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/me', protect, getMe);
router.put('/profile', protect, upload, updateProfile);
router.put('/settings', protect, updateSettings);
router.delete('/delete', protect, deleteAccount);
router.get('/stats', protect, getUserStats);

module.exports = router;