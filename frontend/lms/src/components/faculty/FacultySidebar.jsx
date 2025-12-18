import { LayoutDashboard, Megaphone, BookOpen, User, Mail } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'courses', label: 'Courses', icon: BookOpen },
];

export function FacultySidebar({ currentPage, setCurrentPage }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-white text-2xl mb-1">Ronkit</h1>
        <p className="text-gray-400 text-sm">Faculty Dashboard</p>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Faculty Profile Section */}
      <div className="mt-auto pt-6 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-sm truncate">Dr. Emma Wilson</h3>
              <p className="text-gray-400 text-xs">Faculty Member</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Mail className="w-3 h-3" />
            <span className="truncate">emma.wilson@ronkit.edu</span>
          </div>
        </div>
      </div>
    </aside>
  );
}