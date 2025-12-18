const courses = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Programming",
    department: "Computer Science",
    students: 45,
    schedule: "Mon, Wed, Fri - 9:00 AM",
    color: "blue",
  },
  {
    id: 2,
    code: "CS201",
    name: "Data Structures & Algorithms",
    department: "Computer Science",
    students: 38,
    schedule: "Tue, Thu - 10:30 AM",
    color: "purple",
  },
  {
    id: 3,
    code: "CS301",
    name: "Database Management Systems",
    department: "Computer Science",
    students: 42,
    schedule: "Mon, Wed - 2:00 PM",
    color: "green",
  },
  {
    id: 4,
    code: "CS302",
    name: "Operating Systems",
    department: "Computer Science",
    students: 40,
    schedule: "Tue, Thu - 3:30 PM",
    color: "orange",
  },
  {
    id: 5,
    code: "CS401",
    name: "Machine Learning",
    department: "Computer Science",
    students: 35,
    schedule: "Wed, Fri - 11:00 AM",
    color: "blue",
  },
  {
    id: 6,
    code: "CS402",
    name: "Web Development",
    department: "Computer Science",
    students: 50,
    schedule: "Mon, Thu - 4:00 PM",
    color: "purple",
  },
];

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600",
};

export function FacultyCourses({ onSelectCourse }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-white text-3xl mb-2">My Courses</h1>
        <p className="text-gray-400">
          Manage your courses, assignments, and materials.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all cursor-pointer group"
          >
            {/* Top Banner */}
            <div
              className={`h-32 bg-gradient-to-br ${colorClasses[course.color]} p-6 flex items-center justify-center`}
            >
              <span className="text-white text-4xl font-semibold opacity-80">
                {course.code}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              <span className="text-gray-400 text-sm">{course.code}</span>
              <h3 className="text-white text-lg mt-1 mb-1">
                {course.name}
              </h3>

              <p className="text-gray-500 text-sm mb-4">
                {course.department}
              </p>

              <div className="space-y-2 text-sm text-gray-400">
                <div>
                  <span className="font-medium text-gray-300">
                    Students:
                  </span>{" "}
                  {course.students}
                </div>
                <div>
                  <span className="font-medium text-gray-300">
                    Schedule:
                  </span>{" "}
                  {course.schedule}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
