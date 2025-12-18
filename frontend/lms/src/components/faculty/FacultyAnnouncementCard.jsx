export function FacultyAnnouncementCard({ announcement }) {
  if (!announcement) return null;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
      
      {/* Title */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white text-lg font-medium">
          {announcement.title || "Untitled Announcement"}
        </h3>
      </div>

      {/* Content */}
      <p className="text-gray-400 mb-4 leading-relaxed">
        {announcement.content || "No content available."}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-gray-300">
            {announcement.author || "Unknown"}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-500">
            {announcement.department || "General"}
          </span>
        </div>

        <span className="text-gray-400">
          {announcement.date || ""}
        </span>
      </div>
    </div>
  );
}
