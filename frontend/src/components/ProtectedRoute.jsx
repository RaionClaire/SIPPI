import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If route requires admin but user is not admin, redirect to mahasiswa home
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  // If route is for mahasiswa but user is admin, redirect to admin dashboard
  if (!adminOnly && user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (token && isAuthenticated) {
    // Redirect based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }
  
  return children;
};
