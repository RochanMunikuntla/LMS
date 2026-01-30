"use client"

import { FacultyNavbar } from "@/components/faculty/navbar"

export default function FacultyProfilePage() {
  return (
    <>
      <FacultyNavbar />
      <main className="min-h-screen bg-slate-50 px-6 py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-900">Faculty Profile</h1>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8">
            <div className="space-y-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
                DR
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <p className="mt-1 text-slate-900">Dr. Jane Smith</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Faculty ID
                </label>
                <p className="mt-1 text-slate-900">24356</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <p className="mt-1 text-slate-900">jane.smith@university.edu</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Department
                </label>
                <p className="mt-1 text-slate-900">Computer Science</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Office
                </label>
                <p className="mt-1 text-slate-900">Engineering Building, Room 401</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Office Hours
                </label>
                <p className="mt-1 text-slate-900">Monday & Wednesday, 2-4 PM</p>
              </div>
            </div>

            <p className="mt-8 text-xs text-slate-500">
              This is a read-only profile view. Contact administration for profile updates.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
