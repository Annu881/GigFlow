const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema(
    {
        gig: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gig',
            required: true,
        },
        freelancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
            required: [true, 'Please provide a message'],
            trim: true,
        },
        proposedPrice: {
            type: Number,
            required: [true, 'Please provide a proposed price'],
            min: [0, 'Proposed price must be a positive number'],
        },
        status: {
            type: String,
            enum: ['pending', 'hired', 'rejected'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

// Compound indexes for efficient queries
bidSchema.index({ gig: 1, status: 1 });
bidSchema.index({ freelancer: 1 });
bidSchema.index({ createdAt: -1 });

// Prevent duplicate bids from same freelancer on same gig
bidSchema.index({ gig: 1, freelancer: 1 }, { unique: true });

module.exports = mongoose.model('Bid', bidSchema);
