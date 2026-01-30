import { Navbar } from "@/components/dashboard/navbar"
import { CourseGrid } from "@/components/courses/course-grid"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <h1 className="mb-8 text-2xl font-bold text-gray-900">My courses</h1>

        {/* Course overview card */}
        <div className="rounded-[20px] border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">Course overview</h2>

          {/* Course grid */}
          <CourseGrid />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        2026 LMS Career Development Platform. Fueling student futures with code and coffee.
      </footer>
    </div>
  )
}
