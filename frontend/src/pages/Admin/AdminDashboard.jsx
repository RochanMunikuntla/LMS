"use client"

import { useState } from "react"
import "../../styles/AdminDashboard.css"
import StudentManagement from "../../components/StudentManagement"
import FacultyManagement from "../../components/FacultyManagement"
import CourseManagement from "../../components/CourseManagement"
import DepartmentManagement from "../../components/DepartmentManagement"
import AnnouncementManagement from "../../components/AnnouncementManagement"
import CareerManagement from "../../components/CareerManagement"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("students")

  const renderContent = () => {
    switch (activeTab) {
      case "students":
        return <StudentManagement />
      case "faculty":
        return <FacultyManagement />
      case "courses":
        return <CourseManagement />
      case "departments":
        return <DepartmentManagement />
      case "announcements":
        return <AnnouncementManagement />
      case "career":
        return <CareerManagement />
      default:
        return <StudentManagement />
    }
  }

  return (
    <div className="admin-dashboard-wrapper">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>LMS Management</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            <span className="nav-icon">👥</span>
            <span className="nav-label">Students</span>
          </button>

          <button
            className={`nav-item ${activeTab === "faculty" ? "active" : ""}`}
            onClick={() => setActiveTab("faculty")}
          >
            <span className="nav-icon">🎓</span>
            <span className="nav-label">Faculty</span>
          </button>

          <button
            className={`nav-item ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            <span className="nav-icon">📚</span>
            <span className="nav-label">Courses</span>
          </button>

          <button
            className={`nav-item ${activeTab === "departments" ? "active" : ""}`}
            onClick={() => setActiveTab("departments")}
          >
            <span className="nav-icon">🏢</span>
            <span className="nav-label">Departments</span>
          </button>

          <button
            className={`nav-item ${activeTab === "announcements" ? "active" : ""}`}
            onClick={() => setActiveTab("announcements")}
          >
            <span className="nav-icon">📢</span>
            <span className="nav-label">Announcements</span>
          </button>

          <button
            className={`nav-item ${activeTab === "career" ? "active" : ""}`}
            onClick={() => setActiveTab("career")}
          >
            <span className="nav-icon">💼</span>
            <span className="nav-label">Career</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button">🚪 Logout</button>
        </div>
      </div>

      <div className="admin-main-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="header-info">
            <span className="admin-name">Administrator</span>
          </div>
        </div>

        <div className="dashboard-content">{renderContent()}</div>
      </div>
    </div>
  )
}

export default AdminDashboard
