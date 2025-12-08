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

export default function UploadBerkas() {
  
  const navigate = useNavigate();
  
  const handleNavigate = (category) => {
    navigate(`/upload-berkas/${category}`);
  };

  const categories = [
    {
      id: 'sempro',
      title: 'Upload Berkas Seminar Proposal',
      description: 'Upload berkas untuk seminar proposal tugas akhir',
      theme: 'blue',
      icon: <HiOutlineDocumentText className="w-8 h-8" />,
    },
    {
      id: 'semhas',
      title: 'Upload Berkas Seminar Hasil',
      description: 'Upload berkas untuk seminar hasil tugas akhir',
      theme: 'green',
      icon: <HiOutlineDocumentReport className="w-8 h-8" />,
    },
    {
      id: 'kompre',
      title: 'Upload Berkas Seminar Kompre',
      description: 'Upload berkas untuk seminar komprehensif',
      theme: 'pink',
      icon: <HiOutlineClipboardList className="w-8 h-8" />,
    },
    {
      id: 'kp',
      title: 'Upload Berkas Kerja Praktik',
      description: 'Upload berkas untuk kerja praktik',
      theme: 'orange',
      icon: <HiOutlineBriefcase className="w-8 h-8" />,
    },
    {
      id: 'others',
      title: 'Upload Berkas Administrasi Lainnya',
      description: 'Upload dokumen dan formulir administrasi lainnya',
      theme: 'red',
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
          <h1 className="text-2xl font-bold text-gray-900">Upload Berkas</h1>
          <p className="text-gray-500 mt-1">Pilih kategori berkas yang ingin Anda upload</p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((item) => {
            const style = getThemeClasses(item.theme);
            
            return (
              <div 
                key={item.id}
                onClick={() => handleNavigate(item.id)}
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
                  <span>Pilih & Upload</span>
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