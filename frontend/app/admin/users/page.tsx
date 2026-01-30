"use client"

import { AdminNavbar } from "@/components/admin/navbar"
import { Users, Mail, Clock } from "lucide-react"

const users = [
  { id: 1, name: "John Doe", type: "Student", email: "john@university.edu", joined: "2024-08-15" },
  { id: 2, name: "Jane Smith", type: "Faculty", email: "jane@university.edu", joined: "2023-09-01" },
  { id: 3, name: "Mike Johnson", type: "Student", email: "mike@university.edu", joined: "2024-08-15" },
  { id: 4, name: "Sarah Wilson", type: "Faculty", email: "sarah@university.edu", joined: "2024-01-15" },
]

export default function AdminUsersPage() {
  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-slate-50 px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-slate-900">User Management</h1>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">All Users</h2>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Add User
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-200 transition-colors hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 text-sm text-slate-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                            user.type === "Student"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {user.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{user.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
