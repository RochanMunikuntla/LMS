"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const announcements = [
  {
    id: 1,
    title: "Spring 2025 Enrollment is Now Open",
    excerpt: "Register for your courses before January 31st deadline",
    date: "2026-01-15",
  },
  {
    id: 2,
    title: "New Lab Equipment Available",
    excerpt: "The computer lab has been upgraded with new workstations",
    date: "2026-01-12",
  },
  {
    id: 3,
    title: "Midterm Schedule Announced",
    excerpt: "Check the academic calendar for exam dates and locations",
    date: "2026-01-10",
  },
]

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/student/home" className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Link
              key={announcement.id}
              href={`/announcements/${announcement.id}`}
              className="block rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-md hover:border-blue-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {announcement.title}
                  </h2>
                  <p className="mt-2 text-gray-600">{announcement.excerpt}</p>
                  <p className="mt-3 text-sm text-gray-500">
                    {new Date(announcement.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
