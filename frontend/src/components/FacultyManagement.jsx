"use client"

import { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import client from "../services/api"
import "../styles/Admin/FacultyManagement.css"

const initialFormState = {
  facultyId: "",
  name: "",
  email: "",
  department: "",
  year: "",
  password: "",
}

const FacultyManagement = () => {
  const [faculties, setFaculties] = useState([])
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

  const fetchFaculties = async () => {
    try {
      const { data } = await client.get("/admin/faculty")
      setFaculties(data?.message ?? [])
    } catch (error) {
      console.error("Error fetching faculties:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to fetch faculty list" })
    }
  }

  useEffect(() => {
    fetchFaculties()
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
          facultyId: row.facultyId || row.FacultyId || "",
          name: row.name || row.Name || "",
          email: row.email || row.Email || "",
          department: row.department || row.Department || "",
          year: row.year || row.Year || "",
          password: row.password || row.Password || bulkPassword,
        }
        if (!payload.facultyId) {
          console.warn("Skipping row without facultyId", row)
          continue
        }
        await client.post("/admin/faculty", payload)
        processed += 1
      }
      setFeedback({ type: "success", text: `Imported ${processed} faculty records successfully` })
      setBulkFile(null)
      fetchFaculties()
    } catch (error) {
      console.error("Faculty bulk upload failed:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Bulk upload failed" })
    } finally {
      setBulkLoading(false)
    }
  }

  const handleSaveFaculty = async () => {
    setLoading(true)
    try {
      const payload = { ...formData }
      if (editingId) {
        delete payload.password
        await client.put(`/admin/faculty/${editingId}`, payload)
        setFeedback({ type: "success", text: "Faculty updated successfully" })
      } else {
        await client.post("/admin/faculty", payload)
        setFeedback({ type: "success", text: "Faculty added successfully" })
      }
      resetForm()
      fetchFaculties()
    } catch (error) {
      console.error("Error saving faculty:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to save faculty" })
    } finally {
      setLoading(false)
    }
  }

  const handleEditFaculty = (faculty) => {
    setFormData({
      facultyId: faculty.facultyId || "",
      name: faculty.name || "",
      email: faculty.email || "",
      department: faculty.department?.deptName || faculty.department || "",
      year: faculty.year?.toString() || "",
      password: "",
    })
    setEditingId(faculty._id)
    setShowForm(true)
  }

  const handleDeleteFaculty = async (faculty) => {
    if (!window.confirm("Are you sure you want to delete this faculty?")) return
    try {
      await client.delete(`/admin/faculty/${faculty._id}`)
      setFeedback({ type: "success", text: "Faculty deleted successfully" })
      fetchFaculties()
    } catch (error) {
      console.error("Error deleting faculty:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to delete faculty" })
    }
  }

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Faculty Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ Add Faculty"}
        </button>
      </div>

      <div className="bulk-upload-card">
        <h3>Bulk Upload (.xlsx)</h3>
        <p className="bulk-subtitle">Columns: facultyId, name, email, department, year, password.</p>
        <div className="bulk-inputs">
          <input type="file" accept=".xlsx,.xls" onChange={(event) => setBulkFile(event.target.files?.[0] ?? null)} />
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
            <label>Faculty ID</label>
            <input
              type="text"
              name="facultyId"
              value={formData.facultyId}
              onChange={handleInputChange}
              placeholder="Enter faculty ID"
              disabled={!!editingId}
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter faculty name" />
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
            <input type="text" name="year" value={formData.year} onChange={handleInputChange} placeholder="Enter year (optional)" />
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
            <button className="btn-success" onClick={handleSaveFaculty} disabled={loading}>
              {loading ? "Loading..." : editingId ? "Update Faculty" : "Add Faculty"}
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
              <th>Faculty ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculties.length > 0 ? (
              faculties.map((faculty) => (
                <tr key={faculty._id}>
                  <td>{faculty.facultyId}</td>
                  <td>{faculty.name}</td>
                  <td>{faculty.email}</td>
                  <td>{faculty.department?.deptName || faculty.department}</td>
                  <td>{faculty.year}</td>
                  <td className="action-buttons">
                    <button className="btn-edit" onClick={() => handleEditFaculty(faculty)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDeleteFaculty(faculty)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No faculties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FacultyManagement
