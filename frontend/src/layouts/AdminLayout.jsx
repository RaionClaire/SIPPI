import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineViewGrid, HiOutlineSpeakerphone, HiOutlineDocumentText, HiOutlineUsers, HiOutlineLogout } from 'react-icons/hi';
import Header from '../components/Header';

export default function AdminLayout() {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-[#F8F9FE]"> {/* Updated background to match pastel theme */}
      {/* Use shared Header component */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-[calc(100vh-80px)] p-4 sticky top-0 flex-shrink-0">
          {/* Card Container - Updated to match Mahasiswa style */}
          <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col h-full">
            
            {/* Menu Items */}
            <nav className="space-y-2 flex-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600' // Pastel Active State
                        : 'text-gray-700 hover:bg-gray-50' // Pastel Hover State
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Logout Section - Updated with border divider */}
            <div className="mt-auto pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <HiOutlineLogout className="w-5 h-5" />
                <span className="font-medium">Keluar</span>
              </button>
            </div>

          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}