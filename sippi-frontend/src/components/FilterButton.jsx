import { FaFilter } from 'react-icons/fa';

export default function FilterButton({ onClick, activeCount = 0 }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <FaFilter className="text-blue-600" />
      <span className="font-medium">Filter Kategori</span>
      {activeCount > 0 && (
        <span className="ml-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
          {activeCount}
        </span>
      )}
    </button>
  );
}