const express = require('express');
const router = express.Router();
const { signup, login, verifyEmail, resendVerificationEmail, forgotPassword, resetPassword } = require('../controllers/authController');
const upload = require('../middleware/upload');

// Correctly apply the multer middleware for a single file upload
router.post('/signup', upload.single('avatar'), signup);

router.post('/login', login);
router.post('/verifyemail', verifyEmail);
router.post('/resendverification', resendVerificationEmail);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);

module.exports = router;