"use client"

import { AdminNavbar } from "@/components/admin/navbar"
import { useAdminNavigation } from "@/lib/navigation-handlers"
import { Users, GraduationCap, BookOpen, Building2, Megaphone } from "lucide-react"

// Sample data - will be replaced by backend
const overviewData = {
  students: 1250,
  faculty: 85,
  courses: 48,
  departments: 12,
  announcements: 8,
}

export default function AdminHomePage() {
  const {
    goToStudents,
    goToFaculty,
    goToCourses,
    goToDepartments,
    goToAnnouncements,
  } = useAdminNavigation()

  const overviewCards = [
    {
      title: "Students",
      count: overviewData.students,
      icon: GraduationCap,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      onClick: goToStudents,
    },
    {
      title: "Faculty",
      count: overviewData.faculty,
      icon: Users,
      color: "bg-emerald-100",
      iconColor: "text-emerald-600",
      onClick: goToFaculty,
    },
    {
      title: "Courses",
      count: overviewData.courses,
      icon: BookOpen,
      color: "bg-amber-100",
      iconColor: "text-amber-600",
      onClick: goToCourses,
    },
    {
      title: "Departments",
      count: overviewData.departments,
      icon: Building2,
      color: "bg-indigo-100",
      iconColor: "text-indigo-600",
      onClick: goToDepartments,
    },
    {
      title: "Announcements",
      count: overviewData.announcements,
      icon: Megaphone,
      color: "bg-rose-100",
      iconColor: "text-rose-600",
      onClick: goToAnnouncements,
    },
  ]

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-white px-8 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-3 text-lg text-gray-600">
              System overview and management
            </p>
          </div>

          {/* Overview Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {overviewCards.map((card) => {
              const IconComponent = card.icon
              return (
                <button
                  key={card.title}
                  onClick={card.onClick}
                  className="rounded-[20px] border border-gray-200 bg-white p-8 text-left transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className={`rounded-[12px] ${card.color} p-4`}>
                      <IconComponent className={`h-7 w-7 ${card.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{card.title}</p>
                      <p className="mt-1 text-3xl font-bold text-gray-900">{card.count}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Quick Access Section */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Quick Access</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Student Management */}
              <button
                onClick={goToStudents}
                className="rounded-[20px] border border-gray-200 bg-white p-8 text-left transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Student Management</h3>
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Add, edit, or remove students and manage their enrollments
                </p>
                <p className="mt-4 text-xs font-medium text-blue-600">View Details</p>
              </button>

              {/* Faculty Management */}
              <button
                onClick={goToFaculty}
                className="rounded-[20px] border border-gray-200 bg-white p-8 text-left transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Faculty Management</h3>
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Manage faculty members and their course assignments
                </p>
                <p className="mt-4 text-xs font-medium text-blue-600">View Details</p>
              </button>

              {/* Course Management */}
              <button
                onClick={goToCourses}
                className="rounded-[20px] border border-gray-200 bg-white p-8 text-left transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Course Management</h3>
                  <BookOpen className="h-6 w-6 text-amber-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Create courses and manage curriculum across departments
                </p>
                <p className="mt-4 text-xs font-medium text-blue-600">View Details</p>
              </button>

              {/* Department Management */}
              <button
                onClick={goToDepartments}
                className="rounded-[20px] border border-gray-200 bg-white p-8 text-left transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Department Management</h3>
                  <Building2 className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Organize academic departments and their structure
                </p>
                <p className="mt-4 text-xs font-medium text-blue-600">View Details</p>
              </button>

              {/* Announcements */}
              <button
                onClick={goToAnnouncements}
                className="rounded-[20px] border border-gray-200 bg-white p-8 text-left transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Announcements</h3>
                  <Megaphone className="h-6 w-6 text-rose-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Post and manage institution-wide announcements
                </p>
                <p className="mt-4 text-xs font-medium text-blue-600">View Details</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
