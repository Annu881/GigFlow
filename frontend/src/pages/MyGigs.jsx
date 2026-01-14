import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyGigs, deleteGig } from '../redux/slices/gigsSlice';
import GigCard from '../components/gigs/GigCard';
import toast from 'react-hot-toast';

const MyGigs = () => {
    const dispatch = useDispatch();
    const { myGigs, loading } = useSelector((state) => state.gigs);

    useEffect(() => {
        dispatch(fetchMyGigs());
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this gig?')) {
            const result = await dispatch(deleteGig(id));
            if (deleteGig.fulfilled.match(result)) {
                toast.success('Gig deleted successfully');
            } else {
                toast.error(result.payload || 'Failed to delete gig');
            }
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8 text-gradient">My Posted Gigs</h1>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            ) : myGigs.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <p className="text-gray-400 text-lg mb-4">You haven't posted any gigs yet</p>
                    <a href="/create-gig" className="btn-gradient inline-block">
                        Post Your First Gig
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myGigs.map((gig) => (
                        <GigCard key={gig._id} gig={gig} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyGigs;
