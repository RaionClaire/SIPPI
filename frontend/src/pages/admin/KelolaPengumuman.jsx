import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineDocumentText, HiOutlineExclamation, HiOutlineCheck, HiOutlineArchive, HiPlus, HiOutlinePencil, HiOutlineCalendar, HiOutlineTrash, HiOutlineStar } from 'react-icons/hi';
import StatCard from '../../components/StatCard';

export default function KelolaPengumuman() {
  const [stats, setStats] = useState({
    total: 24,
    penting: 12,
    aktif: 20,
    diarsipkan: 4
  });

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const announcements = [
    {
      id: 1,
      title: 'Jadwal Ujian Akhir Semester Genap 2024/2025',
      category: 'Akademik',
      date: '17/11/2025',
      status: 'Aktif',
      isImportant: true
    },
    {
      id: 2,
      title: 'Pengumuman Libur Semester',
      category: 'Akademik',
      date: '12/11/2025',
      status: 'Aktif',
      isImportant: true
    },
    {
      id: 3,
      title: 'Pelatihan Sertifikasi IT untuk Mahasiswa',
      category: 'Kegiatan',
      date: '04/11/2025',
      status: 'Arsip',
      isImportant: false
    },
    {
      id: 4,
      title: 'Workshop Pengenalan Flutter',
      category: 'Kegiatan',
      date: '01/11/2025',
      status: 'Arsip',
      isImportant: false
    }
  ];

  const getStatusColor = (status) => {
    return status === 'Aktif' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Pengumuman</h1>
          <p className="text-gray-500">Buat, edit, dan kelola semua pengumuman</p>
        </div>
        <Link
          to="/admin/pengumuman/buat"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors"
        >
          <HiPlus className="w-5 h-5" />
          <span>Buat Pengumuman</span>
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari Pengumuman..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Semua Kategori</option>
          <option value="Akademik">Akademik</option>
          <option value="Kegiatan">Kegiatan</option>
          <option value="Beasiswa">Beasiswa</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Pengumuman"
          value={stats.total}
          color="#3B82F6"
        />
        <StatCard
          label="Penting"
          value={stats.penting}
          color="#fb2424ff"
        />
        <StatCard
          label="Aktif"
          value={stats.aktif}
          color="#4ADE80"
        />
        <StatCard
          label="Diarsipkan"
          value={stats.diarsipkan}
          color="#A78BFA"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">JUDUL</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">KATEGORI</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">TANGGAL</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">STATUS</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {item.isImportant && (
                      <HiOutlineStar className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    )}
                    <span className="text-gray-800">{item.title}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-blue-600">{item.category}</span>
                </td>
                <td className="py-4 px-4 text-gray-600">{item.date}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/pengumuman/${item.id}/edit`}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <HiOutlinePencil className="w-5 h-5" />
                    </Link>
                    <button
                      className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      title="Arsipkan"
                    >
                      <HiOutlineCalendar className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
