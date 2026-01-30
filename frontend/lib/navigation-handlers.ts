'use client';

// Faculty navigation handlers - backend-ready pattern
import { useRouter } from "next/navigation"

export function useFacultyNavigation() {
  const router = useRouter()

  return {
    goToHome: () => router.push("/faculty/home"),
    goToProfile: () => router.push("/faculty/profile"),
    goToCourses: () => router.push("/faculty/courses"),
    goToCourseDetail: (courseId: string | number) =>
      router.push(`/faculty/courses/${courseId}`),
    goToAssignments: (courseId: string | number) =>
      router.push(`/faculty/courses/${courseId}/assignments`),
    goToAssignmentDetail: (courseId: string | number, assignmentId: string | number) =>
      router.push(`/faculty/courses/${courseId}/assignments/${assignmentId}`),
    goToCreateAssignment: (courseId: string | number) =>
      router.push(`/faculty/courses/${courseId}/assignments/create`),
    goToEditAssignment: (courseId: string | number, assignmentId: string | number) =>
      router.push(`/faculty/courses/${courseId}/assignments/${assignmentId}/edit`),
    goToQuizzes: (courseId: string | number) =>
      router.push(`/faculty/courses/${courseId}/quiz`),
    goToQuizDetail: (courseId: string | number, quizId: string | number) =>
      router.push(`/faculty/courses/${courseId}/quiz/${quizId}`),
    goToCreateQuiz: (courseId: string | number) =>
      router.push(`/faculty/courses/${courseId}/quiz/create`),
    goToMaterials: (courseId: string | number) =>
      router.push(`/faculty/courses/${courseId}/materials`),
    goToMaterialDetail: (courseId: string | number, materialId: string | number) =>
      router.push(`/faculty/courses/${courseId}/materials/${materialId}`),
    goToCreateMaterial: (courseId: string | number) =>
      router.push(`/faculty/courses/${courseId}/materials/create`),
    goToEditMaterial: (courseId: string | number, materialId: string | number) =>
      router.push(`/faculty/courses/${courseId}/materials/${materialId}/edit`),
    goToAnnouncements: () => router.push("/faculty/courses/announcements"),
    goToAnnouncementDetail: (announcementId: string | number) =>
      router.push(`/faculty/courses/announcements/${announcementId}`),
    goToLogin: (role: "student" | "faculty" | "admin") =>
      router.push(`/login/${role}`),
  }
}

// Admin navigation handlers
export function useAdminNavigation() {
  const router = useRouter()

  return {
    // Home
    goToHome: () => router.push("/admin/home"),
    goToProfile: () => router.push("/admin/profile"),
    goToLogin: () => router.push("/login/admin"),

    // Students
    goToStudents: () => router.push("/admin/students"),
    goToStudentDetail: (studentId: string | number) =>
      router.push(`/admin/students/${studentId}`),
    goToCreateStudent: () => router.push("/admin/students/create"),
    goToEditStudent: (studentId: string | number) =>
      router.push(`/admin/students/${studentId}/edit`),

    // Faculty
    goToFaculty: () => router.push("/admin/faculty"),
    goToFacultyDetail: (facultyId: string | number) =>
      router.push(`/admin/faculty/${facultyId}`),
    goToCreateFaculty: () => router.push("/admin/faculty/create"),
    goToEditFaculty: (facultyId: string | number) =>
      router.push(`/admin/faculty/${facultyId}/edit`),

    // Courses
    goToCourses: () => router.push("/admin/courses"),
    goToCourseDetail: (courseId: string | number) =>
      router.push(`/admin/courses/${courseId}`),
    goToCreateCourse: () => router.push("/admin/courses/create"),
    goToEditCourse: (courseId: string | number) =>
      router.push(`/admin/courses/${courseId}/edit`),

    // Departments
    goToDepartments: () => router.push("/admin/departments"),
    goToDepartmentDetail: (deptId: string | number) =>
      router.push(`/admin/departments/${deptId}`),
    goToCreateDepartment: () => router.push("/admin/departments/create"),
    goToEditDepartment: (deptId: string | number) =>
      router.push(`/admin/departments/${deptId}/edit`),

    // Announcements
    goToAnnouncements: () => router.push("/admin/announcements"),
    goToAnnouncementDetail: (announcementId: string | number) =>
      router.push(`/admin/announcements/${announcementId}`),
    goToCreateAnnouncement: () => router.push("/admin/announcements/create"),
    goToEditAnnouncement: (announcementId: string | number) =>
      router.push(`/admin/announcements/${announcementId}/edit`),
  }
}
