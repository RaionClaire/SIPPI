import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaFileAlt, FaArchive, FaSignOutAlt } from 'react-icons/fa';
import { HiOutlineUpload } from 'react-icons/hi';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Beranda' },
    { path: '/berkas-administrasi', icon: FaFileAlt, label: 'Berkas Administrasi' },
    { path: '/upload-berkas', icon: HiOutlineUpload, label: 'Upload Berkas' },
    { path: '/arsip', icon: FaArchive, label: 'Arsip' },
  ];

  return (
    <aside className="w-64 p-4 h-full">
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col h-full">
        <nav className="space-y-2">
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

        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </div>
    </aside>
  );
}