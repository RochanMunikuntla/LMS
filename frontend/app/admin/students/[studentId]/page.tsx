"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { AdminNavbar } from "@/components/admin/navbar"
import { useAdminNavigation } from "@/lib/navigation-handlers"
import { ArrowLeft, Edit2, Trash2, Plus, X } from "lucide-react"

interface Course {
  id: number
  title: string
  code: string
}

interface Student {
  id: number
  name: string
  email: string
  studentId: string
  phone: string
  department: string
  enrolledCourses: Course[]
  joinedDate: string
  address: string
}

// Sample data - will be replaced by backend
const studentsData: Record<string, Student> = {
  "1": {
    id: 1,
    name: "John Doe",
    email: "john.doe@university.edu",
    studentId: "STU001",
    phone: "+1 234 567 8900",
    department: "Computer Science",
    enrolledCourses: [
      { id: 1, title: "Web Development Fundamentals", code: "CS-101" },
      { id: 2, title: "Advanced React", code: "CS-205" },
      { id: 3, title: "Database Design", code: "CS-301" },
    ],
    joinedDate: "2024-08-15",
    address: "123 University Ave, Campus City",
  },
  "2": {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    studentId: "STU002",
    phone: "+1 234 567 8901",
    department: "Electrical Engineering",
    enrolledCourses: [
      { id: 4, title: "Circuit Analysis", code: "EE-101" },
      { id: 5, title: "Digital Systems", code: "EE-201" },
    ],
    joinedDate: "2024-08-15",
    address: "456 College St, Campus City",
  },
}

const availableCourses: Course[] = [
  { id: 6, title: "Cloud Computing", code: "CS-401" },
  { id: 7, title: "Machine Learning", code: "CS-402" },
  { id: 8, title: "Network Security", code: "CS-403" },
]

const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mathematics",
  "Physics",
  "Chemistry",
]

export default function StudentDetailPage() {
  const params = useParams()
  const studentId = params?.studentId as string
  const student = studentsData[studentId]

  const [courses, setCourses] = useState<Course[]>(student?.enrolledCourses || [])
  const [showAddCourseModal, setShowAddCourseModal] = useState(false)
  const [showRemoveCourseModal, setShowRemoveCourseModal] = useState(false)
  const [showChangeDeptModal, setShowChangeDeptModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedDept, setSelectedDept] = useState(student?.department || "")
  const [courseToRemove, setCourseToRemove] = useState<Course | null>(null)

  const { goToStudents, goToEditStudent } = useAdminNavigation()

  if (!student) {
    return (
      <>
        <AdminNavbar />
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-gray-600">Student not found</p>
        </main>
      </>
    )
  }

  const handleAddCourse = () => {
    if (selectedCourse && !courses.find((c) => c.id === selectedCourse.id)) {
      setCourses([...courses, selectedCourse])
      setShowAddCourseModal(false)
      setSelectedCourse(null)
    }
  }

  const handleRemoveCourse = () => {
    if (courseToRemove) {
      setCourses(courses.filter((c) => c.id !== courseToRemove.id))
      setShowRemoveCourseModal(false)
      setCourseToRemove(null)
    }
  }

  const handleChangeDepartment = () => {
    // Backend will handle the actual change
    setShowChangeDeptModal(false)
  }

  const handleDelete = () => {
    // Backend will handle the actual deletion
    goToStudents()
  }

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-white px-8 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/admin/students"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Students
            </Link>
            <div className="mt-4 h-px bg-gray-200" />
          </div>

          {/* Student Header */}
          <div className="mb-8 flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                {student.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
                <p className="mt-1 text-gray-600">{student.email}</p>
                <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {student.studentId}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => goToEditStudent(student.id)}
                className="flex items-center gap-2 rounded-[10px] bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 rounded-[10px] bg-red-50 px-4 py-2 font-medium text-red-600 hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>

          {/* Student Info Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Personal Information */}
            <div className="rounded-[20px] border border-gray-200 bg-white p-8">
              <h2 className="mb-6 text-lg font-bold text-gray-900">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  <p className="mt-1 text-gray-900">{student.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Address</label>
                  <p className="mt-1 text-gray-900">{student.address}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Joined Date</label>
                  <p className="mt-1 text-gray-900">{student.joinedDate}</p>
                </div>
              </div>
            </div>

            {/* Department */}
            <div className="rounded-[20px] border border-gray-200 bg-white p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Department</h2>
                <button
                  onClick={() => setShowChangeDeptModal(true)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Change
                </button>
              </div>
              <div className="rounded-[12px] bg-indigo-50 p-4">
                <p className="font-semibold text-indigo-900">{student.department}</p>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="mt-8 rounded-[20px] border border-gray-200 bg-white p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Enrolled Courses</h2>
              <button
                onClick={() => setShowAddCourseModal(true)}
                className="flex items-center gap-2 rounded-[10px] bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Course
              </button>
            </div>
            <div className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between rounded-[12px] border border-gray-200 p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">{course.title}</p>
                    <p className="text-sm text-gray-500">{course.code}</p>
                  </div>
                  <button
                    onClick={() => {
                      setCourseToRemove(course)
                      setShowRemoveCourseModal(true)
                    }}
                    className="rounded-[8px] bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    title="Remove Course"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {courses.length === 0 && (
                <p className="text-center text-gray-500 py-4">No courses enrolled</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-[20px] bg-white p-8">
            <h2 className="text-xl font-bold text-gray-900">Add Course</h2>
            <p className="mt-2 text-gray-600">Select a course to enroll the student</p>
            <div className="mt-6 space-y-2">
              {availableCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`w-full rounded-[12px] border p-4 text-left transition-colors ${
                    selectedCourse?.id === course.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-medium text-gray-900">{course.title}</p>
                  <p className="text-sm text-gray-500">{course.code}</p>
                </button>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowAddCourseModal(false)}
                className="flex-1 rounded-[10px] border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCourse}
                disabled={!selectedCourse}
                className="flex-1 rounded-[10px] bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Course Modal */}
      {showRemoveCourseModal && courseToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-[20px] bg-white p-8">
            <h2 className="text-xl font-bold text-gray-900">Remove Course</h2>
            <p className="mt-4 text-gray-600">
              Are you sure you want to remove{" "}
              <span className="font-semibold">{courseToRemove.title}</span> from this
              student's enrollment?
            </p>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowRemoveCourseModal(false)}
                className="flex-1 rounded-[10px] border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveCourse}
                className="flex-1 rounded-[10px] bg-red-600 py-3 font-medium text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Department Modal */}
      {showChangeDeptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-[20px] bg-white p-8">
            <h2 className="text-xl font-bold text-gray-900">Change Department</h2>
            <p className="mt-2 text-gray-600">Select a new department for the student</p>
            <div className="mt-6 space-y-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`w-full rounded-[12px] border p-4 text-left transition-colors ${
                    selectedDept === dept
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-medium text-gray-900">{dept}</p>
                </button>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowChangeDeptModal(false)}
                className="flex-1 rounded-[10px] border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleChangeDepartment}
                className="flex-1 rounded-[10px] bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Student Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-[20px] bg-white p-8">
            <h2 className="text-xl font-bold text-gray-900">Delete Student</h2>
            <p className="mt-4 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{student.name}</span>? This action cannot
              be undone.
            </p>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-[10px] border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-[10px] bg-red-600 py-3 font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
