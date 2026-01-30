"use client"
import { Navbar } from "@/components/dashboard/navbar"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { RecentRoadmaps } from "@/components/dashboard/recent-roadmaps"
import { AcademicAssignments } from "@/components/dashboard/academic-assignments"
import { TodoList } from "@/components/dashboard/todo-list"
import { PendingProblems } from "@/components/dashboard/pending-problems"
import { NextForYou } from "@/components/dashboard/next-for-you"

export function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, Rochan! <span className="ml-1">👋</span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            You're in the top 5% of learners this week. Keep the momentum going.
          </p>
        </div>

        {/* Primary Metrics */}
        <MetricCards />

        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - 2/3 width */}
          <div className="space-y-6 lg:col-span-2">
            <RecentRoadmaps />
            <AcademicAssignments />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            <PendingProblems />
            <NextForYou />
            <TodoList />
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t border-border bg-card py-6">
        <p className="text-center text-sm text-muted-foreground">
          © 2026 LMS Career Development Platform. Fueling student futures with code and coffee.
        </p>
      </footer>
    </div>
  )
}
