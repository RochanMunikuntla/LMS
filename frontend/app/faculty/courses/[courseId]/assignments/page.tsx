"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { FacultyNavbar } from "@/components/faculty/navbar"
import { ArrowLeft, Edit2, Trash2, Eye } from "lucide-react"

interface Assignment {
  id: number
  title: string
  dueDate: string
  marks: number
  submissions: number
  total: number
}

const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: "Build a Todo App",
    dueDate: "2024-02-15",
    marks: 100,
    submissions: 38,
    total: 45,
  },
  {
    id: 2,
    title: "CSS Flexbox Challenge",
    dueDate: "2024-02-08",
    marks: 50,
    submissions: 42,
    total: 45,
  },
  {
    id: 3,
    title: "JavaScript DOM Manipulation",
    dueDate: "2024-02-22",
    marks: 75,
    submissions: 22,
    total: 45,
  },
]

export default function AssignmentsListPage() {
  const params = useParams()
  const courseId = params?.courseId as string

  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments)

  const handleDelete = (id: number) => {
    setAssignments(assignments.filter(a => a.id !== id))
  }

  return (
    <>
      <FacultyNavbar />
      <main className="min-h-screen bg-white px-8 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href={`/faculty/courses/${courseId}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Course
            </Link>
            <div className="mt-4 h-px bg-gray-200" />
          </div>

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
              <p className="mt-2 text-gray-600">Manage course assignments and submissions</p>
            </div>
            <Link
              href={`/faculty/courses/${courseId}/assignments/create`}
              className="rounded-[10px] bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Create Assignment
            </Link>
          </div>

          {/* Assignments List */}
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center justify-between rounded-[20px] border border-gray-200 bg-white p-6 transition-all hover:shadow-md"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                  <div className="mt-3 flex gap-8 text-sm text-gray-600">
                    <span>Due: {assignment.dueDate}</span>
                    <span>Marks: {assignment.marks}</span>
                    <span>
                      Submissions: {assignment.submissions}/{assignment.total}
                    </span>
                  </div>
                </div>
                <div className="ml-6 flex gap-2">
                  <button className="rounded-[10px] bg-blue-50 p-3 text-blue-600 hover:bg-blue-100" title="View Submissions">
                    <Eye className="h-5 w-5" />
                  </button>
                  <Link
                    href={`/faculty/courses/${courseId}/assignments/${assignment.id}/edit`}
                    className="rounded-[10px] bg-blue-50 p-3 text-blue-600 hover:bg-blue-100"
                    title="Edit"
                  >
                    <Edit2 className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(assignment.id)}
                    className="rounded-[10px] bg-red-50 p-3 text-red-600 hover:bg-red-100"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {assignments.length === 0 && (
            <div className="rounded-[20px] border border-gray-200 bg-white p-12 text-center">
              <p className="text-gray-600">No assignments yet. Create one to get started.</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
