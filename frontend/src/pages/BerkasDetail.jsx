import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFileAlt, FaDownload } from 'react-icons/fa';
import { mockDocuments } from '../utils/mockData';

export default function BerkasDetail() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    const docs = mockDocuments[type] || [];
    setDocuments(docs);

    // Set page info based on type
    const pageInfoMap = {
      'seminar-proposal': {
        title: 'Pendaftaran Seminar Proposal',
        description: 'Berkas dan persyaratan untuk pendaftaran seminar proposal tugas akhir. Pastikan semua dokumen diisi dengan lengkap sebelum diserahkan ke bagian akademik.'
      },
      'seminar-hasil': {
        title: 'Pendaftaran Seminar Hasil',
        description: 'Berkas dan persyaratan untuk pendaftaran seminar hasil tugas akhir. Pastikan semua dokumen diisi dengan lengkap sebelum diserahkan ke bagian akademik.'
      },
      'seminar-kompre': {
        title: 'Pendaftaran Seminar Komprehensif',
        description: 'Berkas dan persyaratan untuk pendaftaran ujian komprehensif. Ujian kompre adalah ujian akhir sebelum wisuda.'
      },
      'kerja-praktik': {
        title: 'Pendaftaran Kerja Praktik',
        description: 'Berkas dan persyaratan untuk pendaftaran kerja praktik/magang. Kerja praktik wajib dilaksanakan sebelum mengambil tugas akhir.'
      },
      'administrasi-lainnya': {
        title: 'Berkas Administrasi Lainnya',
        description: 'Dokumen dan formulir administrasi lainnya yang mungkin diperlukan selama masa studi.'
      }
    };

    setPageInfo(pageInfoMap[type] || { title: 'Berkas', description: '' });
  }, [type]);

  const handleDownload = (docId, docName) => {
    alert(`Mengunduh: ${docName}`);
  };

  const getFileIcon = (fileType) => {
    return <FaFileAlt className="text-blue-600 text-2xl" />;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/berkas-administrasi')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
      >
        <FaArrowLeft />
        Kembali Ke Berkas Administrasi
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {pageInfo.title}
        </h1>
        <p className="text-gray-600 leading-relaxed">
          {pageInfo.description}
        </p>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FaFileAlt className="text-blue-600" />
          Berkas Yang Tersedia
        </h2>

        {documents.length > 0 ? (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {doc.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                        {doc.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                        {doc.size}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(doc.id, doc.name)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaDownload />
                    Unduh
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada berkas tersedia</p>
          </div>
        )}
      </div>
    </div>
  );
}