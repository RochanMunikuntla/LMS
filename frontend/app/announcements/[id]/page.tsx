"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const announcementDetails: Record<string, { title: string; content: string; date: string }> = {
  "1": {
    title: "Spring 2025 Enrollment is Now Open",
    content:
      "We are pleased to announce that enrollment for Spring 2025 is now officially open. All students are required to register for their courses before the deadline of January 31st, 2026.\n\nPlease log into the student portal and select your courses for the upcoming semester. If you need assistance with course selection, please contact your academic advisor.\n\nNote: Some popular courses may fill up quickly, so we recommend registering early to secure your preferred schedule.",
    date: "2026-01-15",
  },
  "2": {
    title: "New Lab Equipment Available",
    content:
      "The Information Technology department is excited to announce the upgrade of our computer laboratories with new workstations and the latest software.\n\nThe new equipment features:\n- High-performance processors\n- 16GB RAM on all machines\n- Latest development tools and IDEs\n- Improved networking capabilities\n\nLab hours remain the same: Monday-Friday 8:00 AM to 8:00 PM. Weekend access available with supervisor permission.",
    date: "2026-01-12",
  },
  "3": {
    title: "Midterm Schedule Announced",
    content:
      "The midterm examination schedule for Spring 2025 has been finalized and is now available in the academic calendar.\n\nKey dates:\n- Midterm exams will begin on March 1st, 2026\n- All exams will conclude by March 15th, 2026\n- Exam locations and timings are available on the student portal\n- Students with conflicts should contact their instructors by February 15th\n\nPlease plan your study schedule accordingly. Good luck with your exams!",
    date: "2026-01-10",
  },
}

interface AnnouncementDetailPageProps {
  params: {
    id: string
  }
}

export default function AnnouncementDetailPage({ params }: AnnouncementDetailPageProps) {
  const announcement = announcementDetails[params.id] || announcementDetails["1"]

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/announcements" className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4" />
            Back to Announcements
          </Link>
        </div>

        {/* Content */}
        <article>
          <header className="mb-8 border-b border-gray-200 pb-8">
            <h1 className="text-4xl font-bold text-gray-900">{announcement.title}</h1>
            <time className="mt-4 block text-sm text-gray-600">
              {new Date(announcement.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </header>

          <div className="prose prose-sm max-w-none text-gray-700">
            {announcement.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4 whitespace-pre-wrap leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
