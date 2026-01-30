"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Download, FileText, Presentation, FileSpreadsheet, FileType, ZoomIn, ZoomOut } from "lucide-react"
import Link from "next/link"
import type { CourseItem, CourseData } from "@/lib/course-data"

interface MaterialPreviewProps {
  material: CourseItem
  course: CourseData
}

const fileTypeConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  pdf: { icon: FileText, label: "PDF Document", color: "text-red-600 bg-red-50" },
  doc: { icon: FileType, label: "Word Document", color: "text-blue-600 bg-blue-50" },
  ppt: { icon: Presentation, label: "PowerPoint", color: "text-orange-600 bg-orange-50" },
  xls: { icon: FileSpreadsheet, label: "Excel Spreadsheet", color: "text-emerald-600 bg-emerald-50" },
}

export function MaterialPreview({ material, course }: MaterialPreviewProps) {
  const [zoom, setZoom] = useState(100)
  const config = material.fileType ? fileTypeConfig[material.fileType] : fileTypeConfig.pdf
  const Icon = config.icon

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="w-full max-w-none px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/courses/${course.id}`}
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${config.color.split(" ")[1]}`}>
                  <Icon className={`h-5 w-5 ${config.color.split(" ")[0]}`} />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-900 truncate max-w-md">{material.title}</h1>
                  <p className="text-xs text-gray-500">{config.label}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Zoom controls */}
              <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
                <button
                  onClick={handleZoomOut}
                  className="rounded p-1.5 hover:bg-gray-200 transition-colors"
                  title="Zoom out"
                >
                  <ZoomOut className="h-4 w-4 text-gray-600" />
                </button>
                <span className="px-2 text-xs font-medium text-gray-600 min-w-[3rem] text-center">{zoom}%</span>
                <button
                  onClick={handleZoomIn}
                  className="rounded p-1.5 hover:bg-gray-200 transition-colors"
                  title="Zoom in"
                >
                  <ZoomIn className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              {/* Download button */}
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-4xl">
          <div
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
            {/* Simulated document preview */}
            <div className="aspect-[8.5/11] bg-white p-12">
              <div className="h-full flex flex-col">
                {/* Document header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{material.title}</h2>
                  <p className="text-sm text-gray-500">
                    {course.title} - {course.code}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Instructor: {course.instructor}</p>
                </div>

                {/* Simulated content */}
                <div className="flex-1 space-y-6">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>

                  <div>
                    <div className="h-5 bg-gray-300 rounded w-1/3 mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-4/5 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="h-4 bg-gray-300 rounded w-1/4 mb-3" />
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                      <div className="h-3 bg-gray-200 rounded w-4/5" />
                    </div>
                  </div>

                  <div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </div>
                </div>

                {/* Page number */}
                <div className="text-center pt-6 border-t border-gray-100 mt-6">
                  <span className="text-xs text-gray-400">Page 1 of 1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview note */}
          <p className="text-center text-xs text-gray-400 mt-4">
            This is a preview representation. Click "Download" to get the full document.
          </p>
        </div>
      </div>
    </div>
  )
}
