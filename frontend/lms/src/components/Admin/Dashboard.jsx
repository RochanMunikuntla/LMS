import { StatCard } from "./StatCard";
import { AnnouncementCard } from "./AnnouncementCard";

const stats = [
  { label: "Total Students", value: "2,847", trend: "+12%", color: "blue" },
  { label: "Total Faculty", value: "156", trend: "+5%", color: "purple" },
  { label: "Active Courses", value: "89", trend: "+8%", color: "green" },
  { label: "Enrollment Rate", value: "94%", trend: "+3%", color: "orange" },
];

const announcements = [
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
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-white text-3xl mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Welcome back, Admin. Here's what's happening today.
        </p>
      </div>

      {/* Announcements */}
      <div>
        <h2 className="text-white text-xl mb-4">Recent Announcements</h2>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div>
        <h2 className="text-white text-xl mb-4">Overview Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}
