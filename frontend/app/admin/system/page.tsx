"use client"

import { AdminNavbar } from "@/components/admin/navbar"
import { Activity, Cpu, HardDrive } from "lucide-react"

export default function AdminSystemPage() {
  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-slate-50 px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-slate-900">System Overview</h1>
          <p className="mt-2 text-slate-600">Monitor system health and performance metrics</p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-green-100 p-3">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">System Status</p>
                  <p className="text-xl font-bold text-green-600">Operational</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-blue-100 p-3">
                  <Cpu className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">CPU Usage</p>
                  <p className="text-xl font-bold text-slate-900">45%</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-purple-100 p-3">
                  <HardDrive className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Storage Usage</p>
                  <p className="text-xl font-bold text-slate-900">62%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Last Backup</h2>
            <p className="mt-2 text-slate-600">2024-01-19 02:00 UTC</p>
          </div>
        </div>
      </main>
    </>
  )
}
