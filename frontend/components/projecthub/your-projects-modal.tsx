"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { getUserProjects } from "@/lib/project-data"

interface YourProjectsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function YourProjectsModal({ isOpen, onClose }: YourProjectsModalProps) {
  const projects = getUserProjects()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-md border border-gray-200 bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">Your Projects</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Project List */}
        <div className="max-h-80 overflow-y-auto p-4">
          {projects.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">You haven't created any projects yet.</p>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projecthub/${project.id}`}
                  onClick={onClose}
                  className="block rounded-md border border-gray-100 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/30"
                >
                  <h3 className="text-sm font-medium text-gray-900">{project.title}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-gray-500">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded border border-gray-200 px-2 py-0.5 text-[10px] text-gray-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
