"use client"

import { X, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

// Sample data - would come from backend
const pendingAssignments = [
  { id: 1, courseId: 1, title: "Database Design Project", course: "Advanced Data Structures", dueDate: "Jan 20, 2026" },
  {
    id: 2,
    courseId: 1,
    title: "Algorithm Analysis Report",
    course: "Advanced Data Structures",
    dueDate: "Jan 22, 2026",
  },
  {
    id: 3,
    courseId: 2,
    title: "Network Protocol Implementation",
    course: "Computer Networks",
    dueDate: "Jan 25, 2026",
  },
  { id: 1, courseId: 3, title: "UI Wireframes", course: "System Design", dueDate: "Jan 28, 2026" },
]

const solvedProblems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", solvedDate: "Jan 15, 2026" },
  { id: 2, title: "Valid Parentheses", difficulty: "Easy", solvedDate: "Jan 14, 2026" },
  { id: 3, title: "Merge Two Sorted Lists", difficulty: "Easy", solvedDate: "Jan 13, 2026" },
  { id: 4, title: "Best Time to Buy Stock", difficulty: "Medium", solvedDate: "Jan 12, 2026" },
  { id: 5, title: "Container With Most Water", difficulty: "Medium", solvedDate: "Jan 11, 2026" },
]

const activeProjects = [
  { id: 1, title: "Student-centric LMS", status: "open", role: "Owner" },
  { id: 2, title: "AI-Driven Plagiarism Checker", status: "in-review", role: "Collaborator" },
  { id: 3, title: "Blockchain Voting System", status: "open", role: "Collaborator" },
]

const enrolledRoadmaps = [
  { id: 1, title: "Python Fundamentals", progress: 75, level: "Beginner" },
  { id: 2, title: "JavaScript Mastery", progress: 45, level: "Intermediate" },
  { id: 3, title: "System Design", progress: 20, level: "Advanced" },
  { id: 4, title: "Data Structures & Algorithms", progress: 60, level: "Intermediate" },
]

const difficultyColors: Record<string, string> = {
  Easy: "text-emerald-600 bg-emerald-50",
  Medium: "text-amber-600 bg-amber-50",
  Hard: "text-red-600 bg-red-50",
}

const statusColors: Record<string, string> = {
  open: "text-emerald-600",
  "in-review": "text-amber-600",
  closed: "text-gray-500",
}

export function PendingAssignmentsModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-lg rounded-[20px] bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Pending Assignments</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {pendingAssignments.map((assignment, idx) => (
            <Link
              key={`${assignment.courseId}-${assignment.id}-${idx}`}
              href={`/courses/${assignment.courseId}/assignments/${assignment.id}`}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors group"
              onClick={onClose}
            >
              <div>
                <p className="font-medium text-gray-900 group-hover:text-blue-600">{assignment.title}</p>
                <p className="text-sm text-gray-500">{assignment.course}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{assignment.dueDate}</span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SolvedProblemsModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-lg rounded-[20px] bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Problems Solved</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {solvedProblems.map((problem) => (
            <Link
              key={problem.id}
              href={`/practice/${problem.id}`}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors group"
              onClick={onClose}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500">#{problem.id}</span>
                <p className="font-medium text-gray-900 group-hover:text-blue-600">{problem.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[problem.difficulty]}`}>
                  {problem.difficulty}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ActiveProjectsModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-lg rounded-[20px] bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Active Projects</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {activeProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projecthub/${project.id}`}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors group"
              onClick={onClose}
            >
              <div>
                <p className="font-medium text-gray-900 group-hover:text-blue-600">{project.title}</p>
                <p className="text-sm text-gray-500">{project.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${statusColors[project.status]}`}>● {project.status}</span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export function EnrolledRoadmapsModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-lg rounded-[20px] bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Enrolled Roadmaps</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {enrolledRoadmaps.map((roadmap) => (
            <Link
              key={roadmap.id}
              href={`/learn/${roadmap.id}`}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors group"
              onClick={onClose}
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900 group-hover:text-blue-600">{roadmap.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 max-w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${roadmap.progress}%` }} />
                  </div>
                  <span className="text-xs text-gray-500">{roadmap.progress}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{roadmap.level}</span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
