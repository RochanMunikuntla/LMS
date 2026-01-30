import { notFound } from "next/navigation"
import { Navbar } from "@/components/dashboard/navbar"
import { MaterialPreview } from "@/components/courses/material-preview"
import { getCourseById, getMaterialById } from "@/lib/course-data"

export default async function MaterialPreviewPage({
  params,
}: {
  params: Promise<{ courseId: string; materialId: string }>
}) {
  const { courseId, materialId } = await params
  const course = getCourseById(Number.parseInt(courseId))
  const material = getMaterialById(Number.parseInt(courseId), materialId)

  if (!course || !material) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <MaterialPreview material={material} course={course} />
    </div>
  )
}
