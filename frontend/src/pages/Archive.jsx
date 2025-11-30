import { useState, useEffect } from 'react';
import AnnouncementCard from '../components/Card/AnnouncementCard';
import { FaCalendarAlt } from 'react-icons/fa';
import { mockAnnouncements } from '../utils/mockData';

export default function Archive() {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    // Simulasi fetch data - nanti ganti dengan API call
    setAnnouncements(mockAnnouncements);
  }, []);

  // Group announcements by month
  const groupedAnnouncements = announcements.reduce((acc, announcement) => {
    // Extract month/year from date string (format: "DD Month YYYY")
    const dateParts = announcement.date.split(' ');
    const month = dateParts[1];
    const year = dateParts[2];
    const monthYear = `${month} ${year}`;

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(announcement);
    return acc;
  }, {});

  const periods = Object.keys(groupedAnnouncements).sort((a, b) => {
    const [monthA, yearA] = a.split(' ');
    const [monthB, yearB] = b.split(' ');
    
    const monthOrder = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    if (yearB !== yearA) {
      return parseInt(yearB) - parseInt(yearA);
    }
    return monthOrder.indexOf(monthB) - monthOrder.indexOf(monthA);
  });

  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const years = ['2025', '2024', '2023'];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Arsip Pengumuman</h1>
        <p className="text-gray-600">Pengumuman yang telah diarsipkan</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center gap-4">
          <FaCalendarAlt className="text-blue-600 text-xl" />
          <span className="font-medium text-gray-700">Filter Periode</span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Bulan...</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Tahun...</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Archived Announcements */}
      <div className="space-y-8">
        {periods.map((period) => {
          const [month, year] = period.split(' ');
          
          // Filter berdasarkan pilihan
          if (selectedMonth && month !== selectedMonth) return null;
          if (selectedYear && year !== selectedYear) return null;

          return (
            <div key={period}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-blue-600 rounded"></div>
                <h2 className="text-xl font-bold text-gray-900">{period}</h2>
              </div>
              <div className="space-y-4">
                {groupedAnnouncements[period].map(announcement => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {periods.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-500">Tidak ada arsip pengumuman</p>
        </div>
      )}
    </div>
  );
}