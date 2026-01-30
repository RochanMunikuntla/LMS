"use client"

import type { PracticeProblem } from "@/lib/practice-data"

interface PracticeProblemContentProps {
  problem: PracticeProblem
}

export function PracticeProblemContent({ problem }: PracticeProblemContentProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400"
      case "Medium":
        return "text-amber-400"
      case "Hard":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6 text-gray-300">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-100 mb-2">{problem.title}</h1>

      {/* Difficulty + ID */}
      <div className="flex items-center gap-3 mb-6 text-sm">
        <span className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</span>
        <span className="text-gray-500">•</span>
        <span className="text-gray-500">Problem #{problem.id}</span>
      </div>

      {/* Description */}
      <section className="mb-6">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Description</h2>
        <p className="text-sm leading-relaxed text-gray-300">{problem.description}</p>
      </section>

      {/* Constraints */}
      <section className="mb-6">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Constraints</h2>
        <ul className="space-y-1">
          {problem.constraints.map((constraint, idx) => (
            <li key={idx} className="text-sm text-gray-300 font-mono">
              • {constraint}
            </li>
          ))}
        </ul>
      </section>

      {/* Tags */}
      <section className="mb-6">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 text-xs rounded border border-gray-600 text-gray-400 bg-gray-800">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Input Format */}
      <section className="mb-6">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Input Format</h2>
        <p className="text-sm text-gray-300">{problem.inputFormat}</p>
      </section>

      {/* Output Format */}
      <section className="mb-6">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Output Format</h2>
        <p className="text-sm text-gray-300">{problem.outputFormat}</p>
      </section>

      {/* Examples */}
      <section className="mb-6">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">Examples</h2>
        <div className="space-y-4">
          {problem.examples.map((example, idx) => (
            <div key={idx} className="rounded border border-gray-700 bg-gray-800 overflow-hidden">
              <div className="px-3 py-2 text-xs font-medium text-gray-400 bg-gray-750 border-b border-gray-700">
                Example {idx + 1}
              </div>
              <div className="p-3 space-y-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Input:</div>
                  <pre className="text-sm font-mono text-gray-300 bg-gray-900 p-2 rounded overflow-x-auto">
                    {example.input}
                  </pre>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Output:</div>
                  <pre className="text-sm font-mono text-gray-300 bg-gray-900 p-2 rounded overflow-x-auto">
                    {example.output}
                  </pre>
                </div>
                {example.explanation && (
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Explanation:</div>
                    <p className="text-sm text-gray-400">{example.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
