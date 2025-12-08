import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineDocumentText, 
  HiOutlineDocumentReport, 
  HiOutlineClipboardList, 
  HiOutlineBriefcase, 
  HiOutlineCollection, 
  HiChevronRight 
} from 'react-icons/hi';

export default function BerkasAdministrasi() {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  const documentTypes = [
    {
      title: 'Pendaftaran Seminar Proposal',
      description: 'Berkas dan persyaratan untuk pendaftaran seminar proposal tugas akhir',
      theme: 'blue',
      route: '/berkas/seminar-proposal',
      icon: <HiOutlineDocumentText className="w-8 h-8" />,
    },
    {
      title: 'Pendaftaran Seminar Hasil',
      description: 'Berkas dan persyaratan untuk pendaftaran seminar hasil tugas akhir',
      theme: 'green',
      route: '/berkas/seminar-hasil',
      icon: <HiOutlineDocumentReport className="w-8 h-8" />,
    },
    {
      title: 'Pendaftaran Seminar Komprehensif',
      description: 'Berkas dan persyaratan untuk pendaftaran ujian komprehensif',
      theme: 'pink',
      route: '/berkas/seminar-kompre',
      icon: <HiOutlineClipboardList className="w-8 h-8" />,
    },
    {
      title: 'Pendaftaran Kerja Praktik',
      description: 'Berkas dan persyaratan untuk pendaftaran kerja praktik',
      theme: 'orange',
      route: '/berkas/kerja-praktik',
      icon: <HiOutlineBriefcase className="w-8 h-8" />,
    },
    {
      title: 'Berkas Administrasi Lainnya',
      description: 'Dokumen dan formulir administrasi lainnya yang mungkin diperlukan',
      theme: 'red',
      route: '/berkas/administrasi-lainnya',
      icon: <HiOutlineCollection className="w-8 h-8" />,
    },
  ];

  // Helper function to return tailwind classes based on theme
  const getThemeClasses = (theme) => {
    const styles = {
      blue: {
        wrapper: 'bg-blue-50 border-blue-400 text-blue-600 hover:bg-blue-100',
        text: 'text-blue-600'
      },
      green: {
        wrapper: 'bg-green-50 border-green-400 text-green-600 hover:bg-green-100',
        text: 'text-green-600'
      },
      pink: {
        wrapper: 'bg-fuchsia-50 border-fuchsia-400 text-fuchsia-600 hover:bg-fuchsia-100',
        text: 'text-fuchsia-600'
      },
      orange: {
        wrapper: 'bg-orange-50 border-orange-300 text-orange-600 hover:bg-orange-100',
        text: 'text-orange-600'
      },
      red: {
        wrapper: 'bg-red-50 border-red-400 text-red-600 hover:bg-red-100',
        text: 'text-red-600'
      },
    };
    return styles[theme] || styles.blue;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Informasi Kebutuhan Administrasi</h1>
          <p className="text-gray-500 mt-1">
            Pilih jenis administrasi untuk mengunduh berkas dan formulir yang diperlukan
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documentTypes.map((item, index) => {
            const style = getThemeClasses(item.theme);
            
            return (
              <div 
                key={index}
                onClick={() => handleNavigate(item.route)}
                className={`
                  ${style.wrapper} 
                  border-2 rounded-2xl p-8 
                  cursor-pointer transition-all duration-200 
                  flex flex-col justify-between min-h-[220px]
                  shadow-sm hover:shadow-md
                `}
              >
                {/* Top Content */}
                <div>
                  <div className="mb-4">
                    {item.icon}
                  </div>
                  
                  <h3 className="font-bold text-lg mb-3 leading-snug">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="mt-6 flex items-center gap-1 text-sm font-semibold">
                  <span>Lihat Detail</span>
                  <HiChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}