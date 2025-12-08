import { Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AnnouncementDetail from './pages/AnnouncementDetail';
import BerkasAdministrasi from './pages/BerkasAdministrasi';
import BerkasDetail from './pages/BerkasDetail';
import Notification from './pages/Notification';
import Archive from './pages/Archive';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import UploadBerkas from './pages/UploadBerkas';
import UploadBerkasDetail from './pages/UploadBerkasDetail';
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
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      
      {/* Mahasiswa Routes */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pengumuman/:id" element={<AnnouncementDetail />} />
        <Route path="/berkas-administrasi" element={<BerkasAdministrasi />} />
        <Route path="/berkas/:type" element={<BerkasDetail />} />
        <Route path="/upload-berkas" element={<UploadBerkas />} />
        <Route path="/upload-berkas/:category" element={<UploadBerkasDetail />} />
        <Route path="/notifikasi" element={<Notification />} />
        <Route path="/arsip" element={<Archive />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/ubah-password" element={<ChangePassword />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute adminOnly={true}><AdminLayout /></ProtectedRoute>}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/pengumuman" element={<KelolaPengumuman />} />
        <Route path="/admin/pengumuman/buat" element={<BuatPengumuman />} />
        <Route path="/admin/pengumuman/:id" element={<DetailPengumuman />} />
        <Route path="/admin/pengumuman/:id/edit" element={<BuatPengumuman />} />
        <Route path="/admin/berkas" element={<KelolaBerkas />} />
        <Route path="/admin/pengguna" element={<ManajemenPengguna />} />
        <Route path="/admin/pengguna/tambah" element={<TambahPengguna />} />
        <Route path="/admin/pengguna/:id/edit" element={<TambahPengguna />} />
        <Route path="/admin/notifikasi" element={<Notification />} />
        <Route path="/admin/profil" element={<Profile />} />
        <Route path="/admin/ubah-password" element={<ChangePassword />} />
      </Route>
    </Routes>
    </SnackbarProvider>
  );
}

export default App;