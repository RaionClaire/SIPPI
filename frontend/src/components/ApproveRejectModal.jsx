import { useState } from 'react';
import { HiOutlineX, HiOutlineCheck, HiOutlineExclamationCircle } from 'react-icons/hi';

export default function ApproveRejectModal({ isOpen, onClose, onConfirm, type, fileName }) {
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (type === 'reject' && !rejectionReason.trim()) {
      return;
    }

    setLoading(true);
    try {
      await onConfirm(type === 'reject' ? rejectionReason : null);
      onClose();
      setRejectionReason('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRejectionReason('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className={`p-6 ${type === 'approve' ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {type === 'approve' ? (
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <HiOutlineCheck className="w-6 h-6 text-white" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <HiOutlineExclamationCircle className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {type === 'approve' ? 'Setujui Berkas' : 'Tolak Berkas'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {fileName}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <HiOutlineX className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {type === 'approve' ? (
            <p className="text-gray-600">
              Apakah Anda yakin ingin menyetujui berkas ini? Mahasiswa akan menerima notifikasi bahwa berkasnya telah disetujui.
            </p>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                Berikan alasan penolakan untuk berkas ini:
              </p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Contoh: Format file tidak sesuai, dokumen tidak lengkap, dll."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                rows="4"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || (type === 'reject' && !rejectionReason.trim())}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-white transition-colors ${
              type === 'approve'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            } ${
              loading || (type === 'reject' && !rejectionReason.trim())
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Memproses...
              </span>
            ) : (
              type === 'approve' ? 'Ya, Setujui' : 'Ya, Tolak'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
