"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, FileText, BookOpen, HelpCircle, FileSpreadsheet, FileType, Presentation } from "lucide-react"
import type { CourseItem } from "@/lib/course-data"

interface CourseAccordionProps {
  title: string
  type: "assignments" | "materials" | "quizzes"
  items: CourseItem[]
  courseId: number
}

const sectionIconMap = {
  assignments: BookOpen,
  materials: FileText,
  quizzes: HelpCircle,
}

const fileTypeIconMap: Record<string, React.ElementType> = {
  pdf: FileText,
  doc: FileType,
  ppt: Presentation,
  xls: FileSpreadsheet,
}

export function CourseAccordion({ title, type, items, courseId }: CourseAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const SectionIcon = sectionIconMap[type]

  const getItemIcon = (item: CourseItem) => {
    if (type === "materials" && item.fileType) {
      return fileTypeIconMap[item.fileType] || FileText
    }
    return sectionIconMap[type]
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2">
            <SectionIcon className="h-5 w-5 text-blue-600" />
          </div>
          <span className="text-base font-semibold text-gray-900">{title}</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {items.length}
          </span>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="border-t border-gray-100 px-5 py-3">
          {items.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-400">No {title.toLowerCase()} available</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {items.map((item) => {
                const ItemIcon = getItemIcon(item)
                return (
                  <Link
                    key={item.id}
                    href={`/courses/${courseId}/${type}/${item.id}`}
                    className="group flex items-center gap-4 py-3 transition-colors hover:bg-gray-50 rounded-lg px-2 -mx-2"
                  >
                    <div className="rounded-lg bg-gray-100 p-2 transition-colors group-hover:bg-blue-100">
                      <ItemIcon className="h-4 w-4 text-gray-500 group-hover:text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 truncate">
                        {item.title}
                      </h4>
                      {item.dueDate && (
                        <p className="mt-0.5 text-xs text-gray-500">
                          Due: {item.dueDate} {item.dueTime && `at ${item.dueTime}`}
                        </p>
                      )}
                      {type === "materials" && item.fileType && (
                        <p className="mt-0.5 text-xs text-gray-400 uppercase">{item.fileType} Document</p>
                      )}
                      {type === "quizzes" && item.duration && (
                        <p className="mt-0.5 text-xs text-gray-500">Duration: {item.duration}</p>
                      )}
                    </div>
                    <ChevronDown className="h-4 w-4 -rotate-90 text-gray-300 group-hover:text-blue-500" />
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
