import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { announcementAPI, categoryAPI } from '../../services/api';

export default function BuatPengumuman() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    content: '',
    is_important: false
  });

  useEffect(() => {
    fetchCategories();
    if (isEditMode) {
      fetchAnnouncement();
    }
  }, [id, isEditMode]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Gagal memuat kategori');
    }
  };

  const fetchAnnouncement = async () => {
    try {
      const response = await announcementAPI.getById(id);
      const announcement = response.data.data;
      setFormData({
        title: announcement.title,
        category_id: announcement.category_id,
        content: announcement.content,
        is_important: announcement.is_important || false
      });
    } catch (error) {
      console.error('Error fetching announcement:', error);
      alert('Gagal memuat data pengumuman');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldName = name === 'isImportant' ? 'is_important' : name;
    setFormData({
      ...formData,
      [fieldName]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        await announcementAPI.update(id, formData);
        alert('Pengumuman berhasil diperbarui');
      } else {
        await announcementAPI.create(formData);
        alert('Pengumuman berhasil dibuat');
      }
      
      navigate('/admin/pengumuman');
    } catch (error) {
      console.error('Error saving announcement:', error);
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join('\n');
        alert(errorMessages);
      } else {
        alert(error.response?.data?.message || 'Gagal menyimpan pengumuman');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/pengumuman');
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{isEditMode ? 'Edit Pengumuman' : 'Buat Pengumuman Baru'}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Judul */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Judul Pengumuman</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Masukkan Judul Pengumuman..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Kategori</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Pilih Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Konten */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Konten</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Tulis Isi Pengumuman..."
            rows={8}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
        </div>

        {/* Tandai Penting */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isImportant"
            id="isImportant"
            checked={formData.is_important}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isImportant" className="text-gray-700">
            Tandai Sebagai Penting
          </label>
        </div>

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
            {loading ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Publikasikan')}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
