"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useNavigation } from "@/lib/navigation"

const pendingProblems = [
  { id: 1, title: "Two Sum", status: "WA", difficulty: "Easy" },
  { id: 2, title: "Merge Intervals", status: "TLE", difficulty: "Medium" },
  { id: 3, title: "Binary Tree Level Order", status: "WA", difficulty: "Medium" },
  { id: 4, title: "LRU Cache", status: "CE", difficulty: "Hard" },
  { id: 5, title: "Valid Parentheses", status: "WA", difficulty: "Easy" },
]

const statusConfig: Record<string, { text: string; bg: string }> = {
  WA: { text: "text-red-600", bg: "bg-red-50" },
  TLE: { text: "text-amber-600", bg: "bg-amber-50" },
  CE: { text: "text-purple-600", bg: "bg-purple-50" },
  Pending: { text: "text-blue-600", bg: "bg-blue-50" },
}

const difficultyColors: Record<string, string> = {
  Easy: "text-emerald-600",
  Medium: "text-amber-600",
  Hard: "text-red-600",
}

export function PendingProblems() {
  const { handleProblemClick } = useNavigation()

  return (
    <section className="overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 bg-blue-100">
        <h2 className="font-semibold text-foreground">Pending Problems</h2>
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-600">
          {pendingProblems.length}
        </span>
      </div>
      <ScrollArea className="h-[220px]">
        <div className="divide-y divide-gray-50">
          {pendingProblems.map((problem) => {
            const config = statusConfig[problem.status]
            return (
              <button
                key={problem.id}
                onClick={() => handleProblemClick(problem.id)}
                className="flex w-full cursor-pointer items-center justify-between px-5 py-3 transition-colors hover:bg-gray-50 text-left"
              >
                <div>
                  <span className="font-medium text-foreground">{problem.title}</span>
                  <p className={`text-xs ${difficultyColors[problem.difficulty]}`}>{problem.difficulty}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}>
                  {problem.status}
                </span>
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </section>
  )
}
