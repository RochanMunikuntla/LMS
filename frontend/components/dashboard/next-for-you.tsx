"use client"

import { ArrowRight, Layers, Cloud } from "lucide-react"
import { useNavigation } from "@/lib/navigation"

const recommendations = [
  {
    id: 1,
    roadmapId: 3,
    title: "System Design Patterns",
    description: "Foundational for senior roles",
    trackColor: "bg-blue-100 text-blue-600",
    icon: Layers,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: 2,
    roadmapId: 4,
    title: "Kubernetes for Pro's",
    description: "Scale your applications",
    trackColor: "bg-emerald-100 text-emerald-600",
    icon: Cloud,
    iconBg: "bg-gray-200",
    iconColor: "text-gray-600",
  },
]

export function NextForYou() {
  const { handleRoadmapClick } = useNavigation()

  return (
    <section>
      <h2 className="mb-4 text-lg font-bold text-foreground">Next for You</h2>
      <div className="space-y-3">
        {recommendations.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => handleRoadmapClick(item.roadmapId)}
              className="w-full rounded-[20px] border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md text-left cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg}`}>
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
              </div>
              <h3 className="mt-3 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              <span className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                View Course
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
