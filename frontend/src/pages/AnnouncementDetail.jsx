import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaPaperPlane } from 'react-icons/fa';
import { mockAnnouncements } from '../utils/mockData.js';

export default function AnnouncementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Simulasi fetch data - nanti ganti dengan API call
    // announcementAPI.getById(id).then(...)
    const found = mockAnnouncements.find(a => a.id === parseInt(id));
    if (found) {
      setAnnouncement(found);
      setComments(found.comments || []);
    }
  }, [id]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    // Simulasi post comment - nanti ganti dengan API call
    // announcementAPI.addComment(id, { text: comment }).then(...)
    const newComment = {
      id: comments.length + 1,
      author: 'Current User',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      text: comment
    };
    setComments([...comments, newComment]);
    setComment('');
  };

  if (!announcement) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const categoryColors = {
    Akademik: 'bg-red-100 text-red-600',
    Kegiatan: 'bg-blue-100 text-blue-600',
    Beasiswa: 'bg-green-100 text-green-600'
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
      >
        <FaArrowLeft />
        Kembali Ke Beranda
      </button>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[announcement.category]}`}>
            {announcement.category}
          </span>
          {announcement.status && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white">
              {announcement.status}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {announcement.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-gray-600 mb-6 pb-6 border-b">
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <span>{announcement.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUser />
            <span>{announcement.author}</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {announcement.content}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          Komentar ({comments.length})
        </h2>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-8">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tulis Komentar Anda..."
            rows="4"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <FaPaperPlane />
              Kirim
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map(c => (
            <div key={c.id} className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaUser className="text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-900">{c.author}</span>
                  <span className="text-sm text-gray-500">{c.date}</span>
                </div>
                <p className="text-gray-700">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}