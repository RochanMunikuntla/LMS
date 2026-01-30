"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { FacultyNavbar } from "@/components/faculty/navbar"
import { ArrowLeft, Download, MessageCircle, Edit2 } from "lucide-react"

interface Submission {
  id: number
  studentName: string
  submittedDate: string
  fileName: string
  grade: number
  feedback: string
}

const initialSubmissions: Submission[] = [
  {
    id: 1,
    studentName: "Alex Johnson",
    submittedDate: "2024-02-10",
    fileName: "todo-app.zip",
    grade: 95,
    feedback: "Great work! Clean code and excellent implementation.",
  },
  {
    id: 2,
    studentName: "Sarah Smith",
    submittedDate: "2024-02-09",
    fileName: "todo-project.rar",
    grade: 88,
    feedback: "Good effort. Consider improving the UI design.",
  },
  {
    id: 3,
    studentName: "Mike Brown",
    submittedDate: "2024-02-11",
    fileName: "assignment1.zip",
    grade: 92,
    feedback: "Excellent submission. Well documented code.",
  },
]

export default function ViewSubmissionsPage() {
  const params = useParams()
  const courseId = params?.courseId as string
  const assignmentId = params?.assignmentId as string

  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editFormData, setEditFormData] = useState<{ grade: number; feedback: string }>({ grade: 0, feedback: "" })

  const handleEditClick = (submission: Submission) => {
    setEditingId(submission.id)
    setEditFormData({ grade: submission.grade, feedback: submission.feedback })
  }

  const handleSaveGrade = (id: number) => {
    setSubmissions(submissions.map(s => 
      s.id === id ? { ...s, grade: editFormData.grade, feedback: editFormData.feedback } : s
    ))
    setEditingId(null)
    console.log("[v0] Grade updated for submission", id)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  return (
    <>
      <FacultyNavbar />
      <main className="min-h-screen bg-white px-8 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href={`/faculty/courses/${courseId}/assignments`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Assignments
            </Link>
            <div className="mt-4 h-px bg-gray-200" />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Student Submissions</h1>
            <p className="mt-2 text-gray-600">Review and grade student submissions</p>
          </div>

          {/* Submissions List */}
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="rounded-[20px] border border-gray-200 bg-white p-6 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{submission.studentName}</h3>
                    <p className="text-sm text-gray-600">Submitted: {submission.submittedDate}</p>
                  </div>
                  {editingId !== submission.id ? (
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="inline-block rounded-lg bg-blue-100 px-4 py-2">
                          <p className="text-sm font-semibold text-blue-700">Grade: {submission.grade}/100</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditClick(submission)}
                        className="rounded-[10px] bg-blue-50 p-3 text-blue-600 hover:bg-blue-100"
                        title="Edit grade"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveGrade(submission.id)}
                        className="rounded-[10px] bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="rounded-[10px] border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Download className="h-4 w-4 text-gray-600" />
                    <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      {submission.fileName}
                    </a>
                  </div>
                </div>

                {editingId === submission.id ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor={`grade-${submission.id}`} className="block text-sm font-semibold text-gray-900 mb-2">
                        Grade (out of 100)
                      </label>
                      <input
                        id={`grade-${submission.id}`}
                        type="number"
                        min="0"
                        max="100"
                        value={editFormData.grade}
                        onChange={(e) => setEditFormData({ ...editFormData, grade: Number(e.target.value) })}
                        className="w-full rounded-[10px] border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor={`feedback-${submission.id}`} className="block text-sm font-semibold text-gray-900 mb-2">
                        Feedback
                      </label>
                      <textarea
                        id={`feedback-${submission.id}`}
                        value={editFormData.feedback}
                        onChange={(e) => setEditFormData({ ...editFormData, feedback: e.target.value })}
                        className="w-full rounded-[10px] border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start gap-3">
                      <MessageCircle className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 mb-1">Feedback</p>
                        <p className="text-sm text-gray-700">{submission.feedback}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
