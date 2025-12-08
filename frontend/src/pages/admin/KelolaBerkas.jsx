import { useState, useEffect } from 'react';
import { HiOutlineDocumentText, HiOutlineCheck, HiOutlineX, HiOutlineEye, HiOutlineDownload, HiOutlineSearch } from 'react-icons/hi';
import { useSnackbar } from 'notistack';
import StatCard from '../../components/StatCard';
import { berkasAPI } from '../../services/api';

export default function KelolaBerkas() {
  const { enqueueSnackbar } = useSnackbar();
  
  // States for data and filters
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // '' means All
  const [typeFilter, setTypeFilter] = useState('');   // '' means All

  // Type Colors (Pastel)
  const typeColors = {
    'proposal': 'bg-blue-100 text-blue-600 border-blue-300',
    'hasil': 'bg-green-100 text-green-600 border-green-300',
    'kompre': 'bg-purple-100 text-purple-600 border-purple-300',
    'kp': 'bg-orange-100 text-orange-600 border-orange-300',
    // Fallback for capitalized keys
    'Proposal': 'bg-blue-100 text-blue-600 border-blue-300',
    'Hasil': 'bg-green-100 text-green-600 border-green-300',
    'Kompre': 'bg-purple-100 text-purple-600 border-purple-300',
    'KP': 'bg-orange-100 text-orange-600 border-orange-300',
  };

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
    if (!window.confirm('Apakah Anda yakin ingin menyetujui berkas ini?')) {
      return;
    }
    
    try {
      await berkasAPI.approve(id);
      enqueueSnackbar('Berkas berhasil disetujui', { variant: 'success' });
      fetchFiles();
    } catch (error) {
      console.error('Error approving file:', error);
      enqueueSnackbar('Gagal menyetujui berkas', { variant: 'error' });
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt('Masukkan alasan penolakan:');
    if (!reason) {
      return;
    }
    
    try {
      await berkasAPI.reject(id, { rejection_reason: reason });
      enqueueSnackbar('Berkas berhasil ditolak', { variant: 'success' });
      fetchFiles();
    } catch (error) {
      console.error('Error rejecting file:', error);
      enqueueSnackbar('Gagal menolak berkas', { variant: 'error' });
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Disetujui</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">Ditolak</span>;
      default:
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">Menunggu</span>;
    }
  };

  // Stats Logic
  const stats = {
    total: files.length,
    pending: files.filter(f => f.status === 'pending').length,
    approved: files.filter(f => f.status === 'approved').length,
    rejected: files.filter(f => f.status === 'rejected').length,
  };

  // Advanced Filtering Logic
  const filteredFiles = files.filter(file => {
    // 1. Search Filter (Matches Filename OR Student Name)
    const searchLower = search.toLowerCase();
    const matchSearch = 
      file.filename.toLowerCase().includes(searchLower) || 
      (file.user?.name || '').toLowerCase().includes(searchLower);

    // 2. Status Filter
    const matchStatus = statusFilter === '' || file.status === statusFilter;

    // 3. Type/Category Filter
    // We normalize to lowercase for comparison to handle 'Proposal' vs 'proposal'
    const matchType = typeFilter === '' || file.type.toLowerCase() === typeFilter.toLowerCase();

    return matchSearch && matchStatus && matchType;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Berkas Mahasiswa</h1>
          <p className="text-gray-500">Verifikasi dan kelola berkas yang diupload mahasiswa</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Berkas"
          value={stats.total}
          color="#3B82F6"
        />
        <StatCard
          label="Menunggu Verifikasi"
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

      {/* --- NEW: Filter & Search Section (Matches Image Style) --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Input */}
        <div className="flex-1 relative">
           {/* You can add a search icon absolute positioned here if desired, 
               but the image shows a clean input */}
           <input 
             type="text" 
             placeholder="Cari Berkas / Nama Mahasiswa" 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
           />
        </div>

        {/* Filters Group */}
        <div className="flex gap-4">
          {/* Category Filter */}
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[160px]"
          >
            <option value="">Semua Kategori</option>
            <option value="proposal">Seminar Proposal</option>
            <option value="hasil">Seminar Hasil</option>
            <option value="kompre">Seminar Kompre</option>
            <option value="kp">Kerja Praktik</option>
          </select>

          {/* Status Filter */}
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[150px]"
          >
            <option value="">Semua Status</option>
            <option value="pending">Menunggu</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
      </div>
      {/* --------------------------------------------------------- */}

      {/* Table */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-500">Memuat data...</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-600 font-bold text-xs uppercase tracking-wider">BERKAS</th>
                <th className="text-left py-4 px-6 text-gray-600 font-bold text-xs uppercase tracking-wider">MAHASISWA</th>
                <th className="text-left py-4 px-6 text-gray-600 font-bold text-xs uppercase tracking-wider">TANGGAL UPLOAD</th>
                <th className="text-left py-4 px-6 text-gray-600 font-bold text-xs uppercase tracking-wider">KATEGORI</th>
                <th className="text-left py-4 px-6 text-gray-600 font-bold text-xs uppercase tracking-wider">STATUS</th>
                <th className="text-left py-4 px-6 text-gray-600 font-bold text-xs uppercase tracking-wider">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                  {/* File Info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <HiOutlineDocumentText className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                         <span className="font-medium text-gray-800 text-sm truncate max-w-[180px]" title={file.filename}>
                            {file.filename}
                         </span>
                      </div>
                    </div>
                  </td>

                  {/* Mahasiswa */}
                  <td className="py-4 px-6">
                     <div className="flex flex-col">
                        <span className="text-gray-900 font-medium text-sm">{file.user?.name || '-'}</span>
                        <span className="text-gray-400 text-xs">{file.user?.nim || ''}</span>
                     </div>
                  </td>

                  {/* Tanggal */}
                  <td className="py-4 px-6 text-gray-600 text-sm font-medium">
                    {formatDate(file.created_at)}
                  </td>

                  {/* Kategori Badge */}
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                      typeColors[file.type] || 'bg-gray-100 text-gray-600 border-gray-300'
                    }`}>
                      {file.type}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    {getStatusBadge(file.status)}
                  </td>

                  {/* Aksi Actions */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <button
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="Lihat"
                      >
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Download"
                      >
                        <HiOutlineDownload className="w-5 h-5" />
                      </button>
                      
                      {/* Action buttons only for Pending files */}
                      {file.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(file.id)}
                            className="text-green-500 hover:text-green-700 transition-colors"
                            title="Setujui"
                          >
                            <HiOutlineCheck className="w-5 h-5 border border-green-500 rounded-full p-0.5" />
                          </button>
                          <button
                            onClick={() => handleReject(file.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Tolak"
                          >
                            <HiOutlineX className="w-5 h-5 border border-red-500 rounded-full p-0.5" />
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
            <div className="text-center py-12">
              <div className="inline-block p-4 rounded-full bg-gray-50 mb-3">
                <HiOutlineSearch className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Tidak ada berkas yang ditemukan</p>
              <p className="text-gray-400 text-sm mt-1">Coba sesuaikan filter pencarian Anda</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}