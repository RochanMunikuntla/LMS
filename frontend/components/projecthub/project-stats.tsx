"use client"

import { Users, FolderKanban } from "lucide-react"
import { getUserProjects, getUserCollaborations } from "@/lib/project-data"

interface ProjectStatsProps {
  onOpenYourProjects: () => void
  onOpenYourCollaborations: () => void
}

export function ProjectStats({ onOpenYourProjects, onOpenYourCollaborations }: ProjectStatsProps) {
  const userProjects = getUserProjects()
  const userCollaborations = getUserCollaborations()

  const stats = [
    {
      label: "YOUR COLLABORATIONS",
      value: userCollaborations.length,
      icon: Users,
      color: "blue",
      onClick: onOpenYourCollaborations,
    },
    {
      label: "YOUR PROJECTS",
      value: userProjects.length,
      icon: FolderKanban,
      color: "emerald",
      onClick: onOpenYourProjects,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat) => (
        <button
          key={stat.label}
          onClick={stat.onClick}
          className="flex items-center gap-4 rounded-[20px] border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50/30 text-left"
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              stat.color === "blue" ? "bg-blue-100" : "bg-emerald-100"
            }`}
          >
            <stat.icon className={`h-5 w-5 ${stat.color === "blue" ? "text-blue-600" : "text-emerald-600"}`} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
