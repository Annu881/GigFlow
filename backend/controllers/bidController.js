const mongoose = require('mongoose');
const Bid = require('../models/Bid');
const Gig = require('../models/Gig');
const Notification = require('../models/Notification');

// @desc    Submit a bid
// @route   POST /api/bids
// @access  Private
const submitBid = async (req, res) => {
    try {
        const { gigId, message, proposedPrice } = req.body;

        // Validation
        if (!gigId || !message || !proposedPrice) {
            return res.status(400).json({
                success: false,
                message: 'Please provide gigId, message, and proposedPrice',
            });
        }

        // Check if gig exists
        const gig = await Gig.findById(gigId);

        if (!gig) {
            return res.status(404).json({
                success: false,
                message: 'Gig not found',
            });
        }

        // Check if user is not the owner
        if (gig.owner.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot bid on your own gig',
            });
        }

        // Check if gig is still open
        if (gig.status !== 'open') {
            return res.status(400).json({
                success: false,
                message: 'This gig is no longer accepting bids',
            });
        }

        // Create bid
        const bid = await Bid.create({
            gig: gigId,
            freelancer: req.user._id,
            message,
            proposedPrice,
        });

        const populatedBid = await Bid.findById(bid._id)
            .populate('freelancer', 'name email')
            .populate('gig', 'title budget');

        res.status(201).json({
            success: true,
            data: populatedBid,
        });
    } catch (error) {
        // Handle duplicate bid error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'You have already submitted a bid for this gig',
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get all bids for a gig
// @route   GET /api/bids/gig/:gigId
// @access  Private (owner only)
const getGigBids = async (req, res) => {
    try {
        const { gigId } = req.params;

        // Check if gig exists
        const gig = await Gig.findById(gigId);

        if (!gig) {
            return res.status(404).json({
                success: false,
                message: 'Gig not found',
            });
        }

        // Check if user is the owner
        if (gig.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view bids for this gig',
            });
        }

        const bids = await Bid.find({ gig: gigId })
            .populate('freelancer', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bids.length,
            data: bids,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get user's submitted bids
// @route   GET /api/bids/my-bids
// @access  Private
const getMyBids = async (req, res) => {
    try {
        const bids = await Bid.find({ freelancer: req.user._id })
            .populate('gig', 'title budget status')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bids.length,
            data: bids,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Hire a freelancer (with MongoDB transaction)
// @route   PATCH /api/bids/:bidId/hire
// @access  Private (owner only)
const hireBid = async (req, res) => {
    try {
        const { bidId } = req.params;

        // Find bid and populate gig
        const bid = await Bid.findById(bidId)
            .populate('gig')
            .populate('freelancer', 'name email');

        if (!bid) {
            return res.status(404).json({
                success: false,
                message: 'Bid not found',
            });
        }

        // Check if user is the gig owner
        if (bid.gig.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to hire for this gig',
            });
        }

        // Check if gig is already assigned
        if (bid.gig.status === 'assigned') {
            return res.status(400).json({
                success: false,
                message: 'This gig has already been assigned',
            });
        }

        // 1. Update bid to hired
        bid.status = 'hired';
        await bid.save();

        // 2. Update gig to assigned
        bid.gig.status = 'assigned';
        await bid.gig.save();

        // 3. Reject all other bids
        await Bid.updateMany(
            { gig: bid.gig._id, _id: { $ne: bidId } },
            { status: 'rejected' }
        );

        // 4. Create notification
        const notification = await Notification.create({
            user: bid.freelancer._id,
            type: 'hired',
            message: `🎉 You've been hired for "${bid.gig.title}"!`,
            gig: bid.gig._id,
        });

        // 5. Emit Socket.io event
        const io = req.app.get('io');
        if (io) {
            io.to(bid.freelancer._id.toString()).emit('hired', {
                gigTitle: bid.gig.title,
                notification: notification,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Freelancer hired successfully',
            data: bid,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    submitBid,
    getGigBids,
    getMyBids,
    hireBid,
};
