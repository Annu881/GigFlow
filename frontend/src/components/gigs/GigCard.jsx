import { Link } from 'react-router-dom';

const GigCard = ({ gig, onDelete }) => {
    return (
        <div className="relative group">
            <Link to={`/gigs/${gig._id}`}>
                <div className="glass-card p-6 hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-gray-300 mb-2 inline-block">
                                {gig.category || 'General'}
                            </span>
                            <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-1">
                                {gig.title}
                            </h3>
                        </div>
                        <span className={`badge ${gig.status === 'open' ? 'badge-open' : 'badge-assigned'}`}>
                            {gig.status}
                        </span>
                    </div>

                    <p className="text-gray-300 mb-4 line-clamp-3">
                        {gig.description}
                    </p>

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-400">Budget</p>
                            <p className="text-2xl font-bold text-gradient">
                                ${gig.budget}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-gray-400">Bids</p>
                            <p className="text-xl font-semibold text-primary-400">
                                {gig.bidCount || 0}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-sm text-gray-400">
                            Posted by <span className="text-white">{gig.owner?.name}</span>
                        </p>
                    </div>
                </div>
            </Link>

            {onDelete && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete(gig._id);
                    }}
                    className="absolute top-4 right-4 p-2 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                    title="Delete Gig"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default GigCard;
