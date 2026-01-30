"use client"

import { CourseCard } from "./course-card"

const courses = [
  {
    id: 1,
    title: "Advanced Data Structures",
    semester: "B.Tech - IV Semester",
    progress: 83,
    color: "bg-gray-400",
    icon: "database",
  },
  {
    id: 2,
    title: "C++ for CodeChef",
    semester: "Training",
    progress: 0,
    color: "bg-amber-300",
    icon: "code",
  },
  {
    id: 3,
    title: "Cloud Infrastructure and Services",
    semester: "B.Tech - IV Semester",
    progress: 0,
    color: "bg-emerald-400",
    icon: "cloud",
  },
  {
    id: 4,
    title: "Communication Skills for Engineers",
    semester: "B.Tech - II Semester",
    progress: 16,
    color: "bg-gray-300",
    icon: "message",
  },
  {
    id: 5,
    title: "Computer Networks",
    semester: "B.Tech - IV Semester",
    progress: 28,
    color: "bg-gray-400",
    icon: "network",
  },
  {
    id: 6,
    title: "Design and Analysis of Algorithms",
    semester: "B.Tech - IV Semester",
    progress: 0,
    color: "bg-violet-400",
    icon: "git",
  },
  {
    id: 7,
    title: "Full Stack Application Development",
    semester: "B.Tech - IV Semester",
    progress: 45,
    color: "bg-amber-400",
    icon: "layers",
  },
  {
    id: 8,
    title: "Global Logic Building Contest Practicum",
    semester: "B.Tech",
    progress: 12,
    color: "bg-cyan-300",
    icon: "globe",
  },
  {
    id: 9,
    title: "Mathematical Optimization",
    semester: "B.Tech - IV Semester",
    progress: 0,
    color: "bg-pink-400",
    icon: "calculator",
  },
]

export function CourseGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          semester={course.semester}
          progress={course.progress}
          color={course.color}
          icon={course.icon}
        />
      ))}
    </div>
  )
}
