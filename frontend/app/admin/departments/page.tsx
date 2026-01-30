"use client"

import { useState } from "react"
import { AdminNavbar } from "@/components/admin/navbar"
import { useAdminNavigation } from "@/lib/navigation-handlers"
import { Plus, Trash2, Edit2, Building2 } from "lucide-react"

interface Department {
  id: number
  name: string
  code: string
  head: string
  facultyCount: number
  studentCount: number
  courseCount: number
}

// Sample data - will be replaced by backend
const initialDepartments: Department[] = [
  {
    id: 1,
    name: "Computer Science",
    code: "CS",
    head: "Dr. Jane Smith",
    facultyCount: 15,
    studentCount: 320,
    courseCount: 24,
  },
  {
    id: 2,
    name: "Electrical Engineering",
    code: "EE",
    head: "Prof. Robert Brown",
    facultyCount: 12,
    studentCount: 280,
    courseCount: 18,
  },
  {
    id: 3,
    name: "Mathematics",
    code: "MATH",
    head: "Dr. Emily Chen",
    facultyCount: 10,
    studentCount: 150,
    courseCount: 15,
  },
  {
    id: 4,
    name: "Physics",
    code: "PHY",
    head: "Prof. Michael Davis",
    facultyCount: 8,
    studentCount: 120,
    courseCount: 12,
  },
  {
    id: 5,
    name: "Chemistry",
    code: "CHEM",
    head: "Dr. Sarah Wilson",
    facultyCount: 9,
    studentCount: 110,
    courseCount: 14,
  },
]

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deptToDelete, setDeptToDelete] = useState<Department | null>(null)
  const { goToDepartmentDetail, goToCreateDepartment, goToEditDepartment } = useAdminNavigation()

  const handleDeleteClick = (dept: Department) => {
    setDeptToDelete(dept)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (deptToDelete) {
      setDepartments(departments.filter((d) => d.id !== deptToDelete.id))
      setDeleteModalOpen(false)
      setDeptToDelete(null)
    }
  }

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-white px-8 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Departments</h1>
              <p className="mt-3 text-lg text-gray-600">
                Manage academic departments
              </p>
            </div>
            <button
              onClick={goToCreateDepartment}
              className="flex items-center gap-2 rounded-[10px] bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              Create Department
            </button>
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <div
                key={dept.id}
                onClick={() => goToDepartmentDetail(dept.id)}
                className="rounded-[20px] border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md cursor-pointer"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-[12px] bg-indigo-100 p-3">
                    <Building2 className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        goToEditDepartment(dept.id)
                      }}
                      className="rounded-[8px] bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteClick(dept)
                      }}
                      className="rounded-[8px] bg-red-50 p-2 text-red-600 hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                    {dept.code}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                <p className="mt-1 text-sm text-gray-500">Head: {dept.head}</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-[8px] bg-gray-50 p-2">
                    <p className="text-lg font-bold text-gray-900">{dept.facultyCount}</p>
                    <p className="text-xs text-gray-500">Faculty</p>
                  </div>
                  <div className="rounded-[8px] bg-gray-50 p-2">
                    <p className="text-lg font-bold text-gray-900">{dept.studentCount}</p>
                    <p className="text-xs text-gray-500">Students</p>
                  </div>
                  <div className="rounded-[8px] bg-gray-50 p-2">
                    <p className="text-lg font-bold text-gray-900">{dept.courseCount}</p>
                    <p className="text-xs text-gray-500">Courses</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {departments.length === 0 && (
            <div className="rounded-[20px] border border-gray-200 bg-white p-12 text-center">
              <p className="text-gray-600">No departments found</p>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && deptToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-[20px] bg-white p-8">
            <h2 className="text-xl font-bold text-gray-900">Confirm Delete</h2>
            <p className="mt-4 text-gray-600">
              Are you sure you want to delete the{" "}
              <span className="font-semibold">{deptToDelete.name}</span> department?
              This action cannot be undone.
            </p>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 rounded-[10px] border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
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
