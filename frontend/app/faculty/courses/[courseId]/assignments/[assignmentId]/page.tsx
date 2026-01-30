"use client"

import Link from "next/link"
import { FacultyNavbar } from "@/components/faculty/navbar"
import { ArrowLeft, Edit2, Trash2 } from "lucide-react"

interface Props {
  params: Promise<{
    courseId: string
    assignmentId: string
  }>
}

export default async function AssignmentDetailPage({ params }: Props) {
  const { courseId, assignmentId } = await params

  return (
    <>
      <FacultyNavbar />
      <main className="min-h-screen bg-slate-50 px-6 py-8">
        <div className="mx-auto max-w-2xl">
          {/* Back Button */}
          <Link
            href={`/faculty/courses/${courseId}/assignments`}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Assignments
          </Link>

          {/* Assignment Details */}
          <div className="rounded-lg border border-slate-200 bg-white p-8">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900">Build a Todo App</h1>
              <div className="flex gap-2">
                <Link
                  href={`/faculty/courses/${courseId}/assignments/${assignmentId}/edit`}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>

            <div className="space-y-6 border-t border-slate-200 pt-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">Due Date</label>
                <p className="mt-2 text-slate-900">2024-02-15</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Total Marks</label>
                <p className="mt-2 text-slate-900">100</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <p className="mt-2 text-slate-900">
                  Create a fully functional todo application using HTML, CSS, and JavaScript.
                  Include features for adding, editing, and deleting tasks.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Submissions</label>
                <p className="mt-2 text-slate-900">38 / 45 students have submitted</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
