import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineExclamation } from 'react-icons/hi';
import { FaCalendarAlt, FaUser, FaRegComment } from 'react-icons/fa';

export default function DetailPengumuman() {
  const { id } = useParams();

  const [announcement] = useState({
    id: 1,
    title: 'Pengumuman Jadwal Ujian Akhir Semester Ganjil 2024/2025',
    category: 'Akademik',
    isImportant: true,
    date: '20 November 2025',
    author: 'Admin Prodi',
    content: `Kepada seluruh mahasiswa Prodi Informatika,
Dengan ini diumumkan bahwa jadwal ujian akhir semester genap tahun akademik 2024/2025 akan dilaksanakan mulai tanggal 15 Desember 2025.

Untuk jadwal lengkap setiap mata kuliah akan diinformasikan melalui portal akademik paling lambat tanggal 1 Desember 2025. Harap semua mahasiswa mempersiapkan diri dengan baik. Apabila ada pertanyaan, silakan menghubungi bagian akademik. Terima kasih atas perhatiannya.`
  });

  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Raka',
      date: '21 November 2025',
      content: 'Terima kasih atas informasinya.',
      replies: [
        {
          id: 2,
          user: 'Admin',
          date: '21 November 2025',
          content: 'Sama-sama'
        }
      ]
    },
    {
      id: 3,
      user: 'Caca',
      date: '22 November 2025',
      content: 'Terima kasih atas informasinya.',
      replies: []
    }
  ]);

  const [replyText, setReplyText] = useState('');

  const getCategoryColor = (category) => {
    const colors = {
      'Akademik': 'bg-blue-500',
      'Kegiatan': 'bg-green-500',
      'Beasiswa': 'bg-purple-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
      >
        <HiOutlineArrowLeft className="w-5 h-5" />
        <span>Kembali Ke Dashboard</span>
      </Link>

      {/* Announcement Detail */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`${getCategoryColor(announcement.category)} text-white text-sm px-4 py-1 rounded-full`}>
            {announcement.category}
          </span>
          {announcement.isImportant && (
            <span className="flex items-center gap-1 bg-orange-500 text-white text-sm px-4 py-1 rounded-full">
              <HiOutlineExclamation className="w-4 h-4" />
              Penting
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-gray-800 mb-4">{announcement.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-6 text-gray-500 text-sm mb-6">
          <span className="flex items-center gap-2">
            <FaCalendarAlt className="w-4 h-4" />
            {announcement.date}
          </span>
          <span className="flex items-center gap-2">
            <FaUser className="w-4 h-4" />
            {announcement.author}
          </span>
        </div>

        {/* Content */}
        <div className="prose max-w-none text-gray-700 whitespace-pre-line">
          {announcement.content}
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <FaRegComment className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Komentar ({comments.length})</h2>
        </div>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              {/* Main Comment */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaUser className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800">{comment.user}</span>
                    <span className="text-gray-400 text-sm">{comment.date}</span>
                  </div>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              </div>

              {/* Replies */}
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex gap-3 ml-12">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUser className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">{reply.user}</span>
                      <span className="text-gray-400 text-sm">{reply.date}</span>
                    </div>
                    <p className="text-gray-600">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Reply Input */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Balas Komentar..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
