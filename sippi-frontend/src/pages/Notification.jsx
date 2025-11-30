import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBullhorn, FaCheck } from 'react-icons/fa';
import { mockNotifications } from '../utils/mockData';

export default function Notification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulasi fetch data - nanti ganti dengan API call
    // notificationAPI.getAll().then(...)
    setNotifications(mockNotifications);
  }, []);

  const handleMarkAllAsRead = () => {
    // Simulasi mark all as read - nanti ganti dengan API call
    // notificationAPI.markAllAsRead().then(...)
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notif) => {
    // Mark as read
    setNotifications(notifications.map(n => 
      n.id === notif.id ? { ...n, isRead: true } : n
    ));

    // Navigate jika perlu
    if (notif.type === 'announcement') {
      navigate('/');
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifikasi</h1>
          <p className="text-gray-600">
            Anda memiliki {unreadCount} notifikasi yang belum dibaca
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <FaCheck />
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      {/* Unread Notifications */}
      {unreadNotifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Belum Dibaca</h2>
          <div className="space-y-3">
            {unreadNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className="bg-blue-50 border border-blue-200 rounded-lg p-5 cursor-pointer hover:border-blue-400 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600 text-white rounded-lg">
                    <FaBullhorn className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {notif.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-2">
                      {notif.description}
                    </p>
                    <span className="text-xs text-gray-500">{notif.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Read Notifications */}
      {readNotifications.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sudah Dibaca</h2>
          <div className="space-y-3">
            {readNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className="bg-white border border-gray-200 rounded-lg p-5 cursor-pointer hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 text-gray-600 rounded-lg">
                    <FaBullhorn className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {notif.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {notif.description}
                    </p>
                    <span className="text-xs text-gray-500">{notif.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {notifications.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <FaBullhorn className="text-5xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Tidak ada notifikasi</p>
        </div>
      )}
    </div>
  );
}