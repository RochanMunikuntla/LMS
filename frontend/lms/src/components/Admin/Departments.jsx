import { useState } from "react";

const initialDepartments = [
  {
    id: 1,
    name: "Computer Science",
    head: "Dr. Sarah Johnson",
    facultyCount: 28,
    studentCount: 542,
    coursesOffered: 24,
  },
  {
    id: 2,
    name: "Engineering",
    head: "Prof. Michael Chen",
    facultyCount: 35,
    studentCount: 678,
    coursesOffered: 32,
  },
  {
    id: 3,
    name: "Business Administration",
    head: "Dr. Emily Rodriguez",
    facultyCount: 22,
    studentCount: 445,
    coursesOffered: 18,
  },
  {
    id: 4,
    name: "Mathematics",
    head: "Prof. David Wilson",
    facultyCount: 18,
    studentCount: 312,
    coursesOffered: 15,
  },
  {
    id: 5,
    name: "Arts & Design",
    head: "Dr. Lisa Anderson",
    facultyCount: 15,
    studentCount: 289,
    coursesOffered: 12,
  },
];

export function Departments() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this department?")) {
      setDepartments(departments.filter((d) => d.id !== id));
    }
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingDepartment(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl mb-2">Departments</h1>
          <p className="text-gray-400">
            Manage academic departments and their details
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90"
        >
          + Add Department
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search departments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
      />

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <div
            key={department.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
          >
            {/* Top */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-white text-lg">{department.name}</h3>

              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => handleEdit(department)}
                  className="px-3 py-1 text-blue-400 hover:bg-blue-500/10 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(department.id)}
                  className="px-3 py-1 text-red-400 hover:bg-red-500/10 rounded"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Head */}
            <div className="mb-4 pb-4 border-b border-gray-800">
              <div className="text-gray-400 text-sm mb-1">
                Department Head
              </div>
              <div className="text-white">{department.head}</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-400 mb-1">Faculty</div>
                <div className="text-white">{department.facultyCount}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Students</div>
                <div className="text-white">{department.studentCount}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Courses</div>
                <div className="text-white">{department.coursesOffered}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-white text-xl mb-4">
              {editingDepartment ? "Edit Department" : "Add New Department"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Department Name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Department Head"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />

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
                  {editingDepartment ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
