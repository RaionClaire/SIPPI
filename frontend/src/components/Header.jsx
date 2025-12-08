import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { notificationAPI } from '../services/api';

export default function Header() {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';

  useEffect(() => {
    fetchUnreadCount();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationAPI.getAll();
      setUnreadCount(response.data.unread_count || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <img src="/unila.png" alt="Unila Logo" className="w-12 h-12 rounded-lg object-cover" />
          <div>
            <h1 className="text-2xl font-bold">SIPPI</h1>
            <p className="text-sm text-blue-100">Sistem Informasi Pengumuman Prodi Informatika</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button
            onClick={() => navigate(isAdmin ? '/admin/notifikasi' : '/notifikasi')}
            className="relative p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <FaBell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {/* Profile with Name */}
          <button
            onClick={() => navigate(isAdmin ? '/admin/profil' : '/profil')}
            className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <FaUserCircle className="w-8 h-8" />
            <span className="font-medium">{user.name || 'User'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}