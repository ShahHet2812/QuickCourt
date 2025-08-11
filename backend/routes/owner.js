const express = require('express');
const router = express.Router();
const { getOwnerDashboard } = require('../controllers/ownerController');
const { protect, authorize } = require('../middleware/auth');

router.get('/dashboard', protect, authorize('owner'), getOwnerDashboard);

module.exports = router;