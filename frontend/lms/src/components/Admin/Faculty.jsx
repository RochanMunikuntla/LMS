import { useState } from "react";

const initialFaculty = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    facultyId: "FAC001",
    email: "sarah.j@faculty.edu",
    department: "Computer Science",
    coursesTeaching: [
      "Data Structures",
      "Machine Learning",
      "AI Fundamentals",
    ],
    dateOfJoining: "2020-08-15",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    facultyId: "FAC002",
    email: "michael.c@faculty.edu",
    department: "Engineering",
    coursesTeaching: ["Robotics", "Control Systems"],
    dateOfJoining: "2019-01-10",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    facultyId: "FAC003",
    email: "emily.r@faculty.edu",
    department: "Mathematics",
    coursesTeaching: ["Applied Math", "Statistics", "Calculus"],
    dateOfJoining: "2021-03-20",
  },
  {
    id: 4,
    name: "Prof. David Wilson",
    facultyId: "FAC004",
    email: "david.w@faculty.edu",
    department: "Business Administration",
    coursesTeaching: ["Marketing", "Business Strategy"],
    dateOfJoining: "2018-09-05",
  },
];

export function Faculty() {
  const [faculty, setFaculty] = useState(initialFaculty);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);

  const filteredFaculty = faculty.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.facultyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this faculty member?")) {
      setFaculty(faculty.filter((f) => f.id !== id));
    }
  };

  const handleEdit = (member) => {
    setEditingFaculty(member);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingFaculty(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl mb-2">Faculty</h1>
          <p className="text-gray-400">
            Manage faculty members and their information
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90"
        >
          + Add Faculty
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search faculty..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
      />

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-gray-400 text-sm">
                Name
              </th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm">
                Faculty ID
              </th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm">
                Department
              </th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm">
                Courses Teaching
              </th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm">
                DOJ
              </th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {filteredFaculty.map((member) => (
              <tr
                key={member.id}
                className="hover:bg-gray-800/30 transition-colors"
              >
                <td className="px-6 py-4 text-white">
                  {member.name}
                </td>

                <td className="px-6 py-4 text-gray-300">
                  {member.facultyId}
                </td>

                <td className="px-6 py-4 text-gray-400 text-sm">
                  Email: {member.email}
                </td>

                <td className="px-6 py-4 text-gray-300">
                  {member.department}
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {member.coursesTeaching.map((course, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded text-xs"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-400">
                  {member.dateOfJoining}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2 text-sm">
                    <button
                      onClick={() => handleEdit(member)}
                      className="px-3 py-1 text-blue-400 hover:bg-blue-500/10 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="px-3 py-1 text-red-400 hover:bg-red-500/10 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-white text-xl mb-4">
              {editingFaculty
                ? "Edit Faculty Member"
                : "Add New Faculty Member"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Faculty Name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Faculty ID"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Department"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Courses Teaching (comma separated)"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input
                type="date"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />

              {/* Upload */}
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center">
                <div className="text-gray-400 text-sm">
                  Upload Excel File
                </div>
                <div className="text-gray-500 text-xs mb-2">
                  (.xlsx or .xls)
                </div>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  className="w-full text-gray-400 text-sm"
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
                  {editingFaculty ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
