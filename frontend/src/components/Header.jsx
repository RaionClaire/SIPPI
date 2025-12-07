import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  const navigate = useNavigate();

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
        
        <button
          onClick={() => navigate('/profil')}
          className="flex items-center gap-3 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
        >
          <FaUserCircle className="text-3xl" />
        </button>
      </div>
    </header>
  );
}