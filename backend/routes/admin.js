const express = require('express');
const router = express.Router();
const { 
    getAdminDashboard, 
    approveFacility, 
    rejectFacility, 
    toggleUserBan,
    approveVenueUpdate,
    // Note: rejectVenueUpdate was consolidated into rejectFacility
    approveVenueDelete
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.get('/dashboard', protect, authorize('admin'), getAdminDashboard);

// Facility creation
router.put('/facilities/:id/approve', protect, authorize('admin'), approveFacility);
router.delete('/facilities/:id/reject', protect, authorize('admin'), rejectFacility);

// Facility updates and deletions
router.put('/venues/:id/approve-update', protect, authorize('admin'), approveVenueUpdate);
router.delete('/venues/:id/approve-delete', protect, authorize('admin'), approveVenueDelete);

// User management
router.put('/users/:id/toggle-ban', protect, authorize('admin'), toggleUserBan);

module.exports = router;