"use client"

import { useState } from "react"
import { AdminNavbar } from "@/components/admin/navbar"
import { useAdminNavigation } from "@/lib/navigation-handlers"
import { Plus, Search, Trash2, Edit2 } from "lucide-react"
import { useSearchParams, Suspense } from "next/navigation"
import Loading from "./loading"

interface Faculty {
  id: number
  name: string
  email: string
  facultyId: string
  department: string
  assignedCourses: number
  joinedDate: string
}

// Sample data - will be replaced by backend
const initialFaculty: Faculty[] = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    email: "jane.smith@university.edu",
    facultyId: "FAC001",
    department: "Computer Science",
    assignedCourses: 3,
    joinedDate: "2020-08-15",
  },
  {
    id: 2,
    name: "Prof. Robert Brown",
    email: "robert.brown@university.edu",
    facultyId: "FAC002",
    department: "Electrical Engineering",
    assignedCourses: 2,
    joinedDate: "2019-01-10",
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    email: "emily.chen@university.edu",
    facultyId: "FAC003",
    department: "Mathematics",
    assignedCourses: 4,
    joinedDate: "2021-03-20",
  },
  {
    id: 4,
    name: "Prof. Michael Davis",
    email: "michael.davis@university.edu",
    facultyId: "FAC004",
    department: "Physics",
    assignedCourses: 2,
    joinedDate: "2018-09-01",
  },
]

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [facultyToDelete, setFacultyToDelete] = useState<Faculty | null>(null)
  const { goToFacultyDetail, goToCreateFaculty, goToEditFaculty } = useAdminNavigation()
  const searchParams = useSearchParams()

  const filteredFaculty = faculty.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.facultyId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDeleteClick = (f: Faculty) => {
    setFacultyToDelete(f)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (facultyToDelete) {
      setFaculty(faculty.filter((f) => f.id !== facultyToDelete.id))
      setDeleteModalOpen(false)
      setFacultyToDelete(null)
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <>
        <AdminNavbar />
        <main className="min-h-screen bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Faculty</h1>
                <p className="mt-3 text-lg text-gray-600">
                  Manage all faculty members
                </p>
              </div>
              <button
                onClick={goToCreateFaculty}
                className="flex items-center gap-2 rounded-[10px] bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                <Plus className="h-5 w-5" />
                Add Faculty
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

            {/* Faculty Table */}
            <div className="rounded-[20px] border border-gray-200 bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Faculty ID
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
                    {filteredFaculty.map((f) => (
                      <tr
                        key={f.id}
                        onClick={() => goToFacultyDetail(f.id)}
                        className="border-b border-gray-100 transition-colors hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{f.name}</p>
                            <p className="text-sm text-gray-500">{f.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                            {f.facultyId}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {f.department}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {f.assignedCourses} courses
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {f.joinedDate}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                goToEditFaculty(f.id)
                              }}
                              className="rounded-[8px] bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteClick(f)
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

              {filteredFaculty.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-gray-600">No faculty found</p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && facultyToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-[20px] bg-white p-8">
              <h2 className="text-xl font-bold text-gray-900">Confirm Delete</h2>
              <p className="mt-4 text-gray-600">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{facultyToDelete.name}</span>? This
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
    </Suspense>
  )
}
