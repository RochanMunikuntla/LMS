"use client"

import type React from "react"
import Link from "next/link"
import { BookOpen, Code, Database, Cloud, Brain, Terminal, Palette, Shield } from "lucide-react"

interface RoadmapCardProps {
  id: number
  title: string
  description: string
  domain: string
  level: "Beginner" | "Intermediate" | "Advanced"
  icon?: string
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
  Beginner: "text-emerald-600 border-emerald-200 bg-emerald-50",
  Intermediate: "text-amber-600 border-amber-200 bg-amber-50",
  Advanced: "text-rose-600 border-rose-200 bg-rose-50",
}

const gradientStyles: Record<string, { bg: string; iconBg: string; iconText: string }> = {
  python: {
    bg: "bg-gradient-to-br from-yellow-50 via-white to-blue-50",
    iconBg: "bg-gradient-to-br from-yellow-100 to-blue-100",
    iconText: "text-yellow-600",
  },
  javascript: {
    bg: "bg-gradient-to-br from-yellow-50 via-white to-yellow-100",
    iconBg: "bg-gradient-to-br from-yellow-200 to-yellow-100",
    iconText: "text-yellow-700",
  },
  database: {
    bg: "bg-gradient-to-br from-blue-50 via-white to-cyan-50",
    iconBg: "bg-gradient-to-br from-blue-100 to-cyan-100",
    iconText: "text-blue-600",
  },
  cloud: {
    bg: "bg-gradient-to-br from-orange-50 via-white to-amber-50",
    iconBg: "bg-gradient-to-br from-orange-100 to-amber-100",
    iconText: "text-orange-600",
  },
  ai: {
    bg: "bg-gradient-to-br from-purple-50 via-white to-pink-50",
    iconBg: "bg-gradient-to-br from-purple-100 to-pink-100",
    iconText: "text-purple-600",
  },
  design: {
    bg: "bg-gradient-to-br from-rose-50 via-purple-50 via-blue-50 to-teal-50",
    iconBg: "bg-gradient-to-br from-rose-100 via-purple-100 to-blue-100",
    iconText: "text-purple-600",
  },
  security: {
    bg: "bg-gradient-to-br from-green-50 via-white to-emerald-50",
    iconBg: "bg-gradient-to-br from-green-100 to-emerald-100",
    iconText: "text-green-600",
  },
  default: {
    bg: "bg-gradient-to-br from-slate-50 via-white to-blue-50",
    iconBg: "bg-gradient-to-br from-slate-100 to-blue-100",
    iconText: "text-slate-600",
  },
}

export function RoadmapCard({ id, title, description, domain, level, icon = "default" }: RoadmapCardProps) {
  const IconComponent = iconMap[icon] || iconMap.default
  const gradient = gradientStyles[icon] || gradientStyles.default

  return (
    <Link href={`/learn/${id}`}>
      <div
        className={`group cursor-pointer rounded-[20px] border border-gray-200 p-5 transition-all hover:border-blue-300 hover:shadow-md ${gradient.bg}`}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className={`flex h-10 w-10 items-center justify-center rounded-[12px] ${gradient.iconBg}`}>
            <IconComponent className={`h-5 w-5 ${gradient.iconText}`} />
          </div>
          <span className={`rounded-[4px] border px-2 py-0.5 text-xs font-medium ${levelStyles[level]}`}>{level}</span>
        </div>

        <h3 className="mb-2 text-base font-semibold text-gray-900">{title}</h3>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">{description}</p>

        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{domain}</span>
      </div>
    </Link>
  )
}
