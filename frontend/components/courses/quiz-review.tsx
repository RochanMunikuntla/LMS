"use client"

import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import type { CourseItem, CourseData, QuizQuestion } from "@/lib/course-data"

interface QuizReviewProps {
  quiz: CourseItem & { questions?: QuizQuestion[] }
  course: CourseData
  answers: Record<string, string | number | boolean | null>
}

export function QuizReview({ quiz, course, answers }: QuizReviewProps) {
  const questions = quiz.questions || []

  // Calculate score
  let correctCount = 0
  questions.forEach((q) => {
    const userAnswer = answers[q.id]
    if (userAnswer !== null && userAnswer !== undefined && userAnswer === q.correctAnswer) {
      correctCount++
    }
  })

  const totalQuestions = questions.length
  const marksPerQuestion = 1
  const totalMarks = correctCount * marksPerQuestion
  const maxMarks = totalQuestions * marksPerQuestion
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="w-full max-w-none px-6 py-4">
          <Link
            href={`/courses/${course.id}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Link>
        </div>
      </div>

      <div className="w-full max-w-none px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Score Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            <div className="text-center mb-6">
              <div
                className={`inline-flex items-center justify-center h-20 w-20 rounded-full mb-4 ${
                  percentage >= 70 ? "bg-emerald-100" : percentage >= 50 ? "bg-amber-100" : "bg-red-100"
                }`}
              >
                {percentage >= 70 ? (
                  <CheckCircle className="h-10 w-10 text-emerald-600" />
                ) : (
                  <XCircle className={`h-10 w-10 ${percentage >= 50 ? "text-amber-600" : "text-red-600"}`} />
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed</h1>
              <p className="text-gray-500">{quiz.title}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Score</p>
                <p className="text-2xl font-bold text-gray-900">{percentage}%</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Correct</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {correctCount}/{totalQuestions}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Marks</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalMarks}/{maxMarks}
                </p>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 border-t border-gray-100 pt-4">
              <p>
                <strong>Marks Calculation:</strong> {correctCount} correct answers × {marksPerQuestion} mark per
                question = {totalMarks} marks
              </p>
            </div>
          </div>

          {/* Review Answers */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Review Answers</h2>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id]
              const isCorrect = userAnswer === question.correctAnswer
              const isAnswered = userAnswer !== null && userAnswer !== undefined

              return (
                <div
                  key={question.id}
                  className={`bg-white rounded-xl border p-6 ${
                    isCorrect ? "border-emerald-200 bg-emerald-50/50" : "border-red-200 bg-red-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center h-7 w-7 rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
                        {index + 1}
                      </span>
                      <span className="text-xs font-medium text-gray-500 uppercase">
                        {question.type === "mcq"
                          ? "Multiple Choice"
                          : question.type === "truefalse"
                            ? "True / False"
                            : "Numerical"}
                      </span>
                    </div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                        <CheckCircle className="h-4 w-4" />
                        Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                        <XCircle className="h-4 w-4" />
                        Incorrect
                      </span>
                    )}
                  </div>

                  <p className="text-gray-900 font-medium mb-4">{question.question}</p>

                  <div className="space-y-2">
                    {question.type === "mcq" &&
                      question.options?.map((option, idx) => {
                        const isUserAnswer = userAnswer === option
                        const isCorrectAnswer = question.correctAnswer === option

                        return (
                          <div
                            key={idx}
                            className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-sm ${
                              isCorrectAnswer
                                ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                                : isUserAnswer
                                  ? "border-red-300 bg-red-100 text-red-800"
                                  : "border-gray-200 bg-white text-gray-600"
                            }`}
                          >
                            {isCorrectAnswer && <CheckCircle className="h-4 w-4 text-emerald-600" />}
                            {isUserAnswer && !isCorrectAnswer && <XCircle className="h-4 w-4 text-red-600" />}
                            {!isUserAnswer && !isCorrectAnswer && <div className="h-4 w-4" />}
                            <span>{option}</span>
                            {isCorrectAnswer && <span className="ml-auto text-xs font-medium">(Correct Answer)</span>}
                            {isUserAnswer && !isCorrectAnswer && (
                              <span className="ml-auto text-xs font-medium">(Your Answer)</span>
                            )}
                          </div>
                        )
                      })}

                    {question.type === "truefalse" && (
                      <div className="flex gap-4">
                        {[true, false].map((value) => {
                          const isUserAnswer = userAnswer === value
                          const isCorrectAnswer = question.correctAnswer === value

                          return (
                            <div
                              key={String(value)}
                              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm ${
                                isCorrectAnswer
                                  ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                                  : isUserAnswer
                                    ? "border-red-300 bg-red-100 text-red-800"
                                    : "border-gray-200 bg-white text-gray-600"
                              }`}
                            >
                              {isCorrectAnswer && <CheckCircle className="h-4 w-4 text-emerald-600" />}
                              {isUserAnswer && !isCorrectAnswer && <XCircle className="h-4 w-4 text-red-600" />}
                              <span className="font-medium">{value ? "True" : "False"}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {question.type === "numerical" && (
                      <div className="space-y-2">
                        <div
                          className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-sm ${
                            isAnswered
                              ? isCorrect
                                ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                                : "border-red-300 bg-red-100 text-red-800"
                              : "border-gray-200 bg-gray-50 text-gray-500"
                          }`}
                        >
                          <span>Your answer: {isAnswered ? String(userAnswer) : "Not answered"}</span>
                        </div>
                        {!isCorrect && (
                          <div className="flex items-center gap-3 rounded-lg border border-emerald-300 bg-emerald-100 px-4 py-2.5 text-sm text-emerald-800">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                            <span>Correct answer: {String(question.correctAnswer)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Back to Course */}
          <div className="mt-8 text-center">
            <Link
              href={`/courses/${course.id}`}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
