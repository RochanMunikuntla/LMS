"use client"

import { useState } from "react"
import { ChevronDown, Circle, CheckCircle2, Lock } from "lucide-react"
import Link from "next/link"
import type { Module } from "@/lib/roadmap-data"

interface ModuleAccordionProps {
  modules: Module[]
  roadmapId: number
  isLocked: boolean // Added isLocked prop
}

const difficultyStyles: Record<string, string> = {
  Easy: "text-emerald-600",
  Medium: "text-amber-600",
  Hard: "text-rose-600",
}

export function ModuleAccordion({ modules, roadmapId, isLocked }: ModuleAccordionProps) {
  const [expandedModules, setExpandedModules] = useState<number[]>([])

  const toggleModule = (moduleId: number) => {
    if (isLocked) return
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  return (
    <div className="space-y-3">
      {modules.map((module) => {
        const isExpanded = expandedModules.includes(module.id) && !isLocked
        const completedCount = module.problems.filter((p) => p.status === "completed").length
        const totalCount = module.problems.length

        return (
          <div
            key={module.id}
            className={`rounded-[6px] border bg-white ${isLocked ? "border-gray-200 opacity-75" : "border-gray-200"}`}
          >
            <button
              onClick={() => toggleModule(module.id)}
              disabled={isLocked}
              className={`flex w-full items-center justify-between p-4 text-left transition-colors ${
                isLocked ? "cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-[4px] text-sm font-semibold ${
                    isLocked ? "bg-gray-100 text-gray-400" : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {isLocked ? <Lock className="h-4 w-4" /> : module.number}
                </span>
                <div>
                  <h3 className={`text-sm font-medium ${isLocked ? "text-gray-500" : "text-gray-900"}`}>
                    {module.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">{module.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {isLocked ? (
                  <span className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                    Locked
                  </span>
                ) : (
                  <>
                    <span className="text-xs text-gray-500">
                      {completedCount}/{totalCount} completed
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </>
                )}
              </div>
            </button>

            {isExpanded && !isLocked && (
              <div className="border-t border-gray-100 bg-gray-50/50">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs text-gray-500">
                      <th className="px-4 py-2 text-left font-medium">Problem</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                      <th className="px-4 py-2 text-left font-medium">Difficulty</th>
                      <th className="px-4 py-2 text-right font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {module.problems.map((problem) => (
                      <tr key={problem.id} className="border-b border-gray-100 last:border-0">
                        <td className="px-4 py-3 text-sm text-gray-900">{problem.name}</td>
                        <td className="px-4 py-3">
                          {problem.status === "completed" ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          ) : problem.status === "attempted" ? (
                            <Circle className="h-4 w-4 fill-amber-100 text-amber-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-300" />
                          )}
                        </td>
                        <td className={`px-4 py-3 text-xs font-medium ${difficultyStyles[problem.difficulty]}`}>
                          {problem.difficulty}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Link
                            href={`/learn/${roadmapId}/${module.id}/${problem.id}`}
                            className="text-xs font-medium text-blue-600 hover:text-blue-700"
                          >
                            Solve
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
