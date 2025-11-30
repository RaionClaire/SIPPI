import { useState, useEffect } from 'react';
import { FaUser, FaHashtag, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import { mockUserProfile } from '../utils/mockData';

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Simulasi fetch data - nanti ganti dengan API call
    // userAPI.getProfile().then(...)
    setProfile(mockUserProfile);
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const profileFields = [
    { icon: FaUser, label: 'Username', value: profile.username, color: 'bg-blue-50 text-blue-600' },
    { icon: FaHashtag, label: 'NPM', value: profile.npm, color: 'bg-green-50 text-green-600' },
    { icon: FaGraduationCap, label: 'Semester Saat Ini', value: profile.semester, color: 'bg-purple-50 text-purple-600' },
    { icon: FaCalendarAlt, label: 'Tahun Masuk', value: profile.tahunMasuk, color: 'bg-orange-50 text-orange-600' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil Pengguna</h1>
        <p className="text-gray-600">Informasi akun dan data mahasiswa Anda</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <FaUser className="text-5xl text-blue-600" />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-8 pb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{profile.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileFields.map((field, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${field.color}`}>
                    <field.icon className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{field.label}</p>
                    <p className="font-semibold text-gray-900">{field.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Note */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Informasi</h3>
            <p className="text-sm text-blue-800">
              Jika ada perubahan data pribadi (nama, NPM, dll), silakan hubungi bagian administrasi 
              akademik untuk pembaruan data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}