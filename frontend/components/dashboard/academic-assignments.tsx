"use client"

import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigation } from "@/lib/navigation"

const assignments = [
  {
    id: 1,
    courseId: 1,
    title: "Database Normalization Report",
    course: "Database Systems",
    dueDate: new Date(2026, 0, 20),
  },
  {
    id: 2,
    courseId: 2,
    title: "API Integration Task",
    course: "Web Development",
    dueDate: new Date(2026, 0, 10),
  },
  {
    id: 3,
    courseId: 3,
    title: "Algorithm Analysis Paper",
    course: "Data Structures",
    dueDate: new Date(2026, 0, 25),
  },
  {
    id: 4,
    courseId: 4,
    title: "React Component Library",
    course: "Frontend Development",
    dueDate: new Date(2026, 0, 10),
  },
]

export function AcademicAssignments() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null)
  const { handleAssignmentClick } = useNavigation()

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const isPastDue = (dueDate: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return dueDate < today
  }

  const getAssignmentsForDay = (day: Date) => {
    return assignments.filter((a) => isSameDay(day, a.dueDate))
  }

  const isDueDate = (day: Date) => getAssignmentsForDay(day).length > 0

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  const sortedAssignments = [...assignments].sort((a, b) => {
    const aOverdue = isPastDue(a.dueDate)
    const bOverdue = isPastDue(b.dueDate)
    if (aOverdue && !bOverdue) return -1
    if (!aOverdue && bOverdue) return 1
    return a.dueDate.getTime() - b.dueDate.getTime()
  })

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-foreground">Assignments</h2>

      {/* Calendar */}
      <div className="mb-6 rounded-[20px] border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{format(currentMonth, "MMMM yyyy")}</h3>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button onClick={nextMonth} className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors">
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Weekday headers */}
        <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const hasDue = isDueDate(day)
            const isToday = isSameDay(day, new Date())
            const dayAssignments = getAssignmentsForDay(day)
            const hasPastDue = dayAssignments.some((a) => isPastDue(a.dueDate))
            const isHovered = hoveredDay && isSameDay(day, hoveredDay)

            return (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => hasDue && setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                <div
                  className={`flex h-10 items-center justify-center rounded-lg text-sm transition-colors cursor-default
                    ${!isCurrentMonth ? "text-gray-300" : "text-foreground"}
                    ${isToday && !hasDue ? "font-semibold text-blue-600 border border-gray-300" : ""}
                    ${hasDue && isCurrentMonth ? (hasPastDue ? "bg-red-500 text-white font-semibold" : "bg-blue-200 text-blue-800 font-semibold") : ""}
                  `}
                >
                  {format(day, "d")}
                </div>
                {isHovered && dayAssignments.length > 0 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 z-10 w-48 rounded-lg bg-gray-900 p-2 text-xs text-white shadow-lg">
                    <div className="font-semibold mb-1">Due on {format(day, "MMM d")}:</div>
                    {dayAssignments.map((a) => (
                      <div key={a.id} className="truncate py-0.5">
                        • {a.title}
                      </div>
                    ))}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-1 h-2 w-2 rotate-45 bg-gray-900"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-grey-100 border border-grey-200"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-blue-200"></div>
            <span>Upcoming</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-red-500"></div>
            <span>Past Due</span>
          </div>
        </div>
      </div>

      {/* Assignment list */}
      <div className="space-y-3">
        {sortedAssignments.map((assignment) => {
          const overdue = isPastDue(assignment.dueDate)

          return (
            <button
              key={assignment.id}
              onClick={() => handleAssignmentClick(assignment.courseId, assignment.id)}
              className="flex w-full items-center justify-between rounded-[20px] border bg-white px-5 py-4 shadow-sm transition-all hover:shadow-md text-left cursor-pointer"
            >
              <div>
                <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                <p className="text-sm text-muted-foreground">{assignment.course}</p>
              </div>
              <div className="flex items-center gap-3">
                {overdue && (
                  <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">Due</span>
                )}
                <span className="text-sm text-muted-foreground">{format(assignment.dueDate, "MMM d, yyyy")}</span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
