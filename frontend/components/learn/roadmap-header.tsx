"use client"

import type React from "react"
import { BookOpen, Code, Database, Cloud, Brain, Terminal, Palette, Shield } from "lucide-react"

interface RoadmapHeaderProps {
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
  domain: string
  icon: string
  isEnrolled: boolean
  onEnroll: () => void
  onDeenroll: () => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  python: Code,
  javascript: Terminal,
  database: Database,
  cloud: Cloud,
  ai: Brain,
  design: Palette,
  security: Shield,
  default: BookOpen,
}

const levelStyles: Record<string, string> = {
  Beginner: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Intermediate: "text-amber-700 bg-amber-50 border-amber-200",
  Advanced: "text-rose-700 bg-rose-50 border-rose-200",
}

export function RoadmapHeader({
  title,
  description,
  level,
  domain,
  icon,
  isEnrolled,
  onEnroll,
  onDeenroll,
}: RoadmapHeaderProps) {
  const IconComponent = iconMap[icon] || iconMap.default

  return (
    <div className="flex items-start justify-between gap-8 py-8">
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{domain}</span>
          <span className={`rounded border px-2 py-0.5 text-xs font-medium ${levelStyles[level]}`}>{level}</span>
          {isEnrolled && (
            <span className="rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
              Enrolled
            </span>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

        <p className="max-w-xl text-sm leading-relaxed text-gray-600">{description}</p>

        {isEnrolled ? (
          <button
            onClick={onDeenroll}
            className="mt-2 rounded-[6px] border border-rose-200 bg-rose-50 px-5 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-100"
          >
            De-enroll
          </button>
        ) : (
          <button
            onClick={onEnroll}
            className="mt-2 rounded-[6px] bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Enroll Now
          </button>
        )}
      </div>

      <div className="hidden md:flex h-32 w-32 items-center justify-center rounded-[6px] bg-gray-50 border border-gray-200">
        <IconComponent className="h-16 w-16 text-gray-400" />
      </div>
    </div>
  )
}
