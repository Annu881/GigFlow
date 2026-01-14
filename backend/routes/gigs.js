const express = require('express');
const router = express.Router();
const { getGigs, getGig, createGig, getMyGigs, deleteGig } = require('../controllers/gigController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getGigs);
router.get('/:id', getGig);

// Protected routes
router.post('/', protect, createGig);
router.get('/user/my-gigs', protect, getMyGigs);
router.delete('/:id', protect, deleteGig);

module.exports = router;
