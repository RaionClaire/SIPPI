import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { authAPI } from '../services/api';
import { HiOutlineArrowLeft, HiOutlineLockClosed } from 'react-icons/hi';

export default function ChangePassword() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.new_password !== formData.new_password_confirmation) {
      enqueueSnackbar('Password baru dan konfirmasi tidak sama', { variant: 'error' });
      return;
    }

    if (formData.new_password.length < 8) {
      enqueueSnackbar('Password baru minimal 8 karakter', { variant: 'error' });
      return;
    }

    setLoading(true);

    try {
      await authAPI.changePassword({
        current_password: formData.current_password,
        new_password: formData.new_password,
        new_password_confirmation: formData.new_password_confirmation
      });
      
      enqueueSnackbar('Password berhasil diubah', { variant: 'success' });
      
      // Clear form
      setFormData({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
      
      // Navigate back to profile after 1 second
      setTimeout(() => {
        navigate('/profil');
      }, 1000);
      
    } catch (error) {
      console.error('Error changing password:', error);
      if (error.response?.data?.message) {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(', ');
        enqueueSnackbar(errorMessages, { variant: 'error' });
      } else {
        enqueueSnackbar('Gagal mengubah password', { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/profil')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <HiOutlineArrowLeft className="w-5 h-5" />
        <span>Kembali ke Profil</span>
      </button>

      {/* Change Password Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <HiOutlineLockClosed className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Ubah Password</h1>
            <p className="text-gray-500 text-sm">Perbarui password akun Anda</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password Lama</label>
            <input
              type="password"
              name="current_password"
              value={formData.current_password}
              onChange={handleChange}
              placeholder="Masukkan password lama"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password Baru</label>
            <input
              type="password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              placeholder="Minimal 8 karakter"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Konfirmasi Password Baru</label>
            <input
              type="password"
              name="new_password_confirmation"
              value={formData.new_password_confirmation}
              onChange={handleChange}
              placeholder="Masukkan password baru yang sama"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-700">
              <strong>Tips:</strong> Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol untuk password yang lebih aman.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/profil')}
              className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Menyimpan...' : 'Ubah Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
