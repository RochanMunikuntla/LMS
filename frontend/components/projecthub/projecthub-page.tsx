"use client"

import { useState } from "react"
import { Navbar } from "@/components/dashboard/navbar"
import { ProjectStats } from "./project-stats"
import { ProjectFilters } from "./project-filters"
import { ProjectList } from "./project-list"
import { NewProjectModal } from "./new-project-modal"
import { YourProjectsModal } from "./your-projects-modal"
import { YourCollaborationsModal } from "./your-collaborations-modal"
import { currentUserId } from "@/lib/project-data"

const initialProjects = [
  {
    id: 1,
    title: "Student-centric LMS",
    description:
      "Build a comprehensive learning management system focused on accessibility and peer-to-peer collaboration modules. Includes real-time chat and grade tracking features.",
    tags: ["React", "Node.js", "MongoDB"],
    status: "open" as const,
    date: "Dec 14, 2025",
    likes: 0,
    isLiked: false,
    ownerId: 1,
  },
  {
    id: 2,
    title: "AI-Driven Plagiarism Checker",
    description:
      "Develop a tool that uses machine learning to detect semantic similarities in student essays beyond just keyword matching.",
    tags: ["Python", "TensorFlow", "FastAPI"],
    status: "in-review" as const,
    date: "Dec 10, 2025",
    likes: 12,
    isLiked: true,
    ownerId: 2,
  },
  {
    id: 3,
    title: "Blockchain Voting System",
    description:
      "An immutable voting platform for student union elections designed to ensure transparency and prevent double-voting.",
    tags: ["Solidity", "Ethereum", "Next.js"],
    status: "open" as const,
    date: "Nov 28, 2025",
    likes: 4,
    isLiked: false,
    ownerId: 1,
  },
  {
    id: 4,
    title: "Campus Event Tracker",
    description:
      "A mobile-first web app to aggregate all campus events, workshops, and seminars with calendar synchronization features.",
    tags: ["TypeScript", "PostgreSQL"],
    status: "closed" as const,
    date: "Nov 15, 2025",
    likes: 21,
    isLiked: false,
    ownerId: 3,
  },
  {
    id: 5,
    title: "Marketplace for Textbooks",
    description:
      "Peer-to-peer marketplace specifically for used academic resources. Includes escrow payments and local pickup scheduling.",
    tags: ["Vue.js", "Supabase"],
    status: "open" as const,
    date: "Nov 02, 2025",
    likes: 56,
    isLiked: true,
    ownerId: 1,
  },
]

export function ProjectHubPage() {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)
  const [isYourProjectsModalOpen, setIsYourProjectsModalOpen] = useState(false)
  const [isYourCollaborationsModalOpen, setIsYourCollaborationsModalOpen] = useState(false)
  const [projects, setProjects] = useState(initialProjects)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 12

  const handleCreateProject = (newProject: { title: string; description: string; tags: string[] }) => {
    const today = new Date()
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })

    const project = {
      id: projects.length + 1,
      title: newProject.title,
      description: newProject.description,
      tags: newProject.tags,
      status: "open" as const,
      date: formattedDate,
      likes: 0,
      isLiked: false,
      ownerId: currentUserId,
    }

    setProjects([project, ...projects])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">ProjectHub</h1>
        <p className="mt-1 text-sm text-gray-500">Explore and collaborate on student projects</p>

        <div className="mt-6 space-y-6">
          <ProjectStats
            onOpenYourProjects={() => setIsYourProjectsModalOpen(true)}
            onOpenYourCollaborations={() => setIsYourCollaborationsModalOpen(true)}
          />
          <ProjectFilters onNewProject={() => setIsNewProjectModalOpen(true)} />
          <ProjectList
            projects={projects}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-200 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2026 LMS Career Development Platform. Built for students, by students.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-600">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-600">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-600">
                API Docs
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* Modals */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
      <YourProjectsModal isOpen={isYourProjectsModalOpen} onClose={() => setIsYourProjectsModalOpen(false)} />
      <YourCollaborationsModal
        isOpen={isYourCollaborationsModalOpen}
        onClose={() => setIsYourCollaborationsModalOpen(false)}
      />
    </div>
  )
}
