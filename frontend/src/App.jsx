import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AnnouncementDetail from './pages/AnnouncementDetail';
import BerkasAdministrasi from './pages/BerkasAdministrasi';
import BerkasDetail from './pages/BerkasDetail';
import Notification from './pages/Notification';
import Archive from './pages/Archive';
import Profile from './pages/Profile';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import KelolaPengumuman from './pages/admin/KelolaPengumuman';
import BuatPengumuman from './pages/admin/BuatPengumuman';
import DetailPengumuman from './pages/admin/DetailPengumuman';
import KelolaBerkas from './pages/admin/KelolaBerkas';
import ManajemenPengguna from './pages/admin/ManajemenPengguna';
import TambahPengguna from './pages/admin/TambahPengguna';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      
      {/* Mahasiswa Routes */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pengumuman/:id" element={<AnnouncementDetail />} />
        <Route path="/berkas-administrasi" element={<BerkasAdministrasi />} />
        <Route path="/berkas/:type" element={<BerkasDetail />} />
        <Route path="/notifikasi" element={<Notification />} />
        <Route path="/arsip" element={<Archive />} />
        <Route path="/profil" element={<Profile />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/pengumuman" element={<KelolaPengumuman />} />
        <Route path="/admin/pengumuman/buat" element={<BuatPengumuman />} />
        <Route path="/admin/pengumuman/:id" element={<DetailPengumuman />} />
        <Route path="/admin/pengumuman/:id/edit" element={<BuatPengumuman />} />
        <Route path="/admin/berkas" element={<KelolaBerkas />} />
        <Route path="/admin/pengguna" element={<ManajemenPengguna />} />
        <Route path="/admin/pengguna/tambah" element={<TambahPengguna />} />
        <Route path="/admin/pengguna/:id/edit" element={<TambahPengguna />} />
      </Route>
    </Routes>
  );
}

export default App;