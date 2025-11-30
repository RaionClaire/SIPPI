import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaFileAlt, FaBell, FaArchive, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Beranda' },
    { path: '/berkas-administrasi', icon: FaFileAlt, label: 'Berkas Administrasi' },
    { path: '/notifikasi', icon: FaBell, label: 'Notifikasi', badge: 2 },
    { path: '/arsip', icon: FaArchive, label: 'Arsip' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6">
        {/* Logo placeholder */}
        <div className="w-12 h-12 bg-blue-600 rounded-lg mb-4"></div>
        <h2 className="text-xl font-bold text-gray-800">SIPPI</h2>
        <p className="text-xs text-gray-600 mt-1">Sistem Informasi Pengumuman Prodi Informatika</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="text-xl" />
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
        >
          <FaSignOutAlt className="text-xl" />
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </aside>
  );
}