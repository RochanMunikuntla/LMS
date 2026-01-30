"use client"

import Link from "next/link"
import { Check, Circle, Minus } from "lucide-react"

interface Problem {
  problemId: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  status: "solved" | "attempted" | "unattempted"
}

interface ProblemTableProps {
  problems: Problem[]
}

export function ProblemTable({ problems }: ProblemTableProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600"
      case "Medium":
        return "text-amber-600"
      case "Hard":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "solved":
        return <Check className="h-4 w-4 text-green-500" />
      case "attempted":
        return <Minus className="h-4 w-4 text-amber-500" />
      default:
        return <Circle className="h-4 w-4 text-gray-300" />
    }
  }

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-[40px_80px_1fr_100px_80px] bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
        <div></div>
        <div>ID</div>
        <div>Title</div>
        <div>Difficulty</div>
        <div className="text-right">Action</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {problems.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500 text-sm">No problems found matching your criteria.</div>
        ) : (
          problems.map((problem) => (
            <div
              key={problem.problemId}
              className="grid grid-cols-[40px_80px_1fr_100px_80px] px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer items-center"
            >
              <div>{getStatusIcon(problem.status)}</div>
              <div className="text-gray-500 font-mono text-xs">{problem.problemId}</div>
              <div className="font-medium text-gray-800">{problem.title}</div>
              <div className={`text-sm ${getDifficultyColor(problem.difficulty)}`}>{problem.difficulty}</div>
              <div className="text-right">
                <Link
                  href={`/practice/${problem.problemId}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                >
                  Solve
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
