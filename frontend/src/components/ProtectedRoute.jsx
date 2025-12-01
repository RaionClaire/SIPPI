import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (token && isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};
