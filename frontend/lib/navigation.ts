"use client"

// Centralized navigation utility for backend integration
// All routes are constructed dynamically using IDs from backend data

import { useRouter } from "next/navigation"
import { useCallback } from "react"

// Route builders - these construct URLs from IDs
export const routes = {
  // Dashboard
  dashboard: () => "/",

  // Courses
  courses: () => "/courses",
  courseDetail: (courseId: string | number) => `/courses/${courseId}`,
  assignment: (courseId: string | number, assignmentId: string | number) =>
    `/courses/${courseId}/assignments/${assignmentId}`,
  material: (courseId: string | number, materialId: string | number) => `/courses/${courseId}/materials/${materialId}`,
  quiz: (courseId: string | number, quizId: string | number) => `/courses/${courseId}/quizzes/${quizId}`,

  // Learn (Roadmaps)
  learn: () => "/learn",
  roadmap: (roadmapId: string | number) => `/learn/${roadmapId}`,
  topic: (roadmapId: string | number, moduleId: string | number, topicId: string | number) =>
    `/learn/${roadmapId}/${moduleId}/${topicId}`,

  // Practice (Problems)
  practice: () => "/practice",
  problem: (problemId: string | number) => `/practice/${problemId}`,

  // ProjectHub
  projecthub: () => "/projecthub",
  project: (projectId: string | number) => `/projecthub/${projectId}`,

  // Profile & Settings
  profile: () => "/profile",
  settings: () => "/settings",
}

// Navigation hook for use in components
export function useNavigation() {
  const router = useRouter()

  // Metric click handlers
  const handleMetricClick = useCallback(
    (metricType: "courses" | "problems" | "projects" | "assignments") => {
      switch (metricType) {
        case "courses":
          router.push(routes.courses())
          break
        case "problems":
          router.push(routes.practice())
          break
        case "projects":
          router.push(routes.projecthub())
          break
        case "assignments":
          router.push(routes.courses()) // Assignments are under courses
          break
      }
    },
    [router],
  )

  // Problem click handler
  const handleProblemClick = useCallback(
    (problemId: string | number) => {
      router.push(routes.problem(problemId))
    },
    [router],
  )

  // Assignment click handler
  const handleAssignmentClick = useCallback(
    (courseId: string | number, assignmentId: string | number) => {
      router.push(routes.assignment(courseId, assignmentId))
    },
    [router],
  )

  // Roadmap click handler
  const handleRoadmapClick = useCallback(
    (roadmapId: string | number) => {
      router.push(routes.roadmap(roadmapId))
    },
    [router],
  )

  // Continue learning handler - navigates to specific topic
  const handleContinueLearning = useCallback(
    (roadmapId: string | number, moduleId: string | number, topicId: string | number) => {
      router.push(routes.topic(roadmapId, moduleId, topicId))
    },
    [router],
  )

  // Project click handler
  const handleProjectClick = useCallback(
    (projectId: string | number) => {
      router.push(routes.project(projectId))
    },
    [router],
  )

  // Course click handler
  const handleCourseClick = useCallback(
    (courseId: string | number) => {
      router.push(routes.courseDetail(courseId))
    },
    [router],
  )

  return {
    handleMetricClick,
    handleProblemClick,
    handleAssignmentClick,
    handleRoadmapClick,
    handleContinueLearning,
    handleProjectClick,
    handleCourseClick,
    routes,
    router,
  }
}
