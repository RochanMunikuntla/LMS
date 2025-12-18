import { useState } from "react";

const initialAnnouncements = [
  {
    id: 1,
    title: "Mid-Semester Examinations Schedule",
    content:
      "All mid-semester examinations will be conducted from March 15-22, 2025. Faculty members are requested to submit question papers by March 10.",
    author: "Dr. Sarah Johnson",
    department: "Academic Affairs",
    date: "2 hours ago",
  },
  {
    id: 2,
    title: "New Online Learning Platform Integration",
    content:
      "We are excited to announce the integration of a new interactive learning platform. Training sessions for faculty will be held next week.",
    author: "Prof. Michael Chen",
    department: "IT Department",
    date: "5 hours ago",
  },
  {
    id: 3,
    title: "Student Performance Review Meeting",
    content:
      "Department heads are invited to attend the quarterly student performance review meeting on Friday at 2 PM in the conference hall.",
    author: "Dr. Emily Rodriguez",
    department: "Administration",
    date: "1 day ago",
  },
  {
    id: 4,
    title: "Library Hours Extended",
    content:
      "Starting next week, the library will be open until 10 PM on weekdays to accommodate student study needs during exam season.",
    author: "Prof. David Wilson",
    department: "Library Services",
    date: "2 days ago",
  },
];

export function Announcements() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingAnnouncement(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl mb-2">Announcements</h1>
          <p className="text-gray-400">
            Create and manage announcements for faculty and students
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90"
        >
          + Create Announcement
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search announcements..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
      />

      {/* Announcement List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <span className="text-purple-400 text-sm font-semibold block mb-1">
                  Important
                </span>
                <h3 className="text-white text-lg">
                  {announcement.title}
                </h3>
              </div>

              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => handleEdit(announcement)}
                  className="px-3 py-1 text-blue-400 hover:bg-blue-500/10 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="px-3 py-1 text-red-400 hover:bg-red-500/10 rounded"
                >
                  Delete
                </button>
              </div>
            </div>

            <p className="text-gray-400 mb-4">
              {announcement.content}
            </p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-gray-300">
                  {announcement.author}
                </span>
                <span>|</span>
                <span>{announcement.department}</span>
              </div>
              <span className="text-gray-500">{announcement.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-white text-xl mb-4">
              {editingAnnouncement ? "Edit Announcement" : "Create New Announcement"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Announcement Title"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />

              <textarea
                rows={6}
                placeholder="Announcement Content"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white resize-none"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Author Name"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Department"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-800 text-gray-300 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg"
                >
                  {editingAnnouncement ? "Update" : "Publish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
