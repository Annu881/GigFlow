const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
            trim: true,
        },
        budget: {
            type: Number,
            required: [true, 'Please add a budget'],
        },
        category: {
            type: String,
            required: [true, 'Please select a category'],
            enum: [
                'Web Development',
                'Mobile App Development',
                'Software Development',
                'Game Development',
                'Graphic Design',
                'UI/UX Design',
                'Logo Design',
                'Digital Marketing',
                'SEO & SEM',
                'Content Writing',
                'Translation',
                'Video Editing',
                'Animation',
                'Music & Audio',
                'Voice Over',
                'Data Entry',
                'Virtual Assistant',
                'Business Consulting',
                'Legal Services',
                'Other'
            ],
        },
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['open', 'assigned'],
            default: 'open',
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtual field for bid count
gigSchema.virtual('bidCount', {
    ref: 'Bid',
    localField: '_id',
    foreignField: 'gig',
    count: true,
});

// Indexes for performance
gigSchema.index({ status: 1 });
gigSchema.index({ owner: 1 });
gigSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Gig', gigSchema);
