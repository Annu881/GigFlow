const express = require('express');
const router = express.Router();
const { submitBid, getGigBids, getMyBids, hireBid } = require('../controllers/bidController');
const { protect } = require('../middleware/auth');

// All bid routes are protected
router.post('/', protect, submitBid);
router.get('/gig/:gigId', protect, getGigBids);
router.get('/user/my-bids', protect, getMyBids);
router.patch('/:bidId/hire', protect, hireBid);

module.exports = router;
