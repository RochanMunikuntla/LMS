"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { AdminNavbar } from "@/components/admin/navbar"
import { useAdminNavigation } from "@/lib/navigation-handlers"
import { ArrowLeft } from "lucide-react"

interface Course {
  id: number
  title: string
  code: string
  department: string
  instructor: string
  semester: string
  credits: number
  schedule: string
  description: string
}

// Sample data - will be replaced by backend
const coursesData: Record<string, Course> = {
  "1": {
    id: 1,
    title: "Web Development Fundamentals",
    code: "CS-101",
    department: "Computer Science",
    instructor: "1",
    semester: "Fall 2024",
    credits: 3,
    schedule: "Mon, Wed, Fri 10:00 AM - 11:00 AM",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
  },
  "2": {
    id: 2,
    title: "Advanced React",
    code: "CS-205",
    department: "Computer Science",
    instructor: "1",
    semester: "Fall 2024",
    credits: 3,
    schedule: "Tue, Thu 2:00 PM - 3:30 PM",
    description: "Master React patterns, hooks, and advanced state management techniques.",
  },
}

const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Mechanical Engineering",
]

const semesters = [
  "Fall 2024",
  "Spring 2025",
  "Summer 2025",
  "Fall 2025",
]

const instructors = [
  { id: 1, name: "Dr. Jane Smith" },
  { id: 2, name: "Prof. Robert Brown" },
  { id: 3, name: "Dr. Emily Chen" },
  { id: 4, name: "Prof. Michael Davis" },
]

export default function EditCoursePage() {
  const params = useParams()
  const courseId = params?.courseId as string
  const course = coursesData[courseId]

  const [formData, setFormData] = useState({
    title: course?.title || "",
    code: course?.code || "",
    department: course?.department || "",
    instructor: course?.instructor || "",
    semester: course?.semester || "",
    credits: course?.credits?.toString() || "",
    schedule: course?.schedule || "",
    description: course?.description || "",
  })
  const { goToCourseDetail } = useAdminNavigation()

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Backend will handle the actual update
    goToCourseDetail(courseId)
  }

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-white px-8 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href={`/admin/courses/${courseId}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Course
            </Link>
            <div className="mt-4 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <div className="rounded-[20px] border border-gray-200 bg-white p-8">
            <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-3">
                  Course Title
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter course title"
                  className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="code" className="block text-sm font-semibold text-gray-900 mb-3">
                    Course Code
                  </label>
                  <input
                    id="code"
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="e.g., CS-101"
                    className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="credits" className="block text-sm font-semibold text-gray-900 mb-3">
                    Credits
                  </label>
                  <input
                    id="credits"
                    type="number"
                    name="credits"
                    value={formData.credits}
                    onChange={handleInputChange}
                    placeholder="3"
                    min="1"
                    max="6"
                    className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="department" className="block text-sm font-semibold text-gray-900 mb-3">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="semester" className="block text-sm font-semibold text-gray-900 mb-3">
                    Semester
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select semester</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="instructor" className="block text-sm font-semibold text-gray-900 mb-3">
                  Instructor
                </label>
                <select
                  id="instructor"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">Select instructor</option>
                  {instructors.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="schedule" className="block text-sm font-semibold text-gray-900 mb-3">
                  Schedule
                </label>
                <input
                  id="schedule"
                  type="text"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  placeholder="e.g., Mon, Wed, Fri 10:00 AM - 11:00 AM"
                  className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-3">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter course description"
                  className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-[10px] bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <Link
                  href={`/admin/courses/${courseId}`}
                  className="flex-1 rounded-[10px] border border-gray-300 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
