import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { userAPI } from '../../services/api';

export default function TambahPengguna() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'mahasiswa'
  });

  // Load user data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchUser();
    }
  }, [id, isEditMode]);

  const fetchUser = async () => {
    try {
      const response = await userAPI.getById(id);
      const user = response.data.data;
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        role: user.role
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      enqueueSnackbar('Gagal memuat data pengguna', { variant: 'error' });
    }
  };

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
    if (!isEditMode && formData.password !== formData.password_confirmation) {
      enqueueSnackbar('Password dan konfirmasi password tidak sama', { variant: 'error' });
      return;
    }

    if (!isEditMode && formData.password.length < 8) {
      enqueueSnackbar('Password minimal 8 karakter', { variant: 'error' });
      return;
    }

    setLoading(true);

    try {
      if (isEditMode) {
        // Update existing user
        await userAPI.update(id, formData);
        enqueueSnackbar('Pengguna berhasil diperbarui', { variant: 'success' });
      } else {
        // Create new user
        await userAPI.create(formData);
        enqueueSnackbar('Pengguna berhasil ditambahkan', { variant: 'success' });
      }
      
      navigate('/admin/pengguna');
    } catch (error) {
      console.error('Error saving user:', error);
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(', ');
        enqueueSnackbar(errorMessages, { variant: 'error' });
      } else {
        enqueueSnackbar(error.response?.data?.message || 'Gagal menyimpan pengguna', { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/pengguna');
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditMode ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan Nama Lengkap..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
            </select>
            <p className="text-sm text-gray-500 mt-2">
              Admin memiliki akses penuh ke sistem, Mahasiswa hanya dapat melihat pengumuman dan mengelola berkas
            </p>
          </div>

          {/* Password - only show if not edit mode or if user wants to change password */}
          {!isEditMode && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimal 8 karakter"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!isEditMode}
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Konfirmasi Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="Masukkan password yang sama"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!isEditMode}
                  minLength={8}
                />
              </div>
            </>
          )}

          {isEditMode && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                <strong>Info:</strong> Untuk mengubah role pengguna, pilih role baru di atas. Password tidak akan diubah kecuali Anda mengisinya.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
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
              {loading ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Tambah Pengguna')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
