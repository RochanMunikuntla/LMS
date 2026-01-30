"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { AdminNavbar } from "@/components/admin/navbar"
import { useAdminNavigation } from "@/lib/navigation-handlers"
import { ArrowLeft, Edit2, Trash2, Building2, Users, GraduationCap, BookOpen } from "lucide-react"

interface Department {
  id: number
  name: string
  code: string
  head: string
  headId: number
  description: string
  facultyCount: number
  studentCount: number
  courseCount: number
  location: string
  phone: string
  email: string
}

// Sample data - will be replaced by backend
const departmentsData: Record<string, Department> = {
  "1": {
    id: 1,
    name: "Computer Science",
    code: "CS",
    head: "Dr. Jane Smith",
    headId: 1,
    description: "The Computer Science department offers cutting-edge programs in software engineering, artificial intelligence, and data science.",
    facultyCount: 15,
    studentCount: 320,
    courseCount: 24,
    location: "Engineering Building, Floor 3",
    phone: "+1 234 567 8900",
    email: "cs@university.edu",
  },
  "2": {
    id: 2,
    name: "Electrical Engineering",
    code: "EE",
    head: "Prof. Robert Brown",
    headId: 2,
    description: "The Electrical Engineering department focuses on electronics, power systems, and telecommunications.",
    facultyCount: 12,
    studentCount: 280,
    courseCount: 18,
    location: "Engineering Building, Floor 2",
    phone: "+1 234 567 8901",
    email: "ee@university.edu",
  },
  "3": {
    id: 3,
    name: "Mathematics",
    code: "MATH",
    head: "Dr. Emily Chen",
    headId: 3,
    description: "The Mathematics department provides rigorous training in pure and applied mathematics.",
    facultyCount: 10,
    studentCount: 150,
    courseCount: 15,
    location: "Science Building, Floor 4",
    phone: "+1 234 567 8902",
    email: "math@university.edu",
  },
}

export default function DepartmentDetailPage() {
  const params = useParams()
  const deptId = params?.deptId as string
  const department = departmentsData[deptId]

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { goToDepartments, goToEditDepartment, goToFacultyDetail } = useAdminNavigation()

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

  const handleDelete = () => {
    // Backend will handle the actual deletion
    goToDepartments()
  }

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-white px-8 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/admin/departments"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Departments
            </Link>
            <div className="mt-4 h-px bg-gray-200" />
          </div>

          {/* Department Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-[12px] bg-indigo-100 p-3">
                  <Building2 className="h-6 w-6 text-indigo-600" />
                </div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                  {department.code}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{department.name}</h1>
              <p className="mt-2 text-gray-600">{department.description}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => goToEditDepartment(department.id)}
                className="flex items-center gap-2 rounded-[10px] bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 rounded-[10px] bg-red-50 px-4 py-2 font-medium text-red-600 hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-[20px] border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-[12px] bg-emerald-100 p-3">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Faculty Members</p>
                  <p className="text-3xl font-bold text-gray-900">{department.facultyCount}</p>
                </div>
              </div>
            </div>
            <div className="rounded-[20px] border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-[12px] bg-blue-100 p-3">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Students</p>
                  <p className="text-3xl font-bold text-gray-900">{department.studentCount}</p>
                </div>
              </div>
            </div>
            <div className="rounded-[20px] border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-[12px] bg-amber-100 p-3">
                  <BookOpen className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Courses</p>
                  <p className="text-3xl font-bold text-gray-900">{department.courseCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Department Info Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="rounded-[20px] border border-gray-200 bg-white p-8">
              <h2 className="mb-6 text-lg font-bold text-gray-900">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Location</label>
                  <p className="mt-1 text-gray-900">{department.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  <p className="mt-1 text-gray-900">{department.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="mt-1 text-gray-900">{department.email}</p>
                </div>
              </div>
            </div>

            {/* Department Head */}
            <button
              onClick={() => goToFacultyDetail(department.headId)}
              className="rounded-[20px] border border-gray-200 bg-white p-8 text-left transition-all hover:border-blue-300 hover:shadow-md"
            >
              <h2 className="mb-6 text-lg font-bold text-gray-900">Department Head</h2>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-600">
                  {department.head.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{department.head}</p>
                  <p className="text-sm text-gray-500">Head of Department</p>
                </div>
              </div>
              <p className="mt-4 text-xs font-medium text-blue-600">View Profile</p>
            </button>
          </div>
        </div>
      </main>

      {/* Delete Department Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-[20px] bg-white p-8">
            <h2 className="text-xl font-bold text-gray-900">Delete Department</h2>
            <p className="mt-4 text-gray-600">
              Are you sure you want to delete the{" "}
              <span className="font-semibold">{department.name}</span> department? This
              action cannot be undone and will affect all associated faculty, students,
              and courses.
            </p>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-[10px] border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-[10px] bg-red-600 py-3 font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
