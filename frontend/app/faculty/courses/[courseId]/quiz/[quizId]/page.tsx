"use client"

import Link from "next/link"
import { FacultyNavbar } from "@/components/faculty/navbar"
import { ArrowLeft } from "lucide-react"

interface Props {
  params: Promise<{
    courseId: string
    quizId: string
  }>
}

export default async function QuizDetailPage({ params }: Props) {
  const { courseId, quizId } = await params

  return (
    <>
      <FacultyNavbar />
      <main className="min-h-screen bg-slate-50 px-6 py-8">
        <div className="mx-auto max-w-2xl">
          {/* Back Button */}
          <Link
            href={`/faculty/courses/${courseId}/quiz`}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Quizzes
          </Link>

          {/* Quiz Details */}
          <div className="rounded-lg border border-slate-200 bg-white p-8">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900">HTML Basics Quiz</h1>
              <button className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700">
                Delete Quiz
              </button>
            </div>

            <div className="space-y-6 border-t border-slate-200 pt-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Total Questions
                </label>
                <p className="mt-2 text-slate-900">10</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Total Marks</label>
                <p className="mt-2 text-slate-900">20</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Attempts</label>
                <p className="mt-2 text-slate-900">42 students have attempted</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">File</label>
                <p className="mt-2 text-blue-600 hover:underline">HTML_Basics_Quiz.pdf</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
