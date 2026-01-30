"use client"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/dashboard/navbar"
import { getRoadmapById } from "@/lib/roadmap-data"
import { RoadmapContent } from "@/components/learn/roadmap-content"
import { Suspense } from "react"

interface PageProps {
  params: Promise<{ roadmapId: string }>
}

export default async function RoadmapDetailPage({ params }: PageProps) {
  const { roadmapId } = await params
  const roadmap = getRoadmapById(Number(roadmapId))

  if (!roadmap) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
        <RoadmapContent roadmap={roadmap} />
      </Suspense>
    </div>
  )
}
