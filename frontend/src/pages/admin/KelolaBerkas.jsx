import { useState, useEffect } from 'react';
import { HiOutlineDocumentText, HiOutlineCheck, HiOutlineX, HiOutlineEye, HiOutlineDownload } from 'react-icons/hi';
import StatCard from '../../components/StatCard';
import { berkasAPI } from '../../services/api';

export default function KelolaBerkas() {
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await berkasAPI.getAll();
      setFiles(response.data.data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await berkasAPI.update(id, { status: 'approved' });
      fetchFiles();
    } catch (error) {
      console.error('Error approving file:', error);
      alert('Gagal menyetujui berkas');
    }
  };

  const handleReject = async (id) => {
    try {
      await berkasAPI.update(id, { status: 'rejected' });
      fetchFiles();
    } catch (error) {
      console.error('Error rejecting file:', error);
      alert('Gagal menolak berkas');
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

  const mockFiles = [
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Disetujui</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Ditolak</span>;
      default:
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pending</span>;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'Proposal': 'bg-blue-500',
      'Hasil': 'bg-green-500',
      'Kompre': 'bg-purple-500',
      'KP': 'bg-orange-500',
    };
    return colors[type] || 'bg-gray-500';
  };

  const stats = {
    total: files.length,
    pending: files.filter(f => f.status === 'pending').length,
    approved: files.filter(f => f.status === 'approved').length,
    rejected: files.filter(f => f.status === 'rejected').length,
  };

  const filteredFiles = filter === 'all' 
    ? files 
    : files.filter(f => f.status === filter);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kelola Berkas</h1>
        <p className="text-gray-500">Verifikasi dan kelola berkas pendaftaran mahasiswa</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Berkas"
          value={stats.total}
          color="#3B82F6"
        />
        <StatCard
          label="Pending"
          value={stats.pending}
          color="#FBBF24"
        />
        <StatCard
          label="Disetujui"
          value={stats.approved}
          color="#4ADE80"
        />
        <StatCard
          label="Ditolak"
          value={stats.rejected}
          color="#F87171"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'approved', 'rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl transition-colors ${
              filter === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab === 'all' ? 'Semua' : tab === 'pending' ? 'Pending' : tab === 'approved' ? 'Disetujui' : 'Ditolak'}
          </button>
        ))}
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
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">MAHASISWA</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">TIPE</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">NAMA FILE</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">TANGGAL</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">STATUS</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-800 font-medium">{file.user?.name || '-'}</td>
                  <td className="py-4 px-4">
                    <span className={`${getTypeColor(file.type)} text-white text-xs px-3 py-1 rounded-full`}>
                      {file.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <HiOutlineDocumentText className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">{file.filename}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{formatDate(file.created_at)}</td>
                  <td className="py-4 px-4">{getStatusBadge(file.status)}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Lihat"
                      >
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <HiOutlineDownload className="w-5 h-5" />
                      </button>
                      {file.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(file.id)}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Setujui"
                          >
                            <HiOutlineCheck className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(file.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Tolak"
                          >
                            <HiOutlineX className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredFiles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada berkas yang ditemukan
            </div>
          )}
        </div>
      )}
    </div>
  );
}
