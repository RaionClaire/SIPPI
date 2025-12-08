import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { HiOutlineArrowLeft, HiOutlineUpload, HiOutlineDocumentText } from 'react-icons/hi';
import { berkasAPI } from '../services/api'; // Ensure this path matches your project structure

export default function UploadBerkasDetail() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  
  // State
  const [selectedType, setSelectedType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userFiles, setUserFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);

  // Constants
  const fileTypes = [
    { value: 'proposal', label: 'Lembar Persetujuan Pembimbing', description: 'Surat persetujuan membimbing dari dosen pembimbing' },
    { value: 'hasil', label: 'Berita Acara', description: 'Berita acara kegiatan akademik' },
    { value: 'kompre', label: 'Kartu Kendali Bimbingan', description: 'Kartu kendali bimbingan mahasiswa' },
    { value: 'kp', label: 'Draf Laporan Proposal', description: 'Draft laporan proposal tugas akhir' },
  ];

  // Logic
  useEffect(() => {
    fetchUserFiles();
  }, []);

  const fetchUserFiles = async () => {
    try {
      setLoadingFiles(true);
      const response = await berkasAPI.getAll();
      // Backend now filters by user_id for mahasiswa automatically
      setUserFiles(response.data.data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoadingFiles(false);
    }
  };
  
  const getCategoryTitle = () => {
    const titles = {
      sempro: 'Seminar Proposal',
      semhas: 'Seminar Hasil',
      kompre: 'Seminar Kompre',
      kp: 'Kerja Praktik',
      others: 'Administrasi Lainnya',
    };
    return titles[category] || 'Upload Berkas';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        enqueueSnackbar('Ukuran file maksimal 10MB', { variant: 'error' });
        e.target.value = '';
        return;
      }

      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        enqueueSnackbar('Format file harus PDF, DOC, atau DOCX', { variant: 'error' });
        e.target.value = '';
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedType) {
      enqueueSnackbar('Pilih jenis berkas terlebih dahulu', { variant: 'error' });
      return;
    }
    if (!selectedFile) {
      enqueueSnackbar('Pilih file terlebih dahulu', { variant: 'error' });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('type', selectedType);
      formData.append('file', selectedFile);

      await berkasAPI.create(formData);
      enqueueSnackbar('Berkas berhasil diunggah', { variant: 'success' });
      
      setSelectedType('');
      setSelectedFile(null);
      // Reset input manually since we don't have a ref here, utilizing ID
      const fileInput = document.getElementById('fileInput');
      if(fileInput) fileInput.value = '';
      
      fetchUserFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(', ');
        enqueueSnackbar(errorMessages, { variant: 'error' });
      } else {
        enqueueSnackbar(error.response?.data?.message || 'Gagal mengunggah berkas', { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus berkas ini?')) {
      return;
    }

    try {
      await berkasAPI.delete(id);
      enqueueSnackbar('Berkas berhasil dihapus', { variant: 'success' });
      fetchUserFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      enqueueSnackbar('Gagal menghapus berkas', { variant: 'error' });
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getTypeName = (type) => {
    const fileType = fileTypes.find(t => t.value === type);
    return fileType ? fileType.label : type;
  };

  // Helper to trigger hidden file input
  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Navigation */}
        <button
          onClick={() => navigate('/upload-berkas')}
          className="flex items-center gap-2 text-blue-600 mb-6 hover:text-blue-800 transition-colors font-medium"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
          <span>Kembali Ke Upload Berkas</span>
        </button>

        {/* Title Card */}
        <div className="bg-white rounded-[20px] shadow-sm p-8 mb-6 border border-gray-100">
          <h1 className="text-2xl font-semibold text-black mb-2">
            Upload Berkas {getCategoryTitle()}
          </h1>
          <p className="text-gray-500">
            Upload semua berkas yang diperlukan untuk {getCategoryTitle().toLowerCase()}
          </p>
        </div>

        {/* Main Form Card */}
        {/* Used border-blue-500/30 or equivalent to match screenshot focus look */}
        <div className="bg-white rounded-[20px] shadow-sm p-8 border-2 border-blue-400">
          
          <div className="flex items-center gap-3 mb-6">
            <HiOutlineUpload className="w-6 h-6 text-blue-600" />
            <span className="font-medium text-gray-700">Upload Berkas</span>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            
            {/* Dropdown Section */}
            <div>
              <label className="block text-gray-800 mb-2">
                Pilih Jenis Berkas <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value="" disabled>----- Pilih jenis berkas yang akan diupload -----</option>
                  {fileTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic Info Alert - Matches Screenshot style */}
              {selectedType && (
                <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-600 text-sm">
                    <span className="font-bold">Keterangan :</span> {fileTypes.find(t => t.value === selectedType)?.description}
                  </p>
                </div>
              )}
            </div>

            {/* Upload Area / Selected File View */}
            <div>
              {selectedFile ? (
                 /* Selected File View (Matches Image 3) */
                <>
                 <label className="block text-gray-800 mb-2">Berkas Dipilih</label>
                 <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                        <HiOutlineDocumentText className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium text-sm">{selectedFile.name}</p>
                        <p className="text-gray-400 text-xs">{formatFileSize(selectedFile.size)}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedFile(null);
                        const fileInput = document.getElementById('fileInput');
                        if(fileInput) fileInput.value = '';
                      }}
                      className="text-red-500 font-bold px-3 py-1 hover:bg-red-50 rounded transition-colors"
                    >
                      X
                    </button>
                 </div>
                </>
              ) : (
                /* Empty Upload Box (Matches Image 1) */
                <div className="border border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-center bg-white">
                  <div className="mb-4">
                    <HiOutlineUpload className="w-8 h-8 text-blue-600 mx-auto" />
                  </div>
                  
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  
                  <button
                    onClick={triggerFileInput}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-medium transition-colors mb-3 shadow-sm"
                  >
                    Pilih Berkas
                  </button>
                  
                  <p className="text-gray-500 text-sm">
                    Format: PDF, DOC, DOCX
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Divider & Action Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={loading || !selectedType || !selectedFile}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white transition-all shadow-sm ${
                loading || !selectedType || !selectedFile
                  ? 'bg-gray-300 cursor-not-allowed' // Matches the "disabled" look usually seen in these designs
                  : 'bg-blue-600 hover:bg-blue-700'  // Or gray-400 for neutral look like screenshot if strictly needed
              }`}
            >
              {loading ? (
                 <>
                   <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                   <span>Mengunggah...</span>
                 </>
              ) : (
                <>
                  <HiOutlineUpload className="w-5 h-5" />
                  <span>Upload Berkas</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Riwayat Berkas Upload */}
        {userFiles.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Riwayat Berkas</h3>
            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
               {userFiles.map((file, index) => (
                 <div key={file.id} className={`p-4 ${index !== userFiles.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mt-1">
                          <HiOutlineDocumentText className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{getTypeName(file.type)}</p>
                          <p className="text-gray-500 text-xs mb-2">{file.filename}</p>
                          
                          {/* Status Badge */}
                          <div className="flex items-center gap-2">
                            {file.status === 'pending' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Menunggu Persetujuan
                              </span>
                            )}
                            {file.status === 'approved' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Disetujui
                              </span>
                            )}
                            {file.status === 'rejected' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Ditolak
                              </span>
                            )}
                          </div>
                          
                          {/* Rejection Reason */}
                          {file.status === 'rejected' && file.rejection_reason && (
                            <div className="mt-2 p-2 bg-red-50 rounded-md">
                              <p className="text-xs text-red-700">
                                <span className="font-semibold">Alasan:</span> {file.rejection_reason}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Delete button only for pending status */}
                      {file.status === 'pending' && (
                        <button 
                          onClick={() => handleDelete(file.id)}
                          className="text-red-500 text-sm hover:underline ml-4"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}