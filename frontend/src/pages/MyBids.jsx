import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyBids } from '../redux/slices/bidsSlice';
import { Link } from 'react-router-dom';

const MyBids = () => {
    const dispatch = useDispatch();
    const { myBids, loading } = useSelector((state) => state.bids);

    useEffect(() => {
        dispatch(fetchMyBids());
    }, [dispatch]);

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8 text-gradient">My Bids</h1>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            ) : myBids.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <p className="text-gray-400 text-lg mb-4">You haven't submitted any bids yet</p>
                    <Link to="/" className="btn-gradient inline-block">
                        Browse Gigs
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {myBids.map((bid) => (
                        <div key={bid._id} className="glass-card p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <Link to={`/gigs/${bid.gig._id}`} className="text-xl font-semibold hover:text-primary-400 transition-colors">
                                        {bid.gig.title}
                                    </Link>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Budget: ${bid.gig.budget}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gradient">${bid.proposedPrice}</p>
                                    <span className={`badge badge-${bid.status}`}>{bid.status}</span>
                                </div>
                            </div>
                            <p className="text-gray-300">{bid.message}</p>
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <p className="text-sm text-gray-400">
                                    Submitted {new Date(bid.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBids;
