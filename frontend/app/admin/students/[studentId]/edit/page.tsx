"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { AdminNavbar } from "@/components/admin/navbar"
import { useAdminNavigation } from "@/lib/navigation-handlers"
import { ArrowLeft, Upload } from "lucide-react"

interface Student {
  id: number
  name: string
  email: string
  phone: string
  address: string
  department: string
}

// Sample data - will be replaced by backend
const studentsData: Record<string, Student> = {
  "1": {
    id: 1,
    name: "John Doe",
    email: "john.doe@university.edu",
    phone: "+1 234 567 8900",
    department: "Computer Science",
    address: "123 University Ave, Campus City",
  },
  "2": {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    phone: "+1 234 567 8901",
    department: "Electrical Engineering",
    address: "456 College St, Campus City",
  },
}

const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Mechanical Engineering",
]

export default function EditStudentPage() {
  const params = useParams()
  const studentId = params?.studentId as string
  const student = studentsData[studentId]

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: student?.name || "",
    email: student?.email || "",
    phone: student?.phone || "",
    address: student?.address || "",
    department: student?.department || "",
  })
  const { goToStudentDetail } = useAdminNavigation()

  if (!student) {
    return (
      <>
        <AdminNavbar />
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-gray-600">Student not found</p>
        </main>
      </>
    )
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Backend will handle the actual update
    goToStudentDetail(studentId)
  }

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-white px-8 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href={`/admin/students/${studentId}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Student
            </Link>
            <div className="mt-4 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <div className="rounded-[20px] border border-gray-200 bg-white p-8">
            <h1 className="text-2xl font-bold text-gray-900">Edit Student</h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              {/* Profile Photo */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                    {formData.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    {uploadedFile ? (
                      <>
                        <p className="text-sm text-gray-700">{uploadedFile.name}</p>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="mt-1 text-sm text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <div className="relative">
                        <button
                          type="button"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Upload className="h-4 w-4" />
                          Change Photo
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-3">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter student's full name"
                  className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-3">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="student@university.edu"
                  className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-3">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 234 567 8900"
                    className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-semibold text-gray-900 mb-3">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-3">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter student's address"
                  className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-[10px] bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <Link
                  href={`/admin/students/${studentId}`}
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
