import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineDocumentText, HiOutlineClock, HiOutlineCheckCircle, HiOutlineFilter, HiOutlineSearch, HiOutlineExclamation } from 'react-icons/hi';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import { dashboardAPI, announcementAPI } from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPengumuman: 0,
    berkasPending: 0,
    berkasDisetujui: 0
  });
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [importantAnnouncements, setImportantAnnouncements] = useState([]);
  const [allAnnouncements, setAllAnnouncements] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats
      const statsResponse = await dashboardAPI.getStats();
      setStats(statsResponse.data.data);

      // Fetch announcements
      const announcementsResponse = await announcementAPI.getAll();
      const announcements = announcementsResponse.data.data || [];
      
      // Separate important and regular announcements
      setImportantAnnouncements(announcements.filter(a => a.is_important));
      setAllAnnouncements(announcements.filter(a => !a.is_important));
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (categoryName) => {
    const colors = {
        'Akademik': 'bg-red-500',
        'Beasiswa': 'bg-green-500',
        'Lomba': 'bg-yellow-500',
        'Informasi Sidang': 'bg-purple-500',
        'Administrasi': 'bg-indigo-500'
    };
    return colors[categoryName] || 'bg-gray-500';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
            <HiOutlineDocumentText className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Pengumuman</p>
            <p className="text-3xl font-bold text-gray-800">{stats.totalPengumuman}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center gap-4">
          <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
            <HiOutlineClock className="w-7 h-7 text-orange-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Berkas Pending</p>
            <p className="text-3xl font-bold text-gray-800">{stats.berkasPending}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center gap-4">
          <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
            <HiOutlineCheckCircle className="w-7 h-7 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Berkas Disetujui</p>
            <p className="text-3xl font-bold text-gray-800">{stats.berkasDisetujui}</p>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex gap-4">
        <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition-all">
          <HiOutlineFilter className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700">Filter Kategori</span>
        </button>

        <div className="flex-1 relative">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari Pengumuman"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2 bg-white rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Important Announcements */}
      {importantAnnouncements.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-red-500 rounded-full"></div>
            <h2 className="text-lg font-semibold">Pengumuman Penting</h2>
          </div>

          {importantAnnouncements.map((announcement) => (
            <Link
              key={announcement.id}
              to={`/admin/pengumuman/${announcement.id}`}
              className="block bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-all mb-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`${getCategoryColor(announcement.category?.name)} text-white text-xs px-3 py-1 rounded-full`}>
                  {announcement.category?.name || 'Umum'}
                </span>
                <span className="flex items-center gap-1 bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                  <HiOutlineExclamation className="w-4 h-4" />
                  Penting
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{announcement.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{announcement.content}</p>
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="w-4 h-4" />
                  {formatDate(announcement.created_at)}
                </span>
                <span className="flex items-center gap-1">
                  <FaUser className="w-4 h-4" />
                  {announcement.author?.name || 'Admin'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* All Announcements */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          <h2 className="text-lg font-semibold">Semua Pengumuman</h2>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-500">Memuat pengumuman...</p>
          </div>
        ) : allAnnouncements.length > 0 ? (
          <div className="space-y-4">
            {allAnnouncements.map((announcement) => (
              <Link
                key={announcement.id}
                to={`/admin/pengumuman/${announcement.id}`}
                className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`${getCategoryColor(announcement.category?.name)} text-white text-xs px-3 py-1 rounded-full`}>
                    {announcement.category?.name || 'Umum'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{announcement.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{announcement.content}</p>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="w-4 h-4" />
                    {formatDate(announcement.created_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUser className="w-4 h-4" />
                    {announcement.author?.name || 'Admin'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-2xl">
            <p className="text-gray-500">Belum ada pengumuman</p>
          </div>
        )}
      </div>
    </div>
  );
}
