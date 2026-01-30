import { Navbar } from "@/components/dashboard/navbar"
import { ProjectDetailView } from "@/components/projecthub/project-detail"
import { getProjectById } from "@/lib/project-data"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function ProjectDetailPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params
  const project = getProjectById(Number.parseInt(projectId))

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="w-full max-w-none px-6 py-16">
          <div className="bg-white rounded-[20px] border border-gray-200 p-12 text-center max-w-4xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-8">
              This project may have been created in your current session and is not yet persisted. Please go back to the
              ProjectHub to view all available projects.
            </p>
            <Link href="/projecthub">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-[20px]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to ProjectHub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProjectDetailView project={project} />
    </div>
  )
}
