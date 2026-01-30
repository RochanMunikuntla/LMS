"use client"

import { useState } from "react"
import { AdminNavbar } from "@/components/admin/navbar"
import { useAdminNavigation } from "@/lib/navigation-handlers"
import { Plus, Search, Trash2, Edit2, BookOpen } from "lucide-react"
import { useSearchParams, Suspense } from "next/navigation"
import Loading from "./loading"

interface Course {
  id: number
  title: string
  code: string
  department: string
  instructor: string
  enrolledStudents: number
  semester: string
}

// Sample data - will be replaced by backend
const initialCourses: Course[] = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    code: "CS-101",
    department: "Computer Science",
    instructor: "Dr. Jane Smith",
    enrolledStudents: 45,
    semester: "Fall 2024",
  },
  {
    id: 2,
    title: "Advanced React",
    code: "CS-205",
    department: "Computer Science",
    instructor: "Dr. Jane Smith",
    enrolledStudents: 32,
    semester: "Fall 2024",
  },
  {
    id: 3,
    title: "Database Design",
    code: "CS-301",
    department: "Computer Science",
    instructor: "Prof. Robert Brown",
    enrolledStudents: 28,
    semester: "Spring 2025",
  },
  {
    id: 4,
    title: "Circuit Analysis",
    code: "EE-101",
    department: "Electrical Engineering",
    instructor: "Prof. Michael Davis",
    enrolledStudents: 35,
    semester: "Fall 2024",
  },
  {
    id: 5,
    title: "Linear Algebra",
    code: "MATH-201",
    department: "Mathematics",
    instructor: "Dr. Emily Chen",
    enrolledStudents: 40,
    semester: "Spring 2025",
  },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null)
  const { goToCourseDetail, goToCreateCourse, goToEditCourse } = useAdminNavigation()
  const searchParams = useSearchParams()

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (courseToDelete) {
      setCourses(courses.filter((c) => c.id !== courseToDelete.id))
      setDeleteModalOpen(false)
      setCourseToDelete(null)
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <>
        <AdminNavbar />
        <main className="min-h-screen bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Courses</h1>
                <p className="mt-3 text-lg text-gray-600">
                  Manage all courses across departments
                </p>
              </div>
              <button
                onClick={goToCreateCourse}
                className="flex items-center gap-2 rounded-[10px] bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                <Plus className="h-5 w-5" />
                Create Course
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, code, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-[10px] border border-gray-300 py-3 pl-12 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => goToCourseDetail(course.id)}
                  className="rounded-[20px] border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md cursor-pointer"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="rounded-[12px] bg-amber-100 p-3">
                      <BookOpen className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          goToEditCourse(course.id)
                        }}
                        className="rounded-[8px] bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteClick(course)
                        }}
                        className="rounded-[8px] bg-red-50 p-2 text-red-600 hover:bg-red-100"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {course.code}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{course.department}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-600">{course.instructor}</span>
                    <span className="text-gray-500">{course.enrolledStudents} students</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-gray-400">{course.semester}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="rounded-[20px] border border-gray-200 bg-white p-12 text-center">
                <p className="text-gray-600">No courses found</p>
              </div>
            )}
          </div>
        </main>

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && courseToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-[20px] bg-white p-8">
              <h2 className="text-xl font-bold text-gray-900">Confirm Delete</h2>
              <p className="mt-4 text-gray-600">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{courseToDelete.title}</span>? This
                action cannot be undone.
              </p>
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-1 rounded-[10px] border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 rounded-[10px] bg-red-600 py-3 font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </Suspense>
  )
}
