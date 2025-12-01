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
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pengumuman/:id" element={<AnnouncementDetail />} />
        <Route path="/berkas-administrasi" element={<BerkasAdministrasi />} />
        <Route path="/berkas/:type" element={<BerkasDetail />} />
        <Route path="/notifikasi" element={<Notification />} />
        <Route path="/arsip" element={<Archive />} />
        <Route path="/profil" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;