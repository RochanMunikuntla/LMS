import { FacultyStatCard } from "./FacultyStatCard";
import { FacultyAnnouncementCard } from "./FacultyAnnouncementCard";

const stats = [
  { label: "My Courses", value: "6", trend: "Active", color: "blue" },
  { label: "Assignments", value: "24", trend: "Posted", color: "purple" },
  { label: "Materials", value: "48", trend: "Uploaded", color: "green" },
  { label: "Students", value: "342", trend: "Enrolled", color: "orange" },
];

const announcements = [
  {
    id: 1,
    title: "Mid-Semester Examinations Schedule",
    content:
      "All mid-semester examinations will be conducted from March 15-22, 2025. Faculty members are requested to submit question papers by March 10.",
    author: "Admin - Dr. Sarah Johnson",
    department: "Academic Affairs",
    date: "2 hours ago",
  },
  {
    id: 2,
    title: "New Online Learning Platform Integration",
    content:
      "We are excited to announce the integration of a new interactive learning platform. Training sessions for faculty will be held next week.",
    author: "Admin - Prof. Michael Chen",
    department: "IT Department",
    date: "5 hours ago",
  },
  {
    id: 3,
    title: "Faculty Meeting This Friday",
    content:
      "All faculty members are requested to attend the department meeting this Friday at 3 PM in Conference Hall A to discuss upcoming semester planning.",
    author: "Admin - Dr. Emily Rodriguez",
    department: "Administration",
    date: "1 day ago",
  },
];

export function FacultyDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-white text-3xl mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Welcome back! Here's an overview of your activities.
        </p>
      </div>

      {/* Stats */}
      <div>
        <h2 className="text-white text-xl mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <FacultyStatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Announcements */}
      <div>
        <h2 className="text-white text-xl mb-4">Recent Announcements</h2>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <FacultyAnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
