"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { FacultyNavbar } from "@/components/faculty/navbar"
import { ArrowLeft, Trash2, Edit2 } from "lucide-react"

interface Announcement {
  id: number
  title: string
  message: string
  postedDate: string
}

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Assignment 1 Deadline Extended",
    message: "The deadline for Assignment 1 has been extended to February 20, 2024.",
    postedDate: "2024-02-10",
  },
  {
    id: 2,
    title: "Quiz Next Week",
    message: "Reminder: Quiz on CSS Flexbox will be held on February 15, 2024.",
    postedDate: "2024-02-08",
  },
]

export default function AnnouncementsPage() {
  const params = useParams()
  const courseId = params?.courseId as string
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements)

  const handleDelete = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id))
  }

  return (
    <>
      <FacultyNavbar />
      <main className="min-h-screen bg-white px-8 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href={`/faculty/courses/${courseId}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Course
            </Link>
            <div className="mt-4 h-px bg-gray-200" />
          </div>

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
              <p className="mt-2 text-gray-600">Post and manage announcements for your class</p>
            </div>
            <Link
              href={`/faculty/courses/${courseId}/announcements/create`}
              className="rounded-[10px] bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Post New
            </Link>
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="rounded-[20px] border border-gray-200 bg-white p-6 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{announcement.title}</h3>
                    <p className="mt-2 text-gray-700">{announcement.message}</p>
                    <p className="mt-3 text-sm text-gray-500">Posted on: {announcement.postedDate}</p>
                  </div>
                  <div className="ml-6 flex gap-2">
                    <Link
                      href={`/faculty/courses/${courseId}/announcements/${announcement.id}/edit`}
                      className="rounded-[10px] bg-blue-50 p-3 text-blue-600 hover:bg-blue-100"
                      title="Edit"
                    >
                      <Edit2 className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="rounded-[10px] bg-red-50 p-3 text-red-600 hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {announcements.length === 0 && (
            <div className="rounded-[20px] border border-gray-200 bg-white p-12 text-center">
              <p className="text-gray-600">No announcements yet. Post one to get started.</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
