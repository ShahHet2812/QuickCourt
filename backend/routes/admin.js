const express = require('express');
const router = express.Router();
const { getAdminDashboard, approveFacility, banUser } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.get('/dashboard', protect, authorize('admin'), getAdminDashboard);
router.put('/facilities/:id/approve', protect, authorize('admin'), approveFacility);
router.put('/users/:id/ban', protect, authorize('admin'), banUser);

module.exports = router;