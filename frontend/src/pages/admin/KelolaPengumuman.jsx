import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineDocumentText, HiOutlineExclamation, HiOutlineCheck, HiOutlineArchive, HiPlus, HiOutlinePencil, HiOutlineCalendar, HiOutlineTrash, HiOutlineStar } from 'react-icons/hi';
import { useSnackbar } from 'notistack';
import StatCard from '../../components/StatCard';
import { announcementAPI } from '../../services/api';

export default function KelolaPengumuman() {
  const { enqueueSnackbar } = useSnackbar();
  const [stats, setStats] = useState({
    total: 0,
    penting: 0,
    aktif: 0,
    diarsipkan: 0
  });

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await announcementAPI.getAll();
      const data = response.data.data || [];
      setAnnouncements(data);
      
      // Calculate stats
      setStats({
        total: data.length,
        penting: data.filter(a => a.is_important).length,
        aktif: data.filter(a => !a.archived_at).length,
        diarsipkan: data.filter(a => a.archived_at).length
      });
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleArchive = async (id, isArchived) => {
    try {
      await announcementAPI.toggleArchive(id);
      enqueueSnackbar(
        isArchived ? 'Pengumuman berhasil dibatalkan dari arsip' : 'Pengumuman berhasil diarsipkan',
        { variant: 'success' }
      );
      fetchAnnouncements();
    } catch (error) {
      console.error('Error toggling archive:', error);
      enqueueSnackbar('Gagal mengubah status arsip', { variant: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
      return;
    }

    try {
      await announcementAPI.delete(id);
      enqueueSnackbar('Pengumuman berhasil dihapus', { variant: 'success' });
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement:', error);
      enqueueSnackbar('Gagal menghapus pengumuman', { variant: 'error' });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const mockAnnouncements = [
  ];

  const getStatusColor = (archivedAt) => {
    return !archivedAt
      ? 'bg-green-100 text-green-700' 
      : 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (archivedAt) => {
    return !archivedAt ? 'Aktif' : 'Arsip';
  };

  const filteredAnnouncements = announcements.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === '' || item.category?.name === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
          <option value="Beasiswa">Beasiswa</option>
          <option value="Lomba">Lomba</option>
          <option value="Informasi Sidang">Informasi Sidang</option>
          <option value="Administrasi">Administrasi</option>
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
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-500">Memuat data...</p>
        </div>
      ) : (
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
              {filteredAnnouncements.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {item.is_important && (
                        <HiOutlineStar className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      )}
                      <span className="text-gray-800">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-blue-600">{item.category?.name || '-'}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{formatDate(item.created_at)}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(item.archived_at)}`}>
                      {getStatusLabel(item.archived_at)}
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
                        onClick={() => handleToggleArchive(item.id, item.archived_at)}
                        className={`p-2 text-gray-500 rounded-lg transition-colors ${
                          item.archived_at 
                            ? 'hover:text-green-600 hover:bg-green-50' 
                            : 'hover:text-orange-600 hover:bg-orange-50'
                        }`}
                        title={item.archived_at ? 'Batalkan Arsip' : 'Arsipkan'}
                      >
                        <HiOutlineArchive className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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

          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada pengumuman yang ditemukan
            </div>
          )}
        </div>
      )}
    </div>
  );
}
