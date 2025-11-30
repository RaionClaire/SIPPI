import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaArrowRight } from 'react-icons/fa';

export default function DocumentCard({ title, description, type, color, route }) {
  const navigate = useNavigate();

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    green: 'bg-green-50 border-green-200 hover:border-green-400',
    pink: 'bg-pink-50 border-pink-200 hover:border-pink-400',
    orange: 'bg-orange-50 border-orange-200 hover:border-orange-400',
    red: 'bg-red-50 border-red-200 hover:border-red-400'
  };

  const iconColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    pink: 'text-pink-600',
    orange: 'text-orange-600',
    red: 'text-red-600'
  };

  const buttonColors = {
    blue: 'text-blue-600 hover:text-blue-700',
    green: 'text-green-600 hover:text-green-700',
    pink: 'text-pink-600 hover:text-pink-700',
    orange: 'text-orange-600 hover:text-orange-700',
    red: 'text-red-600 hover:text-red-700'
  };

  return (
    <div
      className={`${colorClasses[color]} border-2 rounded-xl p-6 transition-all cursor-pointer`}
      onClick={() => navigate(route)}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 bg-white rounded-lg ${iconColors[color]}`}>
          <FaFileAlt className="text-2xl" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <button className={`flex items-center gap-2 font-medium ${buttonColors[color]} transition-colors`}>
            Lihat Berkas <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}