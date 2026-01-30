"use client"

import { CheckCircle2 } from "lucide-react"

interface ComplexityTabProps {
  problemId: string
}

const complexityData: Record<string, { time: string; space: string; explanation: string; pitfalls: string[] }> = {
  "1-1-1": {
    time: "O(1)",
    space: "O(1)",
    explanation: "The program simply prints a constant string. There are no loops or recursive calls, so the time and space complexity are both constant.",
    pitfalls: [
      "Forgetting to include the exact punctuation and capitalization",
      "Adding extra whitespace or newlines"
    ]
  },
  "1-1-2": {
    time: "O(1)",
    space: "O(1)",
    explanation: "Reading two integers and adding them takes constant time. No data structures are used that scale with input size.",
    pitfalls: [
      "Integer overflow for very large numbers - use long long instead of int",
      "Incorrect parsing of input format",
      "Forgetting to handle negative numbers"
    ]
  },
  "1-1-3": {
    time: "O(1)",
    space: "O(1)",
    explanation: "Simple multiplication of two numbers. No loops or data structures involved, making it constant time and space.",
    pitfalls: [
      "Integer overflow for large dimensions",
      "Not reading input correctly",
      "Typos in the calculation"
    ]
  }
}

export function ComplexityTab({ problemId }: ComplexityTabProps) {
  const data = complexityData[problemId]

  if (!data) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Complexity analysis not available</p>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6 bg-[#1e1e1e]">
      {/* Solved badge */}
      <div className="mb-6 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        <span className="text-sm font-medium text-emerald-400">Problem Solved!</span>
      </div>

      {/* Complexity section */}
      <div className="mb-6">
        <h2 className="mb-4 text-sm font-semibold text-gray-200">Optimal Complexity</h2>
        <div className="space-y-3">
          <div className="rounded-[4px] border border-[#333] bg-[#262626] p-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-400">Time Complexity</span>
              <span className="font-mono text-sm font-semibold text-blue-400">{data.time}</span>
            </div>
          </div>
          <div className="rounded-[4px] border border-[#333] bg-[#262626] p-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-400">Space Complexity</span>
              <span className="font-mono text-sm font-semibold text-blue-400">{data.space}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mb-6">
        <h3 className="mb-2 text-xs font-semibold text-gray-300">Explanation</h3>
        <p className="text-sm leading-relaxed text-gray-400">{data.explanation}</p>
      </div>

      {/* Common pitfalls */}
      <div>
        <h3 className="mb-3 text-xs font-semibold text-gray-300">Common Pitfalls</h3>
        <ul className="space-y-2">
          {data.pitfalls.map((pitfall, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-gray-400">
              <span className="text-rose-400 font-bold">•</span>
              <span>{pitfall}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
