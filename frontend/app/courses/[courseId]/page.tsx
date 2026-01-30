import { notFound } from "next/navigation"
import { Navbar } from "@/components/dashboard/navbar"
import { CourseDetail } from "@/components/courses/course-detail"
import { getCourseById } from "@/lib/course-data"

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const course = getCourseById(Number.parseInt(courseId))

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CourseDetail course={course} />
    </div>
  )
}
