"use client"

import Link from "next/link"
import { FacultyNavbar } from "@/components/faculty/navbar"
import { BookOpen, Users, AlertCircle, Clock } from "lucide-react"
import { useFacultyNavigation } from "@/lib/navigation-handlers"

const facultyCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    code: "CS-101",
    students: 45,
    description: "Learn HTML, CSS, and JavaScript basics",
  },
  {
    id: 2,
    title: "Advanced React",
    code: "CS-205",
    students: 32,
    description: "Master React patterns and hooks",
  },
  {
    id: 3,
    title: "Database Design",
    code: "CS-301",
    students: 28,
    description: "SQL and database architecture",
  },
]

const pendingReviews = [
  {
    id: 1,
    course: "Web Development Fundamentals",
    studentName: "John Doe",
    assignment: "Build a Todo App",
    type: "assignment",
    submittedDate: "2024-02-14",
  },
  {
    id: 2,
    course: "Advanced React",
    studentName: "Sarah Smith",
    assignment: "React Hooks Project",
    type: "assignment",
    submittedDate: "2024-02-13",
  },
  {
    id: 3,
    course: "Database Design",
    studentName: "Mike Brown",
    assignment: "Database Design Quiz",
    type: "quiz",
    submittedDate: "2024-02-12",
  },
]

export default function FacultyHomePage() {
  const { goToCourses } = useFacultyNavigation()

  return (
    <>
      <FacultyNavbar />
      <main className="min-h-screen bg-white px-8 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Welcome back, Faculty</h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage your courses, track student progress, and create engaging learning experiences
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-[20px] border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="rounded-[12px] bg-blue-100 p-4">
                  <BookOpen className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">{facultyCourses.length}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="rounded-[12px] bg-emerald-100 p-4">
                  <Users className="h-7 w-7 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">105</p>
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="rounded-[12px] bg-amber-100 p-4">
                  <AlertCircle className="h-7 w-7 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">{pendingReviews.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Your Courses */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
                <button
                  onClick={goToCourses}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-4">
                {facultyCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/faculty/courses/${course.id}`}
                    className="block rounded-[20px] border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{course.title}</h3>
                        <div className="mt-2 flex gap-6 text-sm text-gray-600">
                          <span>{course.code}</span>
                          <span>{course.students} students</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">{course.description}</p>
                      </div>
                      <span className="text-2xl text-gray-300">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Pending Reviews */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Pending Reviews</h2>
              </div>
              <div className="rounded-[20px] border border-gray-200 bg-white p-6">
                <div className="space-y-3">
                  {pendingReviews.map((review) => (
                    <div key={review.id} className="pb-3 last:pb-0 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-start gap-2">
                        <div className="mt-1 rounded-full bg-amber-100 p-1">
                          <Clock className="h-3 w-3 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{review.studentName}</p>
                          <p className="text-xs text-gray-600">{review.assignment}</p>
                          <p className="mt-1 text-xs text-gray-500">{review.submittedDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {pendingReviews.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No pending reviews</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
