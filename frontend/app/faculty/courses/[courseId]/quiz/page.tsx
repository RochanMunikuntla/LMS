"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { FacultyNavbar } from "@/components/faculty/navbar"
import { ArrowLeft, Edit2, Trash2, Eye } from "lucide-react"

interface Quiz {
  id: number
  title: string
  totalQuestions: number
  marks: number
  attempts: number
}

const initialQuizzes: Quiz[] = [
  {
    id: 1,
    title: "HTML Basics Quiz",
    totalQuestions: 10,
    marks: 20,
    attempts: 42,
  },
  {
    id: 2,
    title: "CSS Flexbox Assessment",
    totalQuestions: 8,
    marks: 15,
    attempts: 38,
  },
]

export default function QuizzesPage() {
  const params = useParams()
  const courseId = params?.courseId as string
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes)

  const handleDelete = (id: number) => {
    setQuizzes(quizzes.filter(q => q.id !== id))
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
              <h1 className="text-3xl font-bold text-gray-900">Quizzes</h1>
              <p className="mt-2 text-gray-600">Create and manage course quizzes</p>
            </div>
            <Link
              href={`/faculty/courses/${courseId}/quiz/create`}
              className="rounded-[10px] bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Create Quiz
            </Link>
          </div>

          {/* Quizzes List */}
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between rounded-[20px] border border-gray-200 bg-white p-6 transition-all hover:shadow-md"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{quiz.title}</h3>
                  <div className="mt-3 flex gap-8 text-sm text-gray-600">
                    <span>{quiz.totalQuestions} questions</span>
                    <span>Marks: {quiz.marks}</span>
                    <span>Attempts: {quiz.attempts}</span>
                  </div>
                </div>
                <div className="ml-6 flex gap-2">
                  <button className="rounded-[10px] bg-blue-50 p-3 text-blue-600 hover:bg-blue-100" title="View">
                    <Eye className="h-5 w-5" />
                  </button>
                  <Link
                    href={`/faculty/courses/${courseId}/quiz/${quiz.id}`}
                    className="rounded-[10px] bg-blue-50 p-3 text-blue-600 hover:bg-blue-100"
                    title="Edit"
                  >
                    <Edit2 className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="rounded-[10px] bg-red-50 p-3 text-red-600 hover:bg-red-100"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {quizzes.length === 0 && (
            <div className="rounded-[20px] border border-gray-200 bg-white p-12 text-center">
              <p className="text-gray-600">No quizzes yet. Create one to get started.</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
