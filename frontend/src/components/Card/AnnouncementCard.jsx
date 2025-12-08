import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

export default function AnnouncementCard({ announcement }) {
  const navigate = useNavigate();

  const categoryColors = {
    Akademik: 'bg-red-100 text-red-600 border-red-300',
    Beasiswa: 'bg-green-100 text-green-600 border-green-300',
    Lomba: 'bg-yellow-100 text-yellow-600 border-yellow-300',
    'Informasi Sidang': 'bg-purple-100 text-purple-600 border-purple-300',
    Administrasi: 'bg-indigo-100 text-indigo-600 border-indigo-300'
  };

  const categoryName = announcement.category?.name || announcement.category || 'Umum';
  const authorName = announcement.author?.name || announcement.author || 'Admin';
  
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
    <div
      onClick={() => navigate(`/pengumuman/${announcement.id}`)}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-blue-500 p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[categoryName] || 'bg-gray-100 text-gray-600 border-gray-300'}`}>
            {categoryName}
          </span>
          {announcement.is_important && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Penting
            </span>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {announcement.title}
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {announcement.content?.substring(0, 150) || announcement.excerpt || ''}...
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <FaCalendarAlt />
          <span>{formatDate(announcement.created_at || announcement.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUser />
          <span>{authorName}</span>
        </div>
      </div>
    </div>
  );
}