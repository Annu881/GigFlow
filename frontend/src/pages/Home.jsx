import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGigs } from '../redux/slices/gigsSlice';
import GigCard from '../components/gigs/GigCard';
import { Link } from 'react-router-dom';

const Home = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();
    const { gigs, loading } = useSelector((state) => state.gigs);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fetchGigs({ search, category }));
        }, 300);

        return () => clearTimeout(timer);
    }, [search, category, dispatch]);

    return (
        <div>
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    Find Your Next <span className="text-gradient">Opportunity</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                    Connect with clients and freelancers worldwide
                </p>
                {!isAuthenticated && (
                    <Link to="/register" className="btn-gradient text-lg px-8 py-3 inline-block">
                        Get Started Today
                    </Link>
                )}
            </div>

            {/* Search and Filter */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <input
                    type="text"
                    placeholder="Search gigs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-field flex-1"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input-field w-full md:w-48 bg-slate-800 text-white"
                >
                    <option value="">All Categories</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Game Development">Game Development</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Logo Design">Logo Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="SEO & SEM">SEO & SEM</option>
                    <option value="Content Writing">Content Writing</option>
                    <option value="Translation">Translation</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Animation">Animation</option>
                    <option value="Music & Audio">Music & Audio</option>
                    <option value="Voice Over">Voice Over</option>
                    <option value="Data Entry">Data Entry</option>
                    <option value="Virtual Assistant">Virtual Assistant</option>
                    <option value="Business Consulting">Business Consulting</option>
                    <option value="Legal Services">Legal Services</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {(search || category) && (
                <p className="text-center text-gray-400 mt-2">
                    Found {gigs.length} gig{gigs.length !== 1 ? 's' : ''}
                </p>
            )}

            {/* Gigs Grid */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            ) : gigs.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No gigs found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gigs.map((gig) => (
                        <GigCard key={gig._id} gig={gig} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
