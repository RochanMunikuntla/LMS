import { Navbar } from "@/components/dashboard/navbar"
import { RoadmapGrid } from "@/components/learn/roadmap-grid"

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Learning Roadmaps</h1>
          <p className="mt-1 text-sm text-gray-500">Discover structured paths to master new skills</p>
        </div>

        <RoadmapGrid />
      </main>
    </div>
  )
}
