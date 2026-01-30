"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { FacultyNavbar } from "@/components/faculty/navbar"
import { ArrowLeft, Upload, X } from "lucide-react"

export default function EditAssignmentPage() {
  const params = useParams()
  const courseId = params?.courseId as string
  const assignmentId = params?.assignmentId as string
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles([...uploadedFiles, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  return (
    <>
      <FacultyNavbar />
      <main className="min-h-screen bg-white px-6 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href={`/faculty/courses/${courseId}/assignments`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Assignments
            </Link>
            <div className="mt-4 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <div className="rounded-[12px] border border-gray-200 bg-white p-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Assignment</h1>

            <form className="mt-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Title</label>
                <input
                  type="text"
                  defaultValue="Build a Todo App"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea
                  defaultValue="Create a fully functional todo application using HTML, CSS, and JavaScript."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Due Date</label>
                  <input
                    type="date"
                    defaultValue="2024-02-15"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Marks</label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Upload/Update Files</label>
                <div className="relative rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Drag and drop files here or click to select</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg bg-gray-50 p-3 border border-gray-200">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <Link
                  href={`/faculty/courses/${courseId}/assignments`}
                  className="flex-1 rounded-lg border border-gray-300 py-2 text-center font-semibold text-gray-700 hover:bg-gray-50"
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
