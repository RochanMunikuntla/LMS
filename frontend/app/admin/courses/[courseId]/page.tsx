"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { AdminNavbar } from "@/components/admin/navbar"
import { useAdminNavigation } from "@/lib/navigation-handlers"
import { ArrowLeft, Edit2, Trash2, BookOpen, Users, User } from "lucide-react"

interface Course {
  id: number
  title: string
  code: string
  department: string
  instructor: string
  instructorId: number
  enrolledStudents: number
  semester: string
  description: string
  credits: number
  schedule: string
}

// Sample data - will be replaced by backend
const coursesData: Record<string, Course> = {
  "1": {
    id: 1,
    title: "Web Development Fundamentals",
    code: "CS-101",
    department: "Computer Science",
    instructor: "Dr. Jane Smith",
    instructorId: 1,
    enrolledStudents: 45,
    semester: "Fall 2024",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    credits: 3,
    schedule: "Mon, Wed, Fri 10:00 AM - 11:00 AM",
  },
  "2": {
    id: 2,
    title: "Advanced React",
    code: "CS-205",
    department: "Computer Science",
    instructor: "Dr. Jane Smith",
    instructorId: 1,
    enrolledStudents: 32,
    semester: "Fall 2024",
    description: "Master React patterns, hooks, and advanced state management techniques.",
    credits: 3,
    schedule: "Tue, Thu 2:00 PM - 3:30 PM",
  },
  "3": {
    id: 3,
    title: "Database Design",
    code: "CS-301",
    department: "Computer Science",
    instructor: "Prof. Robert Brown",
    instructorId: 2,
    enrolledStudents: 28,
    semester: "Spring 2025",
    description: "SQL and database architecture for scalable applications.",
    credits: 4,
    schedule: "Mon, Wed 1:00 PM - 2:30 PM",
  },
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params?.courseId as string
  const course = coursesData[courseId]

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { goToCourses, goToEditCourse, goToFacultyDetail } = useAdminNavigation()

  if (!course) {
    return (
      <>
        <AdminNavbar />
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-gray-600">Course not found</p>
        </main>
      </>
    )
  }

  const handleDelete = () => {
    // Backend will handle the actual deletion
    goToCourses()
  }

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-white px-8 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/admin/courses"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Courses
            </Link>
            <div className="mt-4 h-px bg-gray-200" />
          </div>

          {/* Course Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-[12px] bg-amber-100 p-3">
                  <BookOpen className="h-6 w-6 text-amber-600" />
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  {course.code}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              <p className="mt-2 text-gray-600">{course.description}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => goToEditCourse(course.id)}
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

          {/* Course Info Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Course Details */}
            <div className="rounded-[20px] border border-gray-200 bg-white p-8">
              <h2 className="mb-6 text-lg font-bold text-gray-900">Course Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Department</label>
                  <p className="mt-1 text-gray-900">{course.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Semester</label>
                  <p className="mt-1 text-gray-900">{course.semester}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Credits</label>
                  <p className="mt-1 text-gray-900">{course.credits}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Schedule</label>
                  <p className="mt-1 text-gray-900">{course.schedule}</p>
                </div>
              </div>
            </div>

            {/* Instructor & Students */}
            <div className="space-y-6">
              {/* Instructor Card */}
              <button
                onClick={() => goToFacultyDetail(course.instructorId)}
                className="w-full rounded-[20px] border border-gray-200 bg-white p-6 text-left transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-[12px] bg-emerald-100 p-3">
                    <User className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Instructor</p>
                    <p className="text-lg font-semibold text-gray-900">{course.instructor}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs font-medium text-blue-600">View Profile</p>
              </button>

              {/* Enrollment Stats */}
              <div className="rounded-[20px] border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-[12px] bg-blue-100 p-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Enrolled Students</p>
                    <p className="text-3xl font-bold text-gray-900">{course.enrolledStudents}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Course Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-[20px] bg-white p-8">
            <h2 className="text-xl font-bold text-gray-900">Delete Course</h2>
            <p className="mt-4 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{course.title}</span>? This action cannot
              be undone and will remove all associated data.
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
