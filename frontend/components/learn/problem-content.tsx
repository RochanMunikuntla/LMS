import type { ProblemDetail } from "@/lib/roadmap-data"

interface ProblemContentProps {
  problem: ProblemDetail
  difficulty: "Easy" | "Medium" | "Hard"
}

const difficultyStyles = {
  Easy: "bg-emerald-900/50 text-emerald-400",
  Medium: "bg-amber-900/50 text-amber-400",
  Hard: "bg-rose-900/50 text-rose-400",
}

export function ProblemContent({ problem, difficulty }: ProblemContentProps) {
  return (
    <div className="h-full overflow-y-auto p-6 bg-[#1e1e1e]">
      {/* Title and difficulty */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-gray-100">{problem.title}</h1>
          <span className={`rounded-[4px] px-2 py-0.5 text-xs font-medium ${difficultyStyles[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>

      {/* Description */}
      <section className="mb-6">
        <h2 className="mb-2 text-sm font-semibold text-gray-200">Description</h2>
        <p className="text-sm leading-relaxed text-gray-400">{problem.description}</p>
      </section>

      {/* Problem Statement */}
      <section className="mb-6">
        <h2 className="mb-2 text-sm font-semibold text-gray-200">Problem Statement</h2>
        <p className="text-sm leading-relaxed text-gray-400">{problem.problemStatement}</p>
      </section>

      {/* Input Format */}
      <section className="mb-6">
        <h2 className="mb-2 text-sm font-semibold text-gray-200">Input Format</h2>
        <div className="rounded-[4px] bg-[#2d2d2d] p-3">
          <p className="font-mono text-sm text-gray-300">{problem.inputFormat}</p>
        </div>
      </section>

      {/* Output Format */}
      <section className="mb-6">
        <h2 className="mb-2 text-sm font-semibold text-gray-200">Output Format</h2>
        <div className="rounded-[4px] bg-[#2d2d2d] p-3">
          <p className="font-mono text-sm text-gray-300">{problem.outputFormat}</p>
        </div>
      </section>

      {/* Examples */}
      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold text-gray-200">Examples</h2>
        {problem.examples.map((example, index) => (
          <div key={index} className="mb-4 rounded-[6px] border border-[#333] overflow-hidden">
            <div className="bg-[#262626] px-4 py-2 border-b border-[#333]">
              <span className="text-xs font-medium text-gray-400">Example {index + 1}</span>
            </div>
            <div className="p-4 space-y-3 bg-[#1e1e1e]">
              <div>
                <span className="text-xs font-medium text-gray-500">Input:</span>
                <pre className="mt-1 rounded-[4px] bg-[#0d0d0d] p-3 text-sm text-gray-100 overflow-x-auto">
                  {example.input}
                </pre>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500">Output:</span>
                <pre className="mt-1 rounded-[4px] bg-[#0d0d0d] p-3 text-sm text-gray-100 overflow-x-auto">
                  {example.output}
                </pre>
              </div>
              {example.explanation && (
                <div>
                  <span className="text-xs font-medium text-gray-500">Explanation:</span>
                  <p className="mt-1 text-sm text-gray-400">{example.explanation}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Constraints */}
      {problem.constraints.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-semibold text-gray-200">Constraints</h2>
          <ul className="list-inside list-disc space-y-1">
            {problem.constraints.map((constraint, index) => (
              <li key={index} className="text-sm text-gray-400">
                <code className="rounded bg-[#2d2d2d] px-1.5 py-0.5 font-mono text-xs text-gray-300">{constraint}</code>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
