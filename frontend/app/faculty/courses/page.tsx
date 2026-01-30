"use client"

import Link from "next/link"
import { FacultyNavbar } from "@/components/faculty/navbar"
import { useFacultyNavigation } from "@/lib/navigation-handlers"
import { CourseCard } from "@/components/courses/course-card"

const facultyCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    semester: "Fall 2024",
    progress: 85,
    color: "bg-yellow-300",
    icon: "code",
  },
  {
    id: 2,
    title: "Advanced React",
    semester: "Fall 2024",
    progress: 60,
    color: "bg-blue-300",
    icon: "code",
  },
  {
    id: 3,
    title: "Database Design",
    semester: "Spring 2025",
    progress: 40,
    color: "bg-purple-300",
    icon: "database",
  },
  {
    id: 4,
    title: "Cloud Computing",
    semester: "Spring 2025",
    progress: 55,
    color: "bg-teal-300",
    icon: "cloud",
  },
  {
    id: 5,
    title: "Network Security",
    semester: "Spring 2025",
    progress: 70,
    color: "bg-emerald-300",
    icon: "network",
  },
]

export default function FacultyCoursesPage() {
  const { goToCourseDetail } = useFacultyNavigation()

  return (
    <>
      <FacultyNavbar />
      <main className="min-h-screen bg-white px-8 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900">My Courses</h1>
            <p className="mt-3 text-lg text-gray-600">
              You are teaching {facultyCourses.length} courses
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {facultyCourses.map((course) => (
              <div key={course.id} onClick={() => goToCourseDetail(course.id)} className="cursor-pointer">
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
