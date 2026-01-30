"use client"

import { CheckCircle2, XCircle } from "lucide-react"

interface TestResult {
  testNumber: number
  input: string
  expectedOutput: string
  userOutput: string
  passed: boolean
}

interface TestResultsPanelProps {
  results: TestResult[]
}

export function TestResultsPanel({ results }: TestResultsPanelProps) {
  const passedCount = results.filter((r) => r.passed).length
  const totalCount = results.length

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-t border-[#333]">
      {/* Header */}
      <div className="border-b border-[#333] bg-[#262626] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-200">Test Results</span>
          <span className="text-xs text-gray-400">
            {passedCount}/{totalCount} passed
          </span>
        </div>
      </div>

      {/* Results list */}
      <div className="flex-1 overflow-y-auto space-y-2 p-4">
        {results.map((result) => (
          <div key={result.testNumber} className="rounded-[4px] border border-[#333] bg-[#262626] overflow-hidden">
            {/* Test header */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#1e1e1e]">
              {result.passed ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              ) : (
                <XCircle className="h-4 w-4 text-rose-500" />
              )}
              <span className="text-xs font-medium text-gray-300">
                Test Case {result.testNumber}
              </span>
              <span className="text-xs text-gray-500 ml-auto">
                {result.passed ? "Passed" : "Failed"}
              </span>
            </div>

            {/* Test details */}
            <div className="px-3 py-2 space-y-2 text-xs">
              <div>
                <span className="text-gray-500">Input:</span>
                <pre className="mt-1 bg-[#0d0d0d] p-2 rounded text-gray-300 overflow-x-auto font-mono">
                  {result.input}
                </pre>
              </div>
              <div>
                <span className="text-gray-500">Expected:</span>
                <pre className="mt-1 bg-[#0d0d0d] p-2 rounded text-emerald-400 overflow-x-auto font-mono">
                  {result.expectedOutput}
                </pre>
              </div>
              <div>
                <span className="text-gray-500">Output:</span>
                <pre
                  className={`mt-1 bg-[#0d0d0d] p-2 rounded overflow-x-auto font-mono ${
                    result.passed ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {result.userOutput}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
