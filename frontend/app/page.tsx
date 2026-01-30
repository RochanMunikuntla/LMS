import Link from "next/link"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900">LMS Career Dev</h1>
          <p className="mt-4 text-xl text-gray-600">A comprehensive learning management system for students, faculty, and administrators</p>

          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:justify-center">
            <Link
              href="/login/student"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Student Login
            </Link>
            <Link
              href="/login/faculty"
              className="rounded-lg border border-blue-600 px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Faculty Login
            </Link>
            <Link
              href="/login/admin"
              className="rounded-lg border border-gray-300 px-8 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
