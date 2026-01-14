import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGigById } from '../redux/slices/gigsSlice';
import { submitBid, fetchGigBids, hireBid } from '../redux/slices/bidsSlice';
import toast from 'react-hot-toast';

const GigDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentGig, loading: gigLoading } = useSelector((state) => state.gigs);
    const { bids, loading: bidLoading } = useSelector((state) => state.bids);
    const { user } = useSelector((state) => state.auth);

    const [bidForm, setBidForm] = useState({
        message: '',
        proposedPrice: '',
    });

    const [showHireConfirm, setShowHireConfirm] = useState(null);

    useEffect(() => {
        dispatch(fetchGigById(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (currentGig && user && currentGig.owner._id === user._id) {
            dispatch(fetchGigBids(id));
        }
    }, [currentGig, user, id, dispatch]);

    const handleBidSubmit = async (e) => {
        e.preventDefault();

        const result = await dispatch(submitBid({
            gigId: id,
            message: bidForm.message,
            proposedPrice: Number(bidForm.proposedPrice),
        }));

        if (submitBid.fulfilled.match(result)) {
            toast.success('Bid submitted successfully!');
            setBidForm({ message: '', proposedPrice: '' });
        } else {
            toast.error(result.payload || 'Failed to submit bid');
        }
    };

    const handleHire = async (bidId) => {
        const result = await dispatch(hireBid(bidId));

        if (hireBid.fulfilled.match(result)) {
            toast.success('Freelancer hired successfully!');
            setShowHireConfirm(null);
            dispatch(fetchGigById(id));
            dispatch(fetchGigBids(id));
        } else {
            toast.error(result.payload || 'Failed to hire freelancer');
        }
    };

    if (gigLoading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!currentGig) {
        return <div className="text-center py-12">Gig not found</div>;
    }

    const isOwner = user && currentGig.owner._id === user._id;
    const canBid = user && !isOwner && currentGig.status === 'open';

    return (
        <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 mb-6">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-3xl font-bold">{currentGig.title}</h1>
                    <span className={`badge ${currentGig.status === 'open' ? 'badge-open' : 'badge-assigned'}`}>
                        {currentGig.status}
                    </span>
                </div>

                <p className="text-gray-300 mb-6">{currentGig.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-sm text-gray-400">Budget</p>
                        <p className="text-3xl font-bold text-gradient">${currentGig.budget}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Bids</p>
                        <p className="text-2xl font-semibold text-primary-400">{currentGig.bidCount || 0}</p>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                    <p className="text-sm text-gray-400">
                        Posted by <span className="text-white font-semibold">{currentGig.owner.name}</span>
                    </p>
                </div>
            </div>

            {/* Bid Form */}
            {canBid && (
                <div className="glass-card p-8 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Submit Your Bid</h2>
                    <form onSubmit={handleBidSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <textarea
                                value={bidForm.message}
                                onChange={(e) => setBidForm({ ...bidForm, message: e.target.value })}
                                className="input-field min-h-24"
                                placeholder="Explain why you're the best fit..."
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Proposed Price ($)</label>
                            <input
                                type="number"
                                value={bidForm.proposedPrice}
                                onChange={(e) => setBidForm({ ...bidForm, proposedPrice: e.target.value })}
                                className="input-field"
                                placeholder="Your price"
                                min="0"
                                required
                            />
                        </div>
                        <button type="submit" disabled={bidLoading} className="btn-gradient w-full">
                            {bidLoading ? 'Submitting...' : 'Submit Bid'}
                        </button>
                    </form>
                </div>
            )}

            {/* Bids List (Owner Only) */}
            {isOwner && (
                <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold mb-4">Bids ({bids.length})</h2>
                    {bids.length === 0 ? (
                        <p className="text-gray-400">No bids yet</p>
                    ) : (
                        <div className="space-y-4">
                            {bids.map((bid) => (
                                <div key={bid._id} className="bg-white/5 p-4 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-semibold">{bid.freelancer.name}</p>
                                            <p className="text-sm text-gray-400">{bid.freelancer.email}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-gradient">${bid.proposedPrice}</p>
                                            <span className={`badge badge-${bid.status}`}>{bid.status}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 mb-3">{bid.message}</p>
                                    {bid.status === 'pending' && currentGig.status === 'open' && (
                                        <>
                                            <button
                                                onClick={() => setShowHireConfirm(bid._id)}
                                                className="btn-gradient"
                                            >
                                                Hire
                                            </button>
                                            {showHireConfirm === bid._id && (
                                                <div className="mt-3 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                                                    <p className="text-sm mb-2">Are you sure you want to hire this freelancer?</p>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleHire(bid._id)}
                                                            className="btn-gradient text-sm"
                                                        >
                                                            Confirm
                                                        </button>
                                                        <button
                                                            onClick={() => setShowHireConfirm(null)}
                                                            className="px-4 py-2 bg-white/10 rounded-lg text-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GigDetails;
