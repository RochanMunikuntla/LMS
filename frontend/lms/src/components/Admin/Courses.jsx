import { useState } from "react";

const initialCourses = [
  {
    id: 1,
    name: "Data Structures & Algorithms",
    code: "CS301",
    department: "Computer Science",
    faculty: "Dr. Sarah Johnson",
    credits: 4,
    duration: "16 weeks",
    status: "active",
  },
  {
    id: 2,
    name: "Machine Learning Fundamentals",
    code: "CS402",
    department: "Computer Science",
    faculty: "Dr. Sarah Johnson",
    credits: 3,
    duration: "12 weeks",
    status: "active",
  },
  {
    id: 3,
    name: "Robotics Engineering",
    code: "ENG305",
    department: "Engineering",
    faculty: "Prof. Michael Chen",
    credits: 4,
    duration: "16 weeks",
    status: "active",
  },
  {
    id: 4,
    name: "Applied Mathematics",
    code: "MATH201",
    department: "Mathematics",
    faculty: "Dr. Emily Rodriguez",
    credits: 3,
    duration: "14 weeks",
    status: "active",
  },
  {
    id: 5,
    name: "Digital Marketing Strategy",
    code: "BUS401",
    department: "Business Administration",
    faculty: "Prof. David Wilson",
    credits: 3,
    duration: "12 weeks",
    status: "upcoming",
  },
];

export function Courses() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingCourse(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl mb-2">Courses</h1>
          <p className="text-gray-400">
            Manage courses and faculty assignments
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90"
        >
          + Add Course
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
      />

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
          >
            {/* Top */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white text-lg">{course.name}</h3>

                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      course.status === "active"
                        ? "bg-green-500/10 border border-green-500/30 text-green-400"
                        : course.status === "upcoming"
                        ? "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                        : "bg-gray-500/10 border border-gray-500/30 text-gray-400"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span>{course.code}</span>
                  <span>|</span>
                  <span>{course.credits} Credits</span>
                </div>
              </div>

              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => handleEdit(course)}
                  className="px-3 py-1 text-blue-400 hover:bg-blue-500/10 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="px-3 py-1 text-red-400 hover:bg-red-500/10 rounded"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm">
              <div className="text-gray-300">
                Instructor:{" "}
                <span className="text-gray-400">{course.faculty}</span>
              </div>

              <div className="text-gray-300">
                Duration:{" "}
                <span className="text-gray-400">{course.duration}</span>
              </div>

              <div className="text-gray-400 pt-2">
                Department: {course.department}
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
              {editingCourse ? "Edit Course" : "Add New Course"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Course Name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Course Code"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white">
                <option>Select Department</option>
                <option>Computer Science</option>
                <option>Engineering</option>
                <option>Mathematics</option>
                <option>Business Administration</option>
              </select>
              <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white">
                <option>Assign Faculty</option>
                <option>Dr. Sarah Johnson</option>
                <option>Prof. Michael Chen</option>
                <option>Dr. Emily Rodriguez</option>
                <option>Prof. David Wilson</option>
              </select>
              <input
                type="number"
                placeholder="Credits"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Duration (e.g., 16 weeks)"
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
                  {editingCourse ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
