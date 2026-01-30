"use client"
import { ProjectCard } from "./project-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  status: "open" | "in-review" | "closed"
  date: string
  likes: number
  isLiked: boolean
}

interface ProjectListProps {
  projects: Project[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function ProjectList({ projects, currentPage, totalPages, onPageChange }: ProjectListProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-6">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-[10px] text-sm font-medium ${
              currentPage === page ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
        <span className="px-2 text-gray-400">...</span>
        <button
          onClick={() => onPageChange(totalPages)}
          className={`flex h-9 w-9 items-center justify-center rounded-[10px] text-sm font-medium ${
            currentPage === totalPages
              ? "bg-blue-600 text-white"
              : "border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {totalPages}
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
