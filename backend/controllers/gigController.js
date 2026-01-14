const Gig = require('../models/Gig');
const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Get all open gigs
// @route   GET /api/gigs
// @access  Public
const getGigs = async (req, res) => {
    try {
        const { search, category } = req.query;

        let query = { status: 'open' };

        // Add search filter if provided
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        if (category) {
            query.category = category;
        }

        const gigs = await Gig.find(query)
            .populate('owner', 'name email')
            .populate('bidCount')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: gigs.length,
            data: gigs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get single gig
// @route   GET /api/gigs/:id
// @access  Public
const getGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id)
            .populate('owner', 'name email')
            .populate('bidCount');

        if (!gig) {
            return res.status(404).json({
                success: false,
                message: 'Gig not found',
            });
        }

        res.status(200).json({
            success: true,
            data: gig,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Create new gig
// @route   POST /api/gigs
// @access  Private
const createGig = async (req, res) => {
    try {
        const { title, description, budget, category } = req.body;

        // Validation
        if (!title || !description || !budget || !category) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title, description, budget, and category',
            });
        }

        const gig = await Gig.create({
            title,
            description,
            budget,
            category,
            owner: req.user._id,
        });

        // Create notifications for all other users
        const users = await User.find({ _id: { $ne: req.user._id } });

        if (users.length > 0) {
            const notifications = users.map((user) => ({
                user: user._id,
                type: 'new_gig',
                message: `🆕 New gig posted: "${title}"`,
                gig: gig._id,
            }));

            await Notification.insertMany(notifications);
        }

        // Emit socket event to all users
        const io = req.app.get('io');
        if (io) {
            io.emit('new_gig', {
                message: `🆕 New gig posted: "${title}"`,
                gig: gig,
            });
        }

        res.status(201).json({
            success: true,
            data: gig,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get user's posted gigs
// @route   GET /api/gigs/my-gigs
// @access  Private
const getMyGigs = async (req, res) => {
    try {
        const gigs = await Gig.find({ owner: req.user._id })
            .populate('bidCount')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: gigs.length,
            data: gigs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete gig
// @route   DELETE /api/gigs/:id
// @access  Private
const deleteGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);

        if (!gig) {
            return res.status(404).json({
                success: false,
                message: 'Gig not found',
            });
        }

        // Check if user is owner
        if (gig.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this gig',
            });
        }

        await gig.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Gig deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getGigs,
    getGig,
    createGig,
    getMyGigs,
    deleteGig,
};
