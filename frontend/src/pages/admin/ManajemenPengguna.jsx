import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiPlus, HiOutlinePencil, HiOutlineTrash, HiOutlineUsers } from 'react-icons/hi';
import { useSnackbar } from 'notistack';
import StatCard from '../../components/StatCard';
import { userAPI } from '../../services/api';

export default function ManajemenPengguna() {
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    admin: 0,
    mahasiswa: 0
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAll();
      const usersData = response.data.data || [];
      setUsers(usersData);
      
      // Calculate stats
      setStats({
        total: usersData.length,
        admin: usersData.filter(u => u.role === 'admin').length,
        mahasiswa: usersData.filter(u => u.role === 'mahasiswa').length
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      return;
    }

    try {
      await userAPI.delete(id);
      enqueueSnackbar('Pengguna berhasil dihapus', { variant: 'success' });
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Error deleting user:', error);
      enqueueSnackbar('Gagal menghapus pengguna', { variant: 'error' });
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

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'mahasiswa':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'mahasiswa':
        return 'Mahasiswa';
      default:
        return 'User';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                          user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === '' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
          <p className="text-gray-500">Kelola pengguna dan hak akses sistem</p>
        </div>
        <Link
          to="/admin/pengguna/tambah"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors"
        >
          <HiPlus className="w-5 h-5" />
          <span>Tambah Pengguna</span>
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari Pengguna..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Semua Role</option>
          <option value="admin">Admin</option>
          <option value="mahasiswa">Mahasiswa</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Pengguna"
          value={stats.total}
          color="#3B82F6"
        />
        <StatCard
          label="Admin"
          value={stats.admin}
          color="#fb2424ff"
        />
        <StatCard
          label="Mahasiswa"
          value={stats.mahasiswa}
          color="#4ADE80"
        />
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
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">NAMA</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">EMAIL</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">ROLE</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">TANGGAL DIBUAT</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <span className="text-gray-800 font-medium">{user.name}</span>
                </td>
                <td className="py-4 px-4 text-gray-600">{user.email}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadge(user.role)}`}>
                    {getRoleLabel(user.role)}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">{formatDate(user.created_at)}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/pengguna/${user.id}/edit`}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <HiOutlinePencil className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada pengguna yang ditemukan
            </div>
          )}
        </div>
      )}
    </div>
  );
}
