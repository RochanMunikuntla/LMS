"use client"

import { Search } from "lucide-react"

interface RoadmapSearchProps {
  value: string
  onChange: (value: string) => void
}

export function RoadmapSearch({ value, onChange }: RoadmapSearchProps) {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search roadmaps..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[6px] border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
      />
    </div>
  )
}
