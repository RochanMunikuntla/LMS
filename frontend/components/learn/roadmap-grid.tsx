"use client"

import { useState } from "react"
import { RoadmapCard } from "./roadmap-card"
import { RoadmapSearch } from "./roadmap-search"

const roadmaps = [
  {
    id: 1,
    title: "Python",
    description: "Master the art of writing clean Python code and implementing core data structures and algorithms.",
    domain: "Programming",
    level: "Beginner" as const,
    icon: "python",
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    description: "Learn the building blocks of web development with modern JavaScript ES6+ syntax and patterns.",
    domain: "Web Development",
    level: "Beginner" as const,
    icon: "javascript",
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    description: "Build a strong foundation in DSA concepts essential for technical interviews and problem solving.",
    domain: "Computer Science",
    level: "Intermediate" as const,
    icon: "default",
  },
  {
    id: 4,
    title: "SQL & Database Design",
    description: "Design efficient database schemas and write optimized queries for real-world applications.",
    domain: "Databases",
    level: "Beginner" as const,
    icon: "database",
  },
  {
    id: 5,
    title: "Cloud Computing with AWS",
    description: "Deploy and manage scalable applications using Amazon Web Services core infrastructure.",
    domain: "Cloud",
    level: "Intermediate" as const,
    icon: "cloud",
  },
  {
    id: 6,
    title: "Machine Learning Basics",
    description: "Understand fundamental ML concepts, algorithms, and practical implementation with Python.",
    domain: "AI / ML",
    level: "Intermediate" as const,
    icon: "ai",
  },
  {
    id: 7,
    title: "System Design",
    description: "Learn to design large-scale distributed systems and prepare for senior engineering interviews.",
    domain: "Architecture",
    level: "Advanced" as const,
    icon: "default",
  },
  {
    id: 8,
    title: "UI/UX Design Principles",
    description: "Create user-centered designs with accessibility and usability best practices in mind.",
    domain: "Design",
    level: "Beginner" as const,
    icon: "design",
  },
  {
    id: 9,
    title: "Cybersecurity Fundamentals",
    description: "Understand security principles, common vulnerabilities, and how to build secure applications.",
    domain: "Security",
    level: "Intermediate" as const,
    icon: "security",
  },
]

export function RoadmapGrid() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRoadmaps = roadmaps.filter(
    (roadmap) =>
      roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.domain.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      <RoadmapSearch value={searchQuery} onChange={setSearchQuery} />

      {filteredRoadmaps.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRoadmaps.map((roadmap) => (
            <RoadmapCard
              key={roadmap.id}
              id={roadmap.id}
              title={roadmap.title}
              description={roadmap.description}
              domain={roadmap.domain}
              level={roadmap.level}
              icon={roadmap.icon}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-sm text-gray-500">No roadmaps found matching "{searchQuery}"</div>
      )}
    </div>
  )
}
