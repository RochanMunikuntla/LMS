import { useState } from "react";
import { FacultyAnnouncementCard } from "./FacultyAnnouncementCard";
import { AddAnnouncementDialog } from "./AddAnnouncementDialog";

// Only announcements created by this faculty member
const initialAnnouncements = [];

export function FacultyAnnouncements() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showDialog, setShowDialog] = useState(false);

  const handleAddAnnouncement = (announcement) => {
    setAnnouncements([{ ...announcement, id: Date.now() }, ...announcements]);
    setShowDialog(false);
  };

  const handleDeleteAnnouncement = (id) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl mb-2">My Announcements</h1>
          <p className="text-gray-400">
            Manage announcements for your students.
          </p>
        </div>

        <button
          onClick={() => setShowDialog(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + Add Announcement
        </button>
      </div>

      {/* Empty State */}
      {announcements.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
          <p className="text-gray-400 mb-4">
            You haven't created any announcements yet
          </p>
          <button
            onClick={() => setShowDialog(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + Create Your First Announcement
          </button>
        </div>
      ) : (
        /* Announcements List */
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="relative">
              <FacultyAnnouncementCard announcement={announcement} />

              {/* Delete Button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                  className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  title="Delete Announcement"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Dialog */}
      {showDialog && (
        <AddAnnouncementDialog
          onClose={() => setShowDialog(false)}
          onAdd={handleAddAnnouncement}
        />
      )}
    </div>
  );
}
