"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PracticeProblemContent } from "./practice-problem-content"
import { PracticeCodeEditor } from "./practice-code-editor"
import { TestResultsPanel } from "@/components/shared/test-results-panel"
import { ComplexityTab } from "@/components/shared/complexity-tab"
import type { PracticeProblem } from "@/lib/practice-data"

interface PracticeSplitPaneProps {
  problem: PracticeProblem
}

interface TestResult {
  testNumber: number
  input: string
  expectedOutput: string
  userOutput: string
  passed: boolean
}

export function PracticeSplitPane({ problem }: PracticeSplitPaneProps) {
  const [leftWidth, setLeftWidth] = useState(50)
  const [showResults, setShowResults] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [activeTab, setActiveTab] = useState<"content" | "complexity">("content")
  const [allTestsPassed, setAllTestsPassed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMouseDown = useCallback(() => {
    isDragging.current = true
    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

    if (newLeftWidth >= 25 && newLeftWidth <= 75) {
      setLeftWidth(newLeftWidth)
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
    document.body.style.cursor = ""
    document.body.style.userSelect = ""
  }, [])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  useEffect(() => {
    const resizeObserverError = (e: ErrorEvent) => {
      if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
        e.stopImmediatePropagation()
      }
    }
    window.addEventListener("error", resizeObserverError)
    return () => window.removeEventListener("error", resizeObserverError)
  }, [])

  const handleRun = () => {
    // Simulate running visible test cases
    const visibleResults: TestResult[] = problem.examples.slice(0, 2).map((tc, idx) => ({
      testNumber: idx + 1,
      input: tc.input,
      expectedOutput: tc.output,
      userOutput: tc.output,
      passed: true,
    }))
    setTestResults(visibleResults)
    setShowResults(true)
    setAllTestsPassed(false)
  }

  const handleSubmit = () => {
    // Simulate running all test cases
    const allResults: TestResult[] = problem.examples.map((tc, idx) => ({
      testNumber: idx + 1,
      input: tc.input,
      expectedOutput: tc.output,
      userOutput: tc.output,
      passed: true,
    }))
    
    const passed = allResults.every(r => r.passed)
    setTestResults(allResults)
    setShowResults(true)
    setAllTestsPassed(passed)
    if (passed) {
      setActiveTab("complexity")
    }
  }

  return (
    <div className="flex h-screen flex-col bg-[#1a1a1a]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#333] bg-[#262626] px-4 py-2">
        <div className="flex items-center gap-4">
          <Link href="/practice" className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <span className="text-sm text-[#444]">|</span>
          <span className="text-sm text-gray-400">Practice</span>
        </div>
        <div className="text-sm font-medium text-gray-100">
          #{problem.id} - {problem.title}
        </div>
      </header>

      {/* Split pane layout */}
      <div ref={containerRef} className="flex flex-1 overflow-hidden">
        {/* Left: Problem content with tabs */}
        <div className="overflow-hidden bg-[#1e1e1e] flex flex-col" style={{ width: `${leftWidth}%` }}>
          {/* Tabs */}
          <div className="flex border-b border-[#333] bg-[#262626]">
            <button
              onClick={() => setActiveTab("content")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "content"
                  ? "text-gray-100 border-blue-500"
                  : "text-gray-400 border-transparent hover:text-gray-300"
              }`}
            >
              Description
            </button>
            {allTestsPassed && (
              <button
                onClick={() => setActiveTab("complexity")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "complexity"
                    ? "text-gray-100 border-blue-500"
                    : "text-gray-400 border-transparent hover:text-gray-300"
                }`}
              >
                Complexity
              </button>
            )}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === "content" ? (
              <PracticeProblemContent problem={problem} />
            ) : (
              <ComplexityTab problemId={`practice-${problem.id}`} />
            )}
          </div>
        </div>

        {/* Resizable divider */}
        <div
          onMouseDown={handleMouseDown}
          className="group relative w-1 cursor-col-resize bg-[#333] hover:bg-blue-500 transition-colors"
        >
          <div className="absolute inset-y-0 -left-1 -right-1 z-10" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col gap-1">
              <div className="h-1 w-1 rounded-full bg-blue-400" />
              <div className="h-1 w-1 rounded-full bg-blue-400" />
              <div className="h-1 w-1 rounded-full bg-blue-400" />
            </div>
          </div>
        </div>

        {/* Right: Code editor and results */}
        <div className="flex flex-col bg-[#1e1e1e]" style={{ width: `${100 - leftWidth}%` }}>
          {/* Code editor section */}
          <div
            className="overflow-hidden"
            style={{ height: showResults ? "65%" : "100%" }}
          >
            <PracticeCodeEditor starterCode={problem.starterCode} />
          </div>

          {/* Test results section */}
          {showResults && (
            <div style={{ height: "25%" }} className="overflow-hidden">
              <TestResultsPanel results={testResults} />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-[#333] bg-[#262626] px-4 py-3">
            <button
              onClick={handleRun}
              className="rounded border border-[#444] bg-[#333] px-4 py-2 text-sm font-medium text-gray-200 hover:bg-[#3a3a3a]"
            >
              Run
            </button>
            <button
              onClick={handleSubmit}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
