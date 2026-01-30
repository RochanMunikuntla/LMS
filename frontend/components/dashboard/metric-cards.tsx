"use client"

import { useState } from "react"
import { GraduationCap, Code2, FolderKanban, ClipboardList } from "lucide-react"
import {
  PendingAssignmentsModal,
  SolvedProblemsModal,
  ActiveProjectsModal,
  EnrolledRoadmapsModal,
} from "./metric-modals"

type MetricType = "courses" | "problems" | "projects" | "assignments"

const metrics = [
  {
    label: "ENROLLED ROADMAPS",
    value: 4,
    metricType: "courses" as MetricType,
    icon: GraduationCap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "PROBLEMS SOLVED",
    value: 128,
    metricType: "problems" as MetricType,
    icon: Code2,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    label: "ACTIVE PROJECTS",
    value: 3,
    metricType: "projects" as MetricType,
    icon: FolderKanban,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    label: "ASSIGNMENTS PENDING",
    value: 4,
    metricType: "assignments" as MetricType,
    icon: ClipboardList,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
]

export function MetricCards() {
  const [activeModal, setActiveModal] = useState<MetricType | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <button
              key={metric.label}
              onClick={() => setActiveModal(metric.metricType)}
              className="group flex items-center gap-3 rounded-[20px] border border-gray-100 bg-white px-4 py-3 shadow-sm transition-all hover:shadow-md text-left cursor-pointer"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${metric.iconBg}`}>
                <Icon className={`h-5 w-5 ${metric.iconColor}`} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{metric.label}</p>
                <p className="mt-0.5 text-2xl font-bold text-foreground">{metric.value}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Modals */}
      <EnrolledRoadmapsModal isOpen={activeModal === "courses"} onClose={() => setActiveModal(null)} />
      <SolvedProblemsModal isOpen={activeModal === "problems"} onClose={() => setActiveModal(null)} />
      <ActiveProjectsModal isOpen={activeModal === "projects"} onClose={() => setActiveModal(null)} />
      <PendingAssignmentsModal isOpen={activeModal === "assignments"} onClose={() => setActiveModal(null)} />
    </>
  )
}
