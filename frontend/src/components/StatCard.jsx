export default function StatCard({ label, value, color }) {
  return (
    <div className="bg-white w-40 p-4 rounded-xl shadow-sm flex flex-col gap-1 relative">
      {/* Left colored strip */}
      <div
        className="absolute left-0 top-0 h-full w-1.5 rounded-l-2xl"
        style={{ backgroundColor: color }}
      />

      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-2xl font-semibold">{value}</span>
    </div>
  );
}
