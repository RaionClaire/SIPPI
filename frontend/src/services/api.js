import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
export const BACKEND_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk handle 401 response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid atau expired, clear storage dan redirect ke login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  changePassword: (data) => api.post('/auth/change-password', data),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

// Announcements API
export const announcementAPI = {
  getAll: (params) => api.get('/pengumuman', { params }),
  getById: (id) => api.get(`/pengumuman/${id}`),
  create: (data) => api.post('/pengumuman', data),
  update: (id, data) => api.put(`/pengumuman/${id}`, data),
  delete: (id) => api.delete(`/pengumuman/${id}`),
  toggleArchive: (id) => api.post(`/pengumuman/${id}/toggle-archive`),
  toggleImportant: (id) => api.post(`/pengumuman/${id}/toggle-important`),
  addComment: (id, comment) => api.post(`/pengumuman/${id}/comments`, comment),
};

// Documents API
export const documentAPI = {
  getByType: (type) => api.get(`/documents/${type}`),
  download: (id) => api.get(`/documents/${id}/download`, { responseType: 'blob' }),
};

// Notifications API
export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id) => api.post(`/notifications/${id}/read`),
  markAllAsRead: () => api.post('/notifications/mark-all-read'),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  resetPassword: (id) => api.post(`/users/${id}/reset-password`),
};

// Berkas API
export const berkasAPI = {
  getAll: () => api.get('/berkas'),
  getById: (id) => api.get(`/berkas/${id}`),
  create: (data) => api.post('/berkas', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  update: (id, data) => api.put(`/berkas/${id}`, data),
  delete: (id) => api.delete(`/berkas/${id}`),
  approve: (id) => api.post(`/berkas/${id}/approve`),
  reject: (id, data) => api.post(`/berkas/${id}/reject`, data),
  download: (id) => api.get(`/berkas/${id}/download`, { responseType: 'blob' }),
};

// Category API
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

export default api;