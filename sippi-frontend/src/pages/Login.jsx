import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error saat user mulai mengetik
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username harus diisi';
    }
    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulasi login - nanti ganti dengan API call
    // authAPI.login(formData).then(...)
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('token', 'mock-token-12345');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">SIPPI</h1>
            <p className="text-gray-600">Sistem Informasi Pengumuman Prodi Informatika</p>
          </div>

          {/* Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">MASUK</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Masukkan Username"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.username ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan Kata Sandi"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                MASUK
              </button>

              {/* Register Link */}
              <div className="text-center bg-gray-50 rounded-xl p-4">
                <span className="text-gray-700">Belum Punya Akun? </span>
                <Link to="/register" className="text-orange-500 hover:text-orange-600 font-semibold">
                  Daftar Disini
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right side - Logo & Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 items-center justify-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-white/10 rounded-full"></div>

        {/* Logo placeholder */}
        <div className="relative z-10">
          <div className="w-64 h-64 bg-white rounded-3xl shadow-2xl"></div>
        </div>
      </div>
    </div>
  );
}