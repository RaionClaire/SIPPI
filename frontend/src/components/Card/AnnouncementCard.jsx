import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

export default function AnnouncementCard({ announcement }) {
  const navigate = useNavigate();

  const categoryColors = {
    Akademik: 'bg-red-100 text-red-600 border-red-300',
    Kegiatan: 'bg-blue-100 text-blue-600 border-blue-300',
    Beasiswa: 'bg-green-100 text-green-600 border-green-300'
  };

  return (
    <div
      onClick={() => navigate(`/pengumuman/${announcement.id}`)}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-blue-500 p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[announcement.category] || 'bg-gray-100 text-gray-600 border-gray-300'}`}>
            {announcement.category}
          </span>
          {announcement.status && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              {announcement.status}
            </span>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {announcement.title}
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {announcement.excerpt}
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <FaCalendarAlt />
          <span>{announcement.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUser />
          <span>{announcement.author}</span>
        </div>
      </div>
    </div>
  );
}