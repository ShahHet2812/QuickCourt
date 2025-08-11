const express = require('express');
const router = express.Router();
const { getMe, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/me', protect, getMe);
router.put('/profile', protect, upload, updateProfile);

module.exports = router;