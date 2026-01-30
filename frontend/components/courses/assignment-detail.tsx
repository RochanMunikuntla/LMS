"use client"

import { ArrowLeft, Calendar, Award, BookOpen } from "lucide-react"
import Link from "next/link"
import type { CourseItem, CourseData } from "@/lib/course-data"

interface AssignmentDetailProps {
  assignment: CourseItem
  course: CourseData
}

export function AssignmentDetail({ assignment, course }: AssignmentDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="w-full px-6 py-4">
          <Link
            href={`/courses/${course.id}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {course.title}
          </Link>
        </div>
      </div>

      <main className="w-full max-w-none px-6 py-8">
        <div className="flex justify-center">
          <div className="w-full max-w-none px-6 rounded-xl border border-gray-200 bg-white p-8">
            {/* Course name */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <BookOpen className="h-4 w-4" />
              <span>{course.title}</span>
            </div>

            {/* Assignment title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-6">{assignment.title}</h1>

            {/* Metadata */}
            <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b border-gray-100">
              {assignment.dueDate && (
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-amber-50 p-2">
                    <Calendar className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Due Date</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {assignment.dueDate} {assignment.dueTime && `at ${assignment.dueTime}`}
                    </p>
                  </div>
                </div>
              )}

              {assignment.marks && (
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-emerald-50 p-2">
                    <Award className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Marks</p>
                    <p className="text-sm font-semibold text-gray-900">{assignment.marks} marks</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {assignment.description || "No description provided for this assignment."}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
              <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                Submit Assignment
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
