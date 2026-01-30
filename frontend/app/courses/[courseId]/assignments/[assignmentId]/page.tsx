import { notFound } from "next/navigation"
import { Navbar } from "@/components/dashboard/navbar"
import { AssignmentDetail } from "@/components/courses/assignment-detail"
import { getCourseById, getAssignmentById } from "@/lib/course-data"

export default async function AssignmentDetailPage({
  params,
}: {
  params: Promise<{ courseId: string; assignmentId: string }>
}) {
  const { courseId, assignmentId } = await params
  const course = getCourseById(Number.parseInt(courseId))
  const assignment = getAssignmentById(Number.parseInt(courseId), assignmentId)

  if (!course || !assignment) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AssignmentDetail assignment={assignment} course={course} />
    </div>
  )
}
