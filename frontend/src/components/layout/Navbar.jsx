import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import NotificationBell from '../notifications/NotificationBell';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="glass-card sticky top-0 z-50 mb-8">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-gradient">
                        GigFlow
                    </Link>

                    <div className="flex items-center gap-6">
                        {isAuthenticated ? (
                            <>
                                <Link to="/" className="hover:text-primary-400 transition-colors">
                                    Browse
                                </Link>
                                <Link to="/my-gigs" className="hover:text-primary-400 transition-colors">
                                    My Gigs
                                </Link>
                                <Link to="/my-bids" className="hover:text-primary-400 transition-colors">
                                    My Bids
                                </Link>
                                <Link to="/create-gig" className="hover:text-primary-400 transition-colors">
                                    Post Gig
                                </Link>
                                <NotificationBell />
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm hover:text-primary-400 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-primary-400 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-gradient">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
