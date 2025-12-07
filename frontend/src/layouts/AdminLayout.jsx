import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaBell, FaUser } from 'react-icons/fa';
import { HiOutlineViewGrid, HiOutlineSpeakerphone, HiOutlineDocumentText, HiOutlineUsers, HiOutlineLogout } from 'react-icons/hi';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [notificationCount] = useState(2);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', icon: HiOutlineViewGrid, label: 'Dashboard', exact: true },
    { path: '/admin/pengumuman', icon: HiOutlineSpeakerphone, label: 'Kelola Pengumuman' },
    { path: '/admin/berkas', icon: HiOutlineDocumentText, label: 'Kelola Berkas' },
    { path: '/admin/pengguna', icon: HiOutlineUsers, label: 'Manajemen Pengguna' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" onError={(e) => e.target.style.display = 'none'} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SIPPI</h1>
              <p className="text-sm text-blue-200">Sistem Informasi Pengumuman Prodi Informatika</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
              <FaBell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <FaUser className="text-blue-600" />
              </div>
              <span className="font-medium">{user.name || 'Admin SIPPI'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-[calc(100vh-80px)] p-4 sticky top-0 flex-shrink-0">
          <nav className="bg-white rounded-2xl shadow-lg p-4 space-y-2 h-full flex flex-col">
            <div className="flex-1 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all w-full mt-auto"
            >
              <HiOutlineLogout className="w-5 h-5" />
              <span className="font-medium">Keluar</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
