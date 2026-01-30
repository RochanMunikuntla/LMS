"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useQuizTimer } from "@/hooks/use-quiz-timer"
import { QuizTimer } from "./quiz-timer"
import { QuizReview } from "./quiz-review"
import type { CourseItem, CourseData, QuizQuestion } from "@/lib/course-data"

interface QuizAttemptProps {
  quiz: CourseItem & { questions?: QuizQuestion[] }
  course: CourseData
}

function parseDurationToSeconds(duration: string | undefined): number | null {
  if (!duration) return null

  const match = duration.match(/(\d+)\s*(minute|minutes|min|mins|hour|hours|hr|hrs|second|seconds|sec|secs)/i)
  if (!match) return null

  const value = Number.parseInt(match[1], 10)
  const unit = match[2].toLowerCase()

  if (unit.startsWith("hour") || unit.startsWith("hr")) {
    return value * 3600
  } else if (unit.startsWith("minute") || unit.startsWith("min")) {
    return value * 60
  } else if (unit.startsWith("second") || unit.startsWith("sec")) {
    return value
  }

  return null
}

export function QuizAttempt({ quiz, course }: QuizAttemptProps) {
  const questions = quiz.questions || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | number | boolean | null>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)

  const durationSeconds = quiz.durationSeconds ?? parseDurationToSeconds(quiz.duration)

  const { formattedTime, isLowTime, startTimer } = useQuizTimer({
    initialSeconds: durationSeconds,
    onTimeUp: () => setSubmitted(true),
  })

  // Start timer on mount
  useEffect(() => {
    startTimer()
  }, [startTimer])

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  const handleAnswerChange = (value: string | number | boolean | null) => {
    if (currentQuestion) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
    }
  }

  const toggleAnswer = (value: string | boolean) => {
    if (currentQuestion) {
      if (answers[currentQuestion.id] === value) {
        handleAnswerChange(null)
      } else {
        handleAnswerChange(value)
      }
    }
  }

  const goToPrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1))
  const goToNext = () => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))
  const goToQuestion = (index: number) => setCurrentIndex(index)

  const handleSubmit = () => {
    setShowConfirmSubmit(true)
  }

  const confirmSubmit = () => {
    setShowConfirmSubmit(false)
    setSubmitted(true)
  }

  const answeredCount = Object.values(answers).filter((v) => v !== null && v !== undefined).length

  if (totalQuestions === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No questions available for this quiz.</p>
          <Link href={`/courses/${course.id}`} className="text-blue-600 hover:underline">
            Back to course
          </Link>
        </div>
      </div>
    )
  }

  if (submitted) {
    return <QuizReview quiz={quiz} course={course} answers={answers} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Quiz?</h3>
            <p className="text-sm text-gray-500 mb-4">
              You have answered {answeredCount} out of {totalQuestions} questions.
              {answeredCount < totalQuestions && " Some questions are still unanswered."}
            </p>
            <p className="text-sm text-gray-500 mb-6">Once submitted, you cannot change your answers.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="w-full max-w-none px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/courses/${course.id}`}
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Exit Quiz
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <h1 className="text-sm font-semibold text-gray-900">{quiz.title}</h1>
            </div>

            {durationSeconds !== null && <QuizTimer formattedTime={formattedTime} isLowTime={isLowTime} />}
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Question area - 75% */}
        <div className="w-[75%] p-6 flex justify-center">
          <div className="w-full max-w-3xl">
            {/* Question card */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              {/* Question number */}
              <div className="flex items-center gap-2 mb-6">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 capitalize">
                  {currentQuestion.type === "mcq"
                    ? "Multiple Choice"
                    : currentQuestion.type === "truefalse"
                      ? "True / False"
                      : "Numerical"}
                </span>
              </div>

              {/* Question text */}
              <h2 className="text-lg font-medium text-gray-900 mb-8">{currentQuestion.question}</h2>

              {/* Answer options */}
              <div className="space-y-3">
                {currentQuestion.type === "mcq" &&
                  currentQuestion.options?.map((option, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleAnswer(option)}
                      className={`flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-all ${
                        answers[currentQuestion.id] === option
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion.id] === option ? "border-blue-600" : "border-gray-300"
                        }`}
                      >
                        {answers[currentQuestion.id] === option && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                      </div>
                      <span className="text-sm text-gray-700">{option}</span>
                    </div>
                  ))}

                {currentQuestion.type === "truefalse" && (
                  <div className="flex gap-4">
                    {[true, false].map((value) => (
                      <div
                        key={String(value)}
                        onClick={() => toggleAnswer(value)}
                        className={`flex items-center justify-center gap-2 rounded-lg border p-4 cursor-pointer transition-all w-[150px] ${
                          answers[currentQuestion.id] === value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            answers[currentQuestion.id] === value ? "border-blue-600" : "border-gray-300"
                          }`}
                        >
                          {answers[currentQuestion.id] === value && (
                            <div className="h-2 w-2 rounded-full bg-blue-600" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{value ? "True" : "False"}</span>
                      </div>
                    ))}
                  </div>
                )}

                {currentQuestion.type === "numerical" && (
                  <input
                    type="number"
                    value={(answers[currentQuestion.id] as number) ?? ""}
                    onChange={(e) => handleAnswerChange(e.target.value ? Number(e.target.value) : null)}
                    placeholder="Enter your answer"
                    className="w-full max-w-md rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              {currentIndex === totalQuestions - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={goToNext}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation sidebar - 25% */}
        <div className="w-[25%] border-l border-gray-200 bg-white p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Questions</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null
              const isCurrent = idx === currentIndex
              return (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(idx)}
                  className={`h-9 w-9 rounded-lg text-xs font-medium transition-all ${
                    isCurrent
                      ? "bg-blue-600 text-white"
                      : isAnswered
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <div className="h-3 w-3 rounded bg-emerald-100 border border-emerald-200" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <div className="h-3 w-3 rounded bg-blue-600" />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="h-3 w-3 rounded bg-gray-100" />
              <span>Not answered</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Progress: {answeredCount} / {totalQuestions} answered
            </p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
