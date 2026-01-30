"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { FacultyNavbar } from "@/components/faculty/navbar"
import { ArrowLeft } from "lucide-react"

const coursesData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Web Development Fundamentals",
    code: "CS-101",
    students: 45,
    description: "Learn HTML, CSS, and JavaScript basics",
    semester: "Fall 2024",
  },
  "2": {
    id: 2,
    title: "Advanced React",
    code: "CS-205",
    students: 32,
    description: "Master React patterns and hooks",
    semester: "Fall 2024",
  },
  "3": {
    id: 3,
    title: "Database Design",
    code: "CS-301",
    students: 28,
    description: "SQL and database architecture",
    semester: "Spring 2025",
  },
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params?.courseId as string
  const course = coursesData[courseId]

  if (!course) {
    return (
      <>
        <FacultyNavbar />
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-gray-600">Course not found</p>
        </main>
      </>
    )
  }

  return (
    <>
      <FacultyNavbar />
      <main className="min-h-screen bg-white px-8 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Back Button - Positioned like the screenshot */}
          <div className="mb-8">
            <Link
              href="/faculty/courses"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Courses
            </Link>
            <div className="mt-4 h-px bg-gray-200" />
          </div>

          {/* Course Header */}
          <div className="mb-12">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                {course.code}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <p className="mt-2 text-gray-600">{course.description}</p>
            <div className="mt-4 flex gap-8 text-sm text-gray-600">
              <span>{course.semester}</span>
              <span>{course.students} Enrolled Students</span>
            </div>
          </div>

          {/* Course Management Sections */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Assignments */}
            <div className="rounded-[20px] border border-gray-200 bg-white p-8">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Assignments</h2>
              <p className="mb-6 text-sm text-gray-600">
                Create and manage assignments for your students.
              </p>
              <div className="flex gap-3">
                <Link
                  href={`/faculty/courses/${courseId}/assignments`}
                  className="flex-1 rounded-[10px] bg-gray-50 px-4 py-3 text-center text-sm font-medium text-blue-600 hover:bg-gray-100 border border-gray-200"
                >
                  View All
                </Link>
                <Link
                  href={`/faculty/courses/${courseId}/assignments/create`}
                  className="flex-1 rounded-[10px] bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  Create New
                </Link>
              </div>
            </div>

            {/* Quizzes */}
            <div className="rounded-[20px] border border-gray-200 bg-white p-8">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Quizzes</h2>
              <p className="mb-6 text-sm text-gray-600">
                Create and manage quizzes for your students.
              </p>
              <div className="flex gap-3">
                <Link
                  href={`/faculty/courses/${courseId}/quiz`}
                  className="flex-1 rounded-[10px] bg-gray-50 px-4 py-3 text-center text-sm font-medium text-blue-600 hover:bg-gray-100 border border-gray-200"
                >
                  View All
                </Link>
                <Link
                  href={`/faculty/courses/${courseId}/quiz/create`}
                  className="flex-1 rounded-[10px] bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  Create New
                </Link>
              </div>
            </div>

            {/* Materials */}
            <div className="rounded-[20px] border border-gray-200 bg-white p-8">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Materials</h2>
              <p className="mb-6 text-sm text-gray-600">
                Upload and manage course materials.
              </p>
              <div className="flex gap-3">
                <Link
                  href={`/faculty/courses/${courseId}/materials`}
                  className="flex-1 rounded-[10px] bg-gray-50 px-4 py-3 text-center text-sm font-medium text-blue-600 hover:bg-gray-100 border border-gray-200"
                >
                  View All
                </Link>
                <Link
                  href={`/faculty/courses/${courseId}/materials/create`}
                  className="flex-1 rounded-[10px] bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  Upload New
                </Link>
              </div>
            </div>

            {/* Announcements */}
            <div className="rounded-[20px] border border-gray-200 bg-white p-8">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Announcements</h2>
              <p className="mb-6 text-sm text-gray-600">
                Post announcements to your class.
              </p>
              <div className="flex gap-3">
                <Link
                  href={`/faculty/courses/${courseId}/announcements`}
                  className="flex-1 rounded-[10px] bg-gray-50 px-4 py-3 text-center text-sm font-medium text-blue-600 hover:bg-gray-100 border border-gray-200"
                >
                  View All
                </Link>
                <Link
                  href={`/faculty/courses/${courseId}/announcements/create`}
                  className="flex-1 rounded-[10px] bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  Post New
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
