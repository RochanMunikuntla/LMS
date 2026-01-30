"use client"

import { ChevronDown } from "lucide-react"

interface CourseFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  semesterFilter: string
  setSemesterFilter: (semester: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
}

export function CourseFilters({
  searchQuery,
  setSearchQuery,
  semesterFilter,
  setSemesterFilter,
  sortBy,
  setSortBy,
}: CourseFiltersProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {/* All Filter */}
      <div className="relative">
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 bg-white"
        >
          <option value="all">All</option>
          <option value="B.Tech - II Semester">B.Tech - II Semester</option>
          <option value="B.Tech - IV Semester">B.Tech - IV Semester</option>
          <option value="Training">Training</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-3 pr-3 py-2 text-sm border border-gray-200 rounded-lg w-48 focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Sort By */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 bg-white"
        >
          <option value="name">Sort by course name</option>
          <option value="progress">Sort by progress</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>

      {/* View Toggle */}
      <div className="relative">
        <select className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 bg-white">
          <option value="card">Card</option>
          <option value="list">List</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}
