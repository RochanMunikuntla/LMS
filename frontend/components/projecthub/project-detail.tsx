"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Users, Pencil } from "lucide-react"
import type { ProjectDetail } from "@/lib/project-data"
import { currentUserId } from "@/lib/project-data"
import { EditProjectModal } from "./edit-project-modal"

interface ProjectDetailViewProps {
  project: ProjectDetail
}

export function ProjectDetailView({ project: initialProject }: ProjectDetailViewProps) {
  const [project, setProject] = useState(initialProject)
  const [likes, setLikes] = useState(project.likes)
  const [isLiked, setIsLiked] = useState(project.isLiked)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const isOwner = project.ownerId === currentUserId

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleUpdate = (updated: { title: string; description: string; tags: string[] }) => {
    setProject({
      ...project,
      title: updated.title,
      description: updated.description,
      tags: updated.tags,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Main Content Card */}
        <div className="rounded-[20px] border border-gray-100 bg-white p-8 shadow-sm">
          {/* Two Column Layout */}
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Left Column - Main Project Info */}
            <div className="flex-1">
              {/* Student Info */}
              <div className="flex items-center gap-3">
                <Image
                  src={project.author.avatar || "/placeholder.svg"}
                  alt={project.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{project.author.name}</span>
              </div>

              {/* Project Title */}
              <h1 className="mt-5 text-2xl font-semibold text-gray-900">{project.title}</h1>

              {/* Project Description */}
              <p className="mt-4 text-sm leading-relaxed text-gray-600">{project.description}</p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Created Date */}
              <p className="mt-5 text-xs text-gray-400">Created on {project.date}</p>
            </div>

            {/* Right Column - Collaborators */}
            <div className="w-full lg:w-64">
              <div className="rounded-[12px] border border-gray-100 bg-gray-50 p-5">
                <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Users className="h-4 w-4 text-gray-500" />
                  Collaborators
                </h3>
                <div className="mt-4 space-y-3">
                  {project.collaborators.length > 0 ? (
                    project.collaborators.map((collaborator) => (
                      <div key={collaborator.id} className="flex items-center gap-3">
                        <Image
                          src={collaborator.avatar || "/placeholder.svg"}
                          alt={collaborator.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="text-sm text-gray-600">{collaborator.name}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No collaborators yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-100"></div>

          {/* Bottom Action Section */}
          <div className="flex items-center gap-4">
            {isOwner ? (
              // Owner sees Edit button only
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 rounded-[10px] border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                <Pencil className="h-4 w-4" />
                Edit Project
              </button>
            ) : (
              // Non-owners see Like and Collaborate buttons
              <>
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 rounded-[10px] border px-4 py-2 text-sm font-medium transition-colors ${
                    isLiked
                      ? "border-red-200 bg-red-50 text-red-600"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500" : ""}`} />
                  {likes} {likes === 1 ? "Like" : "Likes"}
                </button>

                <button className="rounded-[10px] bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                  Request to Collaborate
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isOwner && (
        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          project={{
            id: project.id,
            title: project.title,
            description: project.description,
            tags: project.tags,
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}
