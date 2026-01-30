"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { CourseData } from "@/lib/course-data"
import { CourseAccordion } from "./course-accordion"

interface CourseDetailProps {
  course: CourseData
}

export function CourseDetail({ course }: CourseDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="w-full px-6 py-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Course header */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
          <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <span>
              <span className="font-medium text-gray-700">Course Code:</span> {course.code}
            </span>
            <span>
              <span className="font-medium text-gray-700">Semester:</span> {course.semester}
            </span>
            <span>
              <span className="font-medium text-gray-700">Instructor:</span> {course.instructor}
            </span>
          </div>

          {/* Progress indicator */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Course Progress</span>
              <span className="text-sm font-semibold text-blue-600">{course.progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Accordion sections */}
        <div className="space-y-4">
          <CourseAccordion title="Assignments" type="assignments" items={course.assignments} courseId={course.id} />
          <CourseAccordion title="Study Material" type="materials" items={course.studyMaterials} courseId={course.id} />
          <CourseAccordion title="Quizzes" type="quizzes" items={course.quizzes} courseId={course.id} />
        </div>
      </main>
    </div>
  )
}
