"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { FacultyNavbar } from "@/components/faculty/navbar"
import { ArrowLeft, Edit2, Trash2, FileText, Paperclip, ImageIcon, Download } from "lucide-react"

interface Material {
  id: number
  title: string
  type: string
  uploadDate: string
}

const initialMaterials: Material[] = [
  {
    id: 1,
    title: "HTML Fundamentals",
    type: "pdf",
    uploadDate: "2024-01-15",
  },
  {
    id: 2,
    title: "CSS Grid Guide",
    type: "pdf",
    uploadDate: "2024-01-18",
  },
  {
    id: 3,
    title: "JavaScript Slides",
    type: "pptx",
    uploadDate: "2024-01-20",
  },
]

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="h-5 w-5" />
    case "pptx":
      return <ImageIcon className="h-5 w-5" />
    default:
      return <Paperclip className="h-5 w-5" />
  }
}

export default function MaterialsPage() {
  const params = useParams()
  const courseId = params?.courseId as string
  const [materials, setMaterials] = useState<Material[]>(initialMaterials)

  const handleDelete = (id: number) => {
    setMaterials(materials.filter(m => m.id !== id))
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
              <h1 className="text-3xl font-bold text-gray-900">Course Materials</h1>
              <p className="mt-2 text-gray-600">Manage and share course materials with students</p>
            </div>
            <Link
              href={`/faculty/courses/${courseId}/materials/create`}
              className="rounded-[10px] bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Upload Material
            </Link>
          </div>

          {/* Materials List */}
          <div className="space-y-4">
            {materials.map((material) => (
              <div
                key={material.id}
                className="flex items-center justify-between rounded-[20px] border border-gray-200 bg-white p-6 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="rounded-[10px] bg-gray-100 p-4 text-gray-600">
                    {getFileIcon(material.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{material.title}</h3>
                    <p className="text-sm text-gray-600">Uploaded: {material.uploadDate}</p>
                  </div>
                </div>
                <div className="ml-6 flex gap-2">
                  <button className="rounded-[10px] bg-blue-50 p-3 text-blue-600 hover:bg-blue-100" title="Download">
                    <Download className="h-5 w-5" />
                  </button>
                  <Link
                    href={`/faculty/courses/${courseId}/materials/${material.id}/edit`}
                    className="rounded-[10px] bg-blue-50 p-3 text-blue-600 hover:bg-blue-100"
                    title="Edit"
                  >
                    <Edit2 className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(material.id)}
                    className="rounded-[10px] bg-red-50 p-3 text-red-600 hover:bg-red-100"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {materials.length === 0 && (
            <div className="rounded-[20px] border border-gray-200 bg-white p-12 text-center">
              <p className="text-gray-600">No materials uploaded yet. Upload some to get started.</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
