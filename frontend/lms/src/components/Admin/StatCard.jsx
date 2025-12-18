const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600",
};

export function StatCard({ label, value, trend, color }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
      
      {/* Top Section */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center`}
        >
          <span className="text-white text-sm font-semibold">
            Stat
          </span>
        </div>

        <span className="text-green-400 text-sm">
          {trend}
        </span>
      </div>

      {/* Value */}
      <div className="text-white text-3xl mb-1">
        {value}
      </div>

      {/* Label */}
      <div className="text-gray-400 text-sm">
        {label}
      </div>
    </div>
  );
}
