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
    <div className="min-h-screen bg-gray-100">
      {/* Use shared Header component */}
      <Header />

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
