import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiOutlineDocumentText, 
  HiOutlineClock, 
  HiOutlineCheckCircle, 
  HiOutlineFilter, 
  HiOutlineSearch, 
  HiOutlineExclamationCircle 
} from 'react-icons/hi';
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

  // Helper for Pastel Badge Styles (Matches the image)
  const getCategoryStyle = (categoryName) => {
    const styles = {
        'Akademik': 'bg-red-100 text-red-600',
        'Beasiswa': 'bg-blue-100 text-blue-600',
        'Lomba': 'bg-yellow-100 text-yellow-600',
        'Kegiatan': 'bg-blue-100 text-blue-600',
        'Informasi': 'bg-purple-100 text-purple-600',
    };
    return styles[categoryName] || 'bg-gray-100 text-gray-600';
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
    <div className="space-y-8 font-sans">
      
      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Pengumuman (Blue Border Style) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-500 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <HiOutlineDocumentText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
               <p className="text-gray-500 text-sm font-medium">Total</p>
               <p className="text-gray-500 text-sm font-medium -mt-1">Pengumuman</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800">{stats.totalPengumuman}</p>
        </div>

        {/* Card 2: Berkas Pending (Standard Style) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <HiOutlineClock className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-gray-600 font-medium">Berkas Pending</p>
          </div>
          <p className="text-4xl font-bold text-gray-800">{stats.berkasPending}</p>
        </div>

        {/* Card 3: Berkas Disetujui (Standard Style) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <HiOutlineCheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-gray-600 font-medium">Berkas Disetujui</p>
          </div>
          <p className="text-4xl font-bold text-gray-800">{stats.berkasDisetujui}</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <button className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600 font-medium whitespace-nowrap">
          <HiOutlineFilter className="w-5 h-5 text-blue-500" />
          <span>Filter Kategori</span>
        </button>

        <div className="flex-1 relative">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari Pengumuman"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Pengumuman Penting Section */}
      {importantAnnouncements.length > 0 && (
        <div>
          {/* Section Header with Red Accent Bar */}
          <div className="flex items-center gap-3 mb-4 pl-1">
            <div className="w-1 h-6 bg-red-500 rounded-full"></div>
            <h2 className="text-lg font-medium text-gray-800">Pengumuman Penting</h2>
          </div>

          <div className="space-y-4">
            {importantAnnouncements.map((announcement) => (
              <Link
                key={announcement.id}
                to={`/admin/pengumuman/${announcement.id}`}
                className="block bg-white rounded-2xl p-6 shadow-sm border-l-4 border-red-500 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  {/* Category Pill */}
                  <span className={`${getCategoryStyle(announcement.category?.name)} px-3 py-1 rounded-full text-xs font-semibold`}>
                    {announcement.category?.name || 'Umum'}
                  </span>
                  
                  {/* Penting Indicator */}
                  <span className="flex items-center gap-1 text-red-500 text-sm font-medium">
                    <HiOutlineExclamationCircle className="w-5 h-5" />
                    Penting
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {announcement.content}
                </p>

                <div className="flex items-center gap-6 text-gray-400 text-sm border-t border-gray-100 pt-4">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="w-4 h-4" />
                    {formatDate(announcement.created_at)}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaUser className="w-3 h-3" />
                    {announcement.author?.name || 'Admin Prodi'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Semua Pengumuman Section */}
      <div>
        {/* Section Header with Blue Accent Bar */}
        <div className="flex items-center gap-3 mb-4 pl-1">
          <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
          <h2 className="text-lg font-medium text-gray-800">Semua Pengumuman</h2>
        </div>

        {loading ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-500">Memuat data...</p>
          </div>
        ) : allAnnouncements.length > 0 ? (
          <div className="space-y-4">
            {allAnnouncements.map((announcement) => (
              <Link
                key={announcement.id}
                to={`/admin/pengumuman/${announcement.id}`}
                className="block bg-white rounded-2xl p-6 shadow-sm border-l-4 border-blue-600 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  {/* Category Pill */}
                  <span className={`${getCategoryStyle(announcement.category?.name)} px-3 py-1 rounded-full text-xs font-semibold`}>
                    {announcement.category?.name || 'Umum'}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {announcement.content}
                </p>

                <div className="flex items-center gap-6 text-gray-400 text-sm border-t border-gray-100 pt-4">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="w-4 h-4" />
                    {formatDate(announcement.created_at)}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaUser className="w-3 h-3" />
                    {announcement.author?.name || 'Admin Prodi'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineDocumentText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Belum ada pengumuman</p>
          </div>
        )}
      </div>
    </div>
  );
}