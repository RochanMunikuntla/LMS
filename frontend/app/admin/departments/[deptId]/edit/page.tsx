"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { AdminNavbar } from "@/components/admin/navbar"
import { useAdminNavigation } from "@/lib/navigation-handlers"
import { ArrowLeft } from "lucide-react"

interface Department {
  id: number
  name: string
  code: string
  head: string
  location: string
  phone: string
  email: string
  description: string
}

// Sample data - will be replaced by backend
const departmentsData: Record<string, Department> = {
  "1": {
    id: 1,
    name: "Computer Science",
    code: "CS",
    head: "1",
    location: "Engineering Building, Floor 3",
    phone: "+1 234 567 8900",
    email: "cs@university.edu",
    description: "The Computer Science department offers cutting-edge programs in software engineering, artificial intelligence, and data science.",
  },
  "2": {
    id: 2,
    name: "Electrical Engineering",
    code: "EE",
    head: "2",
    location: "Engineering Building, Floor 2",
    phone: "+1 234 567 8901",
    email: "ee@university.edu",
    description: "The Electrical Engineering department focuses on electronics, power systems, and telecommunications.",
  },
}

const facultyHeads = [
  { id: 1, name: "Dr. Jane Smith" },
  { id: 2, name: "Prof. Robert Brown" },
  { id: 3, name: "Dr. Emily Chen" },
  { id: 4, name: "Prof. Michael Davis" },
  { id: 5, name: "Dr. Sarah Wilson" },
]

export default function EditDepartmentPage() {
  const params = useParams()
  const deptId = params?.deptId as string
  const department = departmentsData[deptId]

  const [formData, setFormData] = useState({
    name: department?.name || "",
    code: department?.code || "",
    head: department?.head || "",
    location: department?.location || "",
    phone: department?.phone || "",
    email: department?.email || "",
    description: department?.description || "",
  })
  const { goToDepartmentDetail } = useAdminNavigation()

  if (!department) {
    return (
      <>
        <AdminNavbar />
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-gray-600">Department not found</p>
        </main>
      </>
    )
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
    goToDepartmentDetail(deptId)
  }

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-white px-8 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href={`/admin/departments/${deptId}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Department
            </Link>
            <div className="mt-4 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <div className="rounded-[20px] border border-gray-200 bg-white p-8">
            <h1 className="text-2xl font-bold text-gray-900">Edit Department</h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-3">
                    Department Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Computer Science"
                    className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="code" className="block text-sm font-semibold text-gray-900 mb-3">
                    Department Code
                  </label>
                  <input
                    id="code"
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="e.g., CS"
                    className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="head" className="block text-sm font-semibold text-gray-900 mb-3">
                  Department Head
                </label>
                <select
                  id="head"
                  name="head"
                  value={formData.head}
                  onChange={handleInputChange}
                  className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">Select department head</option>
                  {facultyHeads.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-900 mb-3">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Engineering Building, Floor 3"
                  className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-3">
                    Phone
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
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-3">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="department@university.edu"
                    className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-3">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter department description"
                  className="w-full rounded-[10px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={4}
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
                  href={`/admin/departments/${deptId}`}
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
