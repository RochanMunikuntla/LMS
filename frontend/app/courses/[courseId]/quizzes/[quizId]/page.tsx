import { notFound } from "next/navigation"
import { Navbar } from "@/components/dashboard/navbar"
import { QuizAttempt } from "@/components/courses/quiz-attempt"
import { getCourseById, getQuizById } from "@/lib/course-data"

export default async function QuizAttemptPage({
  params,
}: {
  params: Promise<{ courseId: string; quizId: string }>
}) {
  const { courseId, quizId } = await params
  const course = getCourseById(Number.parseInt(courseId))
  const quiz = getQuizById(Number.parseInt(courseId), quizId)

  if (!course || !quiz) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <QuizAttempt quiz={quiz} course={course} />
    </div>
  )
}
