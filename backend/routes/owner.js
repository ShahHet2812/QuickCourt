const express = require('express');
const router = express.Router();
const { getOwnerDashboard, createVenue, requestUpdateVenue, requestDeleteVenue } = require('../controllers/ownerController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/dashboard', protect, authorize('owner'), getOwnerDashboard);
router.post('/venues', protect, authorize('owner'), upload.single('image'), createVenue);
router.put('/venues/:id', protect, authorize('owner'), requestUpdateVenue);
router.delete('/venues/:id', protect, authorize('owner'), requestDeleteVenue);

module.exports = router;