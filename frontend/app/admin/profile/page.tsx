"use client"

import { AdminNavbar } from "@/components/admin/navbar"

export default function AdminProfilePage() {
  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-slate-50 px-6 py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-900">Admin Profile</h1>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8">
            <div className="space-y-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
                AD
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <p className="mt-1 text-slate-900">Admin User</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Admin ID
                </label>
                <p className="mt-1 text-slate-900">admin001</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <p className="mt-1 text-slate-900">admin@university.edu</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Role
                </label>
                <p className="mt-1 text-slate-900">System Administrator</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Department
                </label>
                <p className="mt-1 text-slate-900">Information Technology</p>
              </div>
            </div>

            <p className="mt-8 text-xs text-slate-500">
              This is a read-only profile view. Contact IT department for profile updates.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
