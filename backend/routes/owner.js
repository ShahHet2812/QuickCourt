const express = require('express');
const router = express.Router();
const { getOwnerDashboard, createVenue, requestUpdateVenue, requestDeleteVenue } = require('../controllers/ownerController');
const { protect, authorize } = require('../middleware/auth');

router.get('/dashboard', protect, authorize('owner'), getOwnerDashboard);
router.post('/venues', protect, authorize('owner'), createVenue);
router.put('/venues/:id', protect, authorize('owner'), requestUpdateVenue);
router.delete('/venues/:id', protect, authorize('owner'), requestDeleteVenue);

module.exports = router;