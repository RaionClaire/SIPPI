import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { authAPI } from '../services/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      const { access_token, user } = response.data;

      // Save to localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat font-sans flex items-center"
      style={{ backgroundImage: "url('/login.png')" }}
    >
      
      {/* --- Main Layout Container --- */}
      <div className="container mx-auto px-4 relative z-10 flex flex-wrap justify-between items-center h-full">
        
        {/* --- Left Column: Login Forms --- */}
        <div className="w-full md:w-[450px] flex flex-col gap-6 ml-0 md:ml-12">
          
          {/* Top Card: Title */}
          <div className="bg-[#9ec5fe] p-6 rounded-3xl shadow-lg text-center border-b-4 border-[#8eb5ee]">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-md tracking-wider">SIPPI</h1>
            <p className="text-white text-sm mt-1 font-medium leading-tight">
              Sistem Informasi Pengumuman<br />Prodi Informatika
            </p>
          </div>

          {/* Bottom Card: Login Inputs */}
          <div className="bg-[#9ec5fe] p-8 rounded-3xl shadow-lg border-b-4 border-[#8eb5ee]">
            <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-sm">MASUK</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaUser size={20} />
                </div>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan Email" 
                  className="w-full py-3 pl-10 pr-4 bg-[#e2eafc] rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLock size={20} />
                </div>
                <input 
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan Kata Sandi" 
                  className="w-full py-3 pl-10 pr-4 bg-[#e2eafc] rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                  required
                />
              </div>

              {/* Login Button */}
              <button 
                type="submit"
                disabled={loading}
                className={`w-full bg-[#103e91] hover:bg-[#0d3275] text-white font-bold py-3 rounded-md transition duration-200 shadow-md mt-4 text-lg tracking-wide ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'MEMUAT...' : 'MASUK'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;