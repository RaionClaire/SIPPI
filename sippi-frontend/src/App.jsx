import { Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  // Simulasi auth - nanti ganti dengan real auth
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
      
      <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}>
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