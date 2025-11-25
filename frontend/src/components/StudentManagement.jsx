"use client"

import { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import client from "../services/api"
import "../styles/Admin/StudentManagement.css"

const initialFormState = {
  studentId: "",
  name: "",
  email: "",
  department: "",
  year: "",
  password: "",
}

const StudentManagement = () => {
  const [students, setStudents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(initialFormState)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: "", text: "" })
  const [bulkFile, setBulkFile] = useState(null)
  const [bulkPassword, setBulkPassword] = useState("")
  const [bulkLoading, setBulkLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const fetchStudents = async () => {
    try {
      const { data } = await client.get("/admin/students")
      setStudents(data?.message ?? [])
    } catch (error) {
      console.error("Error fetching students:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to fetch students" })
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData(initialFormState)
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
    if (!bulkPassword) {
      setFeedback({ type: "error", text: "Provide a default password for rows missing one." })
      return
    }
    setBulkLoading(true)
    try {
      const rows = await parseExcel(bulkFile)
      let processed = 0
      for (const row of rows) {
        const payload = {
          studentId: row.studentId || row.StudentId || "",
          name: row.name || row.Name || "",
          email: row.email || row.Email || "",
          department: row.department || row.Department || "",
          year: row.year || row.Year || "",
          password: row.password || row.Password || bulkPassword,
        }
        if (!payload.studentId) {
          console.warn("Skipping row without studentId", row)
          continue
        }
        await client.post("/admin/students", payload)
        processed += 1
      }
      setFeedback({ type: "success", text: `Imported ${processed} students successfully` })
      setBulkFile(null)
      fetchStudents()
    } catch (error) {
      console.error("Bulk upload failed:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Bulk upload failed" })
    } finally {
      setBulkLoading(false)
    }
  }

  const handleAddStudent = async () => {
    setLoading(true)
    try {
      const payload = { ...formData }
      if (editingId) {
        delete payload.password
        await client.put(`/admin/students/${editingId}`, payload)
        setFeedback({ type: "success", text: "Student updated successfully" })
      } else {
        await client.post("/admin/students", payload)
        setFeedback({ type: "success", text: "Student added successfully" })
      }
      resetForm()
      fetchStudents()
    } catch (error) {
      console.error("Error saving student:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to save student" })
    } finally {
      setLoading(false)
    }
  }

  const handleEditStudent = (student) => {
    setFormData({
      studentId: student.studentId || "",
      name: student.name || "",
      email: student.email || "",
      department: student.department?.deptName || student.department || "",
      year: student.year?.toString() || "",
      password: "",
    })
    setEditingId(student._id)
    setShowForm(true)
  }

  const handleDeleteStudent = async (student) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return
    try {
      await client.delete(`/admin/students/${student._id}`)
      setFeedback({ type: "success", text: "Student deleted successfully" })
      fetchStudents()
    } catch (error) {
      console.error("Error deleting student:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to delete student" })
    }
  }

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Student Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ Add Student"}
        </button>
      </div>

      <div className="bulk-upload-card">
        <h3>Bulk Upload (.xlsx)</h3>
        <p className="bulk-subtitle">Use this option for large imports. Columns: studentId, name, email, department, year, password.</p>
        <div className="bulk-inputs">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(event) => setBulkFile(event.target.files?.[0] ?? null)}
          />
          <input
            type="password"
            placeholder="Default password"
            value={bulkPassword}
            onChange={(e) => setBulkPassword(e.target.value)}
          />
          <button className="btn-secondary" onClick={handleBulkUpload} disabled={bulkLoading || !bulkFile}>
            {bulkLoading ? "Uploading..." : "Upload Excel"}
          </button>
        </div>
      </div>

      {feedback.text && <div className={`message ${feedback.type === "error" ? "error" : "success"}`}>{feedback.text}</div>}

      {showForm && (
        <div className="form-container">
          <div className="form-group">
            <label>Student ID</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              placeholder="Enter student ID"
              disabled={!!editingId}
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter student name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Enter department"
            />
          </div>

          <div className="form-group">
            <label>Year</label>
            <select name="year" value={formData.year} onChange={handleInputChange}>
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          {!editingId && (
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Temporary password"
              />
            </div>
          )}

          <div className="form-actions">
            <button className="btn-success" onClick={handleAddStudent} disabled={loading}>
              {loading ? "Loading..." : editingId ? "Update Student" : "Add Student"}
            </button>
            <button className="btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id}>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.department?.deptName || student.department}</td>
                  <td>{student.year}</td>
                  <td className="action-buttons">
                    <button className="btn-edit" onClick={() => handleEditStudent(student)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDeleteStudent(student)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentManagement

