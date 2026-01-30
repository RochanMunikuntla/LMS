"use client"

import Link from "next/link"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigation } from "@/lib/navigation"

const courses = [
  {
    id: 1,
    roadmapId: 1,
    moduleId: 1,
    topicId: 1,
    title: "Full-Stack Web Development",
    description: "Master the MERN stack with industry-level projects.",
    progress: 75,
  },
  {
    id: 2,
    roadmapId: 2,
    moduleId: 1,
    topicId: 1,
    title: "Advanced Data Structures",
    description: "Complex algorithms and memory management in C++.",
    progress: 42,
  },
]

export function RecentRoadmaps() {
  const { handleContinueLearning, routes } = useNavigation()

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">My Learning Journey</h2>
        <Link href={routes.learn()} className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group rounded-[20px] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-foreground">{course.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{course.description}</p>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Course Progress</span>
                <span className="font-semibold text-blue-600">{course.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <Button
                onClick={() => handleContinueLearning(course.roadmapId, course.moduleId, course.topicId)}
                className="mt-4 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <Play className="mr-2 h-4 w-4" />
                Continue Learning
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
