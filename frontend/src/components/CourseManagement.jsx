"use client"

import { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import client from "../services/api"
import "../styles/Admin/CourseManagement.css"

const initialFormState = {
  courseId: "",
  courseName: "",
  deptName: "",
  credits: "",
}

const CourseManagement = () => {
  const [courses, setCourses] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(initialFormState)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: "", text: "" })
  const [bulkFile, setBulkFile] = useState(null)
  const [bulkLoading, setBulkLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const fetchCourses = async () => {
    try {
      const { data } = await client.get("/admin/courses")
      setCourses(data?.message ?? [])
    } catch (error) {
      console.error("Error fetching courses:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to load courses" })
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData(initialFormState)
  }

  const handleSaveCourse = async () => {
    setLoading(true)
    try {
      const payload = editingId ? { ...formData, department: formData.deptName } : formData
      if (editingId) {
        await client.put(`/admin/courses/${editingId}`, payload)
        setFeedback({ type: "success", text: "Course updated successfully" })
      } else {
        await client.post("/admin/courses", payload)
        setFeedback({ type: "success", text: "Course added successfully" })
      }
      resetForm()
      fetchCourses()
    } catch (error) {
      console.error("Error saving course:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to save course" })
    } finally {
      setLoading(false)
    }
  }

  const handleEditCourse = (course) => {
    setFormData({
      courseId: course.courseId || "",
      courseName: course.courseName || "",
      deptName: course.department?.deptName || course.deptName || "",
      credits: course.credits?.toString() || "",
    })
    setEditingId(course._id)
    setShowForm(true)
  }

  const handleDeleteCourse = async (course) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return
    try {
      await client.delete(`/admin/courses/${course._id}`, { data: { courseId: course.courseId } })
      setFeedback({ type: "success", text: "Course deleted successfully" })
      fetchCourses()
    } catch (error) {
      console.error("Error deleting course:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to delete course" })
    }
  }

  const handleCancel = () => {
    resetForm()
  }

  const parseExcel = async (file) => {
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    return XLSX.utils.sheet_to_json(sheet, { defval: "" })
  }

  const handleBulkUpload = async () => {
    if (!bulkFile) {
      setFeedback({ type: "error", text: "Please select an Excel file." })
      return
    }
    setBulkLoading(true)
    try {
      const rows = await parseExcel(bulkFile)
      let processed = 0
      for (const row of rows) {
        const payload = {
          courseId: row.courseId || row.CourseId || "",
          courseName: row.courseName || row.CourseName || "",
          deptName: row.deptName || row.department || row.Department || "",
          credits: row.credits || row.Credits || "",
        }
        if (!payload.courseId) {
          console.warn("Skipping row without courseId", row)
          continue
        }
        if (payload.credits && typeof payload.credits === "string") {
          payload.credits = Number(payload.credits)
        }
        await client.post("/admin/courses", payload)
        processed += 1
      }
      setFeedback({ type: "success", text: `Imported ${processed} courses successfully` })
      setBulkFile(null)
      fetchCourses()
    } catch (error) {
      console.error("Course bulk upload failed:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Bulk upload failed" })
    } finally {
      setBulkLoading(false)
    }
  }

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Course Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ Add Course"}
        </button>
      </div>

      <div className="bulk-upload-card">
        <h3>Bulk Upload (.xlsx)</h3>
        <p className="bulk-subtitle">Columns: courseId, courseName, deptName, credits.</p>
        <div className="bulk-inputs">
          <input type="file" accept=".xlsx,.xls" onChange={(event) => setBulkFile(event.target.files?.[0] ?? null)} />
          <button className="btn-secondary" onClick={handleBulkUpload} disabled={bulkLoading || !bulkFile}>
            {bulkLoading ? "Uploading..." : "Upload Excel"}
          </button>
        </div>
      </div>

      {feedback.text && <div className={`message ${feedback.type === "error" ? "error" : "success"}`}>{feedback.text}</div>}

      {showForm && (
        <div className="form-container">
          <div className="form-group">
            <label>Course ID</label>
            <input
              type="text"
              name="courseId"
              value={formData.courseId}
              onChange={handleInputChange}
              placeholder="Enter course ID"
              disabled={!!editingId}
            />
          </div>

          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              placeholder="Enter course name"
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="deptName"
              value={formData.deptName}
              onChange={handleInputChange}
              placeholder="Enter department"
            />
          </div>

          <div className="form-group">
            <label>Credits</label>
            <input
              type="number"
              name="credits"
              value={formData.credits}
              onChange={handleInputChange}
              placeholder="Enter credits"
            />
          </div>

          <div className="form-actions">
            <button className="btn-success" onClick={handleSaveCourse} disabled={loading}>
              {loading ? "Loading..." : editingId ? "Update Course" : "Add Course"}
            </button>
            <button className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Department</th>
              <th>Credits</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.courseId}</td>
                  <td>{course.courseName}</td>
                  <td>{course.department?.deptName || course.deptName}</td>
                  <td>{course.credits}</td>
                  <td className="action-buttons">
                    <button className="btn-edit" onClick={() => handleEditCourse(course)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDeleteCourse(course)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseManagement
