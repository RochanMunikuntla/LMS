"use client"

import { useState } from "react"
import { AdminNavbar } from "@/components/admin/navbar"
import { useAdminNavigation } from "@/lib/navigation-handlers"
import { Plus, Search, Trash2, Edit2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

interface Student {
  id: number
  name: string
  email: string
  studentId: string
  department: string
  enrolledCourses: number
  joinedDate: string
}

// Sample data - will be replaced by backend
const initialStudents: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@university.edu",
    studentId: "STU001",
    department: "Computer Science",
    enrolledCourses: 5,
    joinedDate: "2024-08-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    studentId: "STU002",
    department: "Electrical Engineering",
    enrolledCourses: 4,
    joinedDate: "2024-08-15",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@university.edu",
    studentId: "STU003",
    department: "Computer Science",
    enrolledCourses: 6,
    joinedDate: "2024-08-20",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@university.edu",
    studentId: "STU004",
    department: "Mathematics",
    enrolledCourses: 4,
    joinedDate: "2024-09-01",
  },
]

export default function StudentsPage() {
  const searchParams = useSearchParams()
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null)
  const { goToStudentDetail, goToCreateStudent, goToEditStudent } = useAdminNavigation()

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter((s) => s.id !== studentToDelete.id))
      setDeleteModalOpen(false)
      setStudentToDelete(null)
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
              <h1 className="text-4xl font-bold text-gray-900">Students</h1>
              <p className="mt-3 text-lg text-gray-600">
                Manage all registered students
              </p>
            </div>
            <button
              onClick={goToCreateStudent}
              className="flex items-center gap-2 rounded-[10px] bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              Add Student
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-[10px] border border-gray-300 py-3 pl-12 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Students Table */}
          <div className="rounded-[20px] border border-gray-200 bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Student ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Courses
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      onClick={() => goToStudentDetail(student.id)}
                      className="border-b border-gray-100 transition-colors hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                          {student.studentId}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {student.department}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {student.enrolledCourses} courses
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {student.joinedDate}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              goToEditStudent(student.id)
                            }}
                            className="rounded-[8px] bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteClick(student)
                            }}
                            className="rounded-[8px] bg-red-50 p-2 text-red-600 hover:bg-red-100"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-600">No students found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-[20px] bg-white p-8">
            <h2 className="text-xl font-bold text-gray-900">Confirm Delete</h2>
            <p className="mt-4 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{studentToDelete.name}</span>? This
              action cannot be undone.
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

export function Loading() {
  return null
}
