"use client"

import Link from "next/link"
import { FacultyNavbar } from "@/components/faculty/navbar"
import { ArrowLeft } from "lucide-react"

interface Props {
  params: Promise<{
    courseId: string
    materialId: string
  }>
}

export default async function EditMaterialPage({ params }: Props) {
  const { courseId, materialId } = await params

  return (
    <>
      <FacultyNavbar />
      <main className="min-h-screen bg-slate-50 px-6 py-8">
        <div className="mx-auto max-w-2xl">
          {/* Back Button */}
          <Link
            href={`/faculty/courses/${courseId}/materials`}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Materials
          </Link>

          {/* Form */}
          <div className="rounded-lg border border-slate-200 bg-white p-8">
            <h1 className="text-2xl font-bold text-slate-900">Edit Material</h1>

            <form className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Material Title
                </label>
                <input
                  type="text"
                  defaultValue="HTML Fundamentals"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  defaultValue="Comprehensive guide to HTML fundamentals including semantic elements and best practices."
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Current File</label>
                <p className="mt-2 text-blue-600 hover:underline">HTML_Fundamentals.pdf</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <Link
                  href={`/faculty/courses/${courseId}/materials`}
                  className="flex-1 rounded-lg border border-slate-200 py-2 text-center font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
