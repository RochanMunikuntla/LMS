"use client"

import { Search, SlidersHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectFiltersProps {
  onNewProject: () => void
}

export function ProjectFilters({ onNewProject }: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full rounded-[12px] border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="relative flex-1 min-w-[200px]">
        <SlidersHorizontal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Filter by tags"
          className="w-full rounded-[12px] border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <Button
        onClick={onNewProject}
        className="rounded-[12px] bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        New Project
      </Button>
    </div>
  )
}
