import { useState, useEffect } from 'react';
import AnnouncementCard from '../components/Card/AnnouncementCard';
import FilterButton from '../components/FilterButton';
import SearchBar from '../components/SearchBar';
import { mockAnnouncements, mockCategories } from '../utils/mockData';

export default function Dashboard() {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    // Simulasi fetch data - nanti ganti dengan API call
    // announcementAPI.getAll().then(...)
    setAnnouncements(mockAnnouncements);
    setFilteredAnnouncements(mockAnnouncements);
  }, []);

  useEffect(() => {
    let filtered = announcements;

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(a => selectedCategories.includes(a.category));
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredAnnouncements(filtered);
  }, [searchQuery, selectedCategories, announcements]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Pisahkan pengumuman penting dan semua pengumuman
  const importantAnnouncements = filteredAnnouncements.filter(a => a.status === 'Penting');
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.status || a.status !== 'Penting');

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex gap-4">
          <FilterButton
            onClick={() => setShowFilterModal(!showFilterModal)}
            activeCount={selectedCategories.length}
          />
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari Pengumuman"
          />
        </div>

        {/* Filter Modal */}
        {showFilterModal && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Filter Kategori</h3>
              <button
                onClick={() => setSelectedCategories([])}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Semua Kategori
              </button>
            </div>
            <div className="space-y-2">
              {mockCategories.map(category => (
                <label
                  key={category.name}
                  className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryToggle(category.name)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="flex-1">{category.name}</span>
                  <span className="text-sm text-gray-500">({category.count})</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pengumuman Penting */}
      {importantAnnouncements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pengumuman Penting</h2>
          <div className="space-y-4">
            {importantAnnouncements.map(announcement => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </div>
      )}

      {/* Semua Pengumuman */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Semua Pengumuman</h2>
        {regularAnnouncements.length > 0 ? (
          <div className="space-y-4">
            {regularAnnouncements.map(announcement => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-500">Tidak ada pengumuman ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}