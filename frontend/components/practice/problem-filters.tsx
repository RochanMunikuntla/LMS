"use client"

import { Search } from "lucide-react"

interface ProblemFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  difficultyFilter: string
  setDifficultyFilter: (difficulty: string) => void
}

export function ProblemFilters({
  searchQuery,
  setSearchQuery,
  difficultyFilter,
  setDifficultyFilter,
}: ProblemFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md w-64 focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Difficulty Filter */}
      <select
        value={difficultyFilter}
        onChange={(e) => setDifficultyFilter(e.target.value)}
        className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-blue-400 bg-white"
      >
        <option value="all">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  )
}
