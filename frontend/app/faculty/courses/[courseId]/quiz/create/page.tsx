"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { FacultyNavbar } from "@/components/faculty/navbar"
import { ArrowLeft, Upload, X } from "lucide-react"

export default function CreateQuizPage() {
  const params = useParams()
  const courseId = params?.courseId as string
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles([...uploadedFiles, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("[v0] Quiz created with", uploadedFiles.length, "files")
  }

  return (
    <>
      <FacultyNavbar />
      <main className="min-h-screen bg-white px-8 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href={`/faculty/courses/${courseId}/quiz`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Quizzes
            </Link>
            <div className="mt-4 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <div className="rounded-[20px] border border-gray-200 bg-white p-8">
            <h1 className="text-2xl font-bold text-gray-900">Create Quiz</h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-3">Quiz Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter quiz title"
                  className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-3">Description</label>
                <textarea
                  id="description"
                  placeholder="Quiz description and instructions"
                  className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="questions" className="block text-sm font-semibold text-gray-900 mb-3">Number of Questions</label>
                  <input
                    id="questions"
                    type="number"
                    placeholder="10"
                    className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="marks" className="block text-sm font-semibold text-gray-900 mb-3">Total Marks</label>
                  <input
                    id="marks"
                    type="number"
                    placeholder="100"
                    className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-semibold text-gray-900 mb-3">Duration (minutes)</label>
                  <input
                    id="duration"
                    type="number"
                    placeholder="60"
                    className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="startDate" className="block text-sm font-semibold text-gray-900 mb-3">Start Date</label>
                  <input
                    id="startDate"
                    type="date"
                    className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label htmlFor="fileUpload" className="block text-sm font-semibold text-gray-900 mb-3">Upload Quiz File</label>
                <div className="relative rounded-[10px] border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="mx-auto h-7 w-7 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Drag and drop files here or click to select (accepts all file types)</p>
                  <input
                    id="fileUpload"
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
                      <div key={index} className="flex items-center justify-between rounded-[10px] bg-gray-50 p-3 border border-gray-200">
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
                  className="flex-1 rounded-[10px] bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Create Quiz
                </button>
                <Link
                  href={`/faculty/courses/${courseId}/quiz`}
                  className="flex-1 rounded-[10px] border border-gray-300 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
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
