"use client"

import { useState, useMemo } from "react"
import { ProblemFilters } from "./problem-filters"
import { ProblemTable } from "./problem-table"
import { practiceProblems } from "@/lib/practice-data"

export function PracticePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  const problemsData = practiceProblems.map((p) => ({
    problemId: p.id,
    title: p.title,
    difficulty: p.difficulty,
    status: p.status,
  }))

  const filteredProblems = useMemo(() => {
    return problemsData.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.problemId.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDifficulty = difficultyFilter === "all" || problem.difficulty === difficultyFilter
      return matchesSearch && matchesDifficulty
    })
  }, [searchQuery, difficultyFilter, problemsData])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Practice</h1>
          <p className="text-sm text-gray-500 mt-1">Coding Problems</p>
        </div>

        {/* Filters */}
        <div className="mb-4">
          <ProblemFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            difficultyFilter={difficultyFilter}
            setDifficultyFilter={setDifficultyFilter}
          />
        </div>

        {/* Problem Count */}
        <div className="mb-3 text-xs text-gray-500">
          {filteredProblems.length} problem{filteredProblems.length !== 1 ? "s" : ""}
        </div>

        {/* Problem Table */}
        <ProblemTable problems={filteredProblems} />
      </div>
    </div>
  )
}
