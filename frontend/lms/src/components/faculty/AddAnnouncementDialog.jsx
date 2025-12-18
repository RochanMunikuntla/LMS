import { useState } from "react";

export function AddAnnouncementDialog({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && content) {
      onAdd({
        title,
        content,
        author: "You",
        date: "Just now",
      });

      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white text-xl">Add Announcement</h2>
            <p className="text-gray-400 text-sm mt-1">
              This will be sent to all your students
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-lg font-semibold"
            aria-label="Close dialog"
          >
            Close
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Message
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter announcement message for your students"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-600 min-h-32"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3">
            <p className="text-blue-400 text-sm">
              This announcement will be visible to all students enrolled in your courses.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
