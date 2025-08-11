const express = require('express');
const router = express.Router();
const { signup, login, verifyEmail, resendVerificationEmail } = require('../controllers/authController');
const upload = require('../middleware/upload');

router.post('/signup', upload, signup);
router.post('/login', login);
router.post('/verifyemail', verifyEmail);
router.post('/resendverification', resendVerificationEmail);

module.exports = router;