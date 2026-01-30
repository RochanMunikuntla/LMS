"use client"

import type React from "react"
import Link from "next/link"
import {
  MoreVertical,
  Code,
  Database,
  Cloud,
  MessageSquare,
  Network,
  GitBranch,
  Layers,
  Globe,
  Calculator,
} from "lucide-react"

interface CourseCardProps {
  id: number
  title: string
  semester: string
  progress: number
  color: string
  icon: string
}

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  database: Database,
  cloud: Cloud,
  message: MessageSquare,
  network: Network,
  git: GitBranch,
  layers: Layers,
  globe: Globe,
  calculator: Calculator,
}

export function CourseCard({ id, title, semester, progress, color, icon }: CourseCardProps) {
  const IconComponent = iconMap[icon] || Code

  return (
    <Link href={`/courses/${id}`} className="block">
      <div className="group overflow-hidden rounded-[20px] border border-gray-200 bg-white transition-shadow hover:shadow-lg cursor-pointer">
        {/* Colored header with geometric pattern */}
        <div className={`relative h-36 ${color} overflow-hidden`}>
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-30">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="0,0 30,0 15,30 0,20" fill="currentColor" className="text-white/40" />
              <polygon points="30,0 60,0 45,25 25,20" fill="currentColor" className="text-white/30" />
              <polygon points="60,0 100,0 100,30 70,25" fill="currentColor" className="text-white/50" />
              <polygon points="0,40 25,35 35,60 0,70" fill="currentColor" className="text-white/30" />
              <polygon points="40,30 70,35 65,65 35,55" fill="currentColor" className="text-white/40" />
              <polygon points="75,30 100,40 100,70 80,60" fill="currentColor" className="text-white/20" />
              <polygon points="0,80 30,70 40,100 0,100" fill="currentColor" className="text-white/50" />
              <polygon points="50,70 80,75 90,100 45,100" fill="currentColor" className="text-white/30" />
              <circle cx="80" cy="80" r="25" fill="currentColor" className="text-white/20" />
            </svg>
          </div>

          {/* Icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-4">
            <IconComponent className="h-10 w-10 text-white/80" />
          </div>

          {/* Semester badge */}
          <span className="absolute left-3 top-3 rounded-md bg-gray-900/70 px-2 py-1 text-xs font-medium text-white">
            {semester}
          </span>
        </div>

        {/* Card content */}
        <div className="p-4">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">{title}</h3>

          {/* Progress bar */}
          <div className="mb-2 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <button
              onClick={(e) => e.preventDefault()}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          <p className="text-sm text-gray-500">{progress}% complete</p>
        </div>
      </div>
    </Link>
  )
}
