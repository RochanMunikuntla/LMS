import { useState } from "react";

const initialStudents = [
  {
    id: 1,
    name: "John Smith",
    rollNo: "CS2023001",
    email: "john.smith@student.edu",
    department: "Computer Science",
    coursesEnrolled: [
      "Data Structures",
      "Machine Learning",
      "Database Systems",
    ],
    yearOfStudy: "2nd Year",
  },
  {
    id: 2,
    name: "Emma Johnson",
    rollNo: "BA2023045",
    email: "emma.j@student.edu",
    department: "Business Administration",
    coursesEnrolled: ["Marketing", "Finance", "Management"],
    yearOfStudy: "3rd Year",
  },
  {
    id: 3,
    name: "Michael Brown",
    rollNo: "ENG2024012",
    email: "michael.b@student.edu",
    department: "Engineering",
    coursesEnrolled: ["Robotics", "Control Systems"],
    yearOfStudy: "1st Year",
  },
  {
    id: 4,
    name: "Sarah Davis",
    rollNo: "MATH2023089",
    email: "sarah.d@student.edu",
    department: "Mathematics",
    coursesEnrolled: ["Applied Math", "Statistics", "Calculus"],
    yearOfStudy: "2nd Year",
  },
];

export function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl mb-2">Students</h1>
          <p className="text-gray-400">
            Manage student records and information
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90"
        >
          + Add Student
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search students..."
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
                Roll No
              </th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm">
                Department
              </th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm">
                Courses Enrolled
              </th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm">
                Year of Study
              </th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-800/30 transition-colors"
              >
                <td className="px-6 py-4 text-white">
                  {student.name}
                </td>

                <td className="px-6 py-4 text-gray-300">
                  {student.rollNo}
                </td>

                <td className="px-6 py-4 text-gray-400 text-sm">
                  Email: {student.email}
                </td>

                <td className="px-6 py-4 text-gray-300">
                  {student.department}
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {student.coursesEnrolled.map((course, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded text-xs"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-300">
                  {student.yearOfStudy}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2 text-sm">
                    <button
                      onClick={() => handleEdit(student)}
                      className="px-3 py-1 text-blue-400 hover:bg-blue-500/10 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
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
              {editingStudent ? "Edit Student" : "Add New Student"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Student Name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Roll Number"
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
                placeholder="Courses Enrolled (comma separated)"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Year of Study"
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
                  {editingStudent ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
