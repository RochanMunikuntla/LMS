const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "announcements", label: "Announcements" },
  { id: "students", label: "Students" },
  { id: "faculty", label: "Faculty" },
  { id: "departments", label: "Departments" },
  { id: "courses", label: "Courses" },
];

export function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">R</span>
          </div>
          <h1 className="text-white text-xl">Ronkit</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-gray-400 font-semibold">A</span>
          </div>
          <div>
            <div className="text-white text-sm">Admin</div>
            <div className="text-gray-500 text-xs">
              admin@ronkit.edu
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
