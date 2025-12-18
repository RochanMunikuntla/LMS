export function AnnouncementCard({ announcement }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
      
      {/* Title */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white text-lg font-semibold">
          {announcement.title}
        </h3>
      </div>

      {/* Content */}
      <p className="text-gray-400 mb-4">
        {announcement.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="text-gray-300">
            Posted by {announcement.author}
          </span>
          <span>|</span>
          <span>
            Department: {announcement.department}
          </span>
        </div>

        <span className="text-gray-500">
          Date: {announcement.date}
        </span>
      </div>

    </div>
  );
}
