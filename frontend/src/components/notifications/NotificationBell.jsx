import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markAsRead } from '../../redux/slices/notificationsSlice';
import { getSocket } from '../../utils/socket';
import { addNotification } from '../../redux/slices/notificationsSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notifications, unreadCount } = useSelector((state) => state.notifications);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(fetchNotifications());

            // Listen for real-time notifications
            const socket = getSocket();
            if (socket) {
                socket.on('hired', (data) => {
                    dispatch(addNotification(data.notification));
                    toast.success(data.notification.message, {
                        duration: 5000,
                        icon: '🎉',
                    });
                });

                socket.on('new_gig', (data) => {
                    // Only show notification if the current user is not the owner
                    if (user && data.gig.owner !== user._id) {
                        // We don't have the specific notification ID here since it was created for all users,
                        // but we can add a temporary one or just fetch notifications again.
                        // For simplicity, let's just fetch notifications to get the latest list with IDs.
                        dispatch(fetchNotifications());
                        toast.success(data.message, {
                            duration: 5000,
                            icon: '🆕',
                        });
                    }
                });
            }
        }
    }, [user, dispatch]);

    const handleNotificationClick = async (notification) => {
        if (!notification.read) {
            await dispatch(markAsRead(notification._id));
        }
        setIsOpen(false);
        if (notification.gig) {
            navigate(`/gigs/${notification.gig._id || notification.gig}`);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 glass-card max-h-96 overflow-y-auto animate-slide-down">
                    <div className="p-4 border-b border-white/10">
                        <h3 className="font-semibold">Notifications</h3>
                    </div>

                    {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-400">
                            No notifications yet
                        </div>
                    ) : (
                        <div>
                            {notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`p-4 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors ${!notification.read ? 'bg-primary-500/10' : ''
                                        }`}
                                >
                                    <p className="text-sm">{notification.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
