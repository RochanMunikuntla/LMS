"use client"

import { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import client from "../services/api"
import "../styles/Admin/DepartmentManagement.css"

const initialFormState = {
  deptId: "",
  deptName: "",
  email: "",
  HoD: "",
}

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([])
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

  const fetchDepartments = async () => {
    try {
      const { data } = await client.get("/admin/departments")
      setDepartments(data?.message ?? [])
    } catch (error) {
      console.error("Error fetching departments:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to load departments" })
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData(initialFormState)
  }

  const handleSaveDepartment = async () => {
    setLoading(true)
    try {
      if (editingId) {
        await client.put(`/admin/departments/${editingId}`, {
          name: formData.deptName,
          email: formData.email,
          HoD: formData.HoD,
        })
        setFeedback({ type: "success", text: "Department updated successfully" })
      } else {
        await client.post("/admin/departments", formData)
        setFeedback({ type: "success", text: "Department added successfully" })
      }
      resetForm()
      fetchDepartments()
    } catch (error) {
      console.error("Error saving department:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to save department" })
    } finally {
      setLoading(false)
    }
  }

  const handleEditDepartment = (dept) => {
    setFormData({
      deptId: dept.deptId || "",
      deptName: dept.deptName || dept.name || "",
      email: dept.email || "",
      HoD: dept.HoD?.name || dept.HoD || "",
    })
    setEditingId(dept._id)
    setShowForm(true)
  }

  const handleDeleteDepartment = async (dept) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return
    try {
      await client.delete(`/admin/departments/${dept._id}`)
      setFeedback({ type: "success", text: "Department deleted successfully" })
      fetchDepartments()
    } catch (error) {
      console.error("Error deleting department:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to delete department" })
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
          deptId: row.deptId || row.DeptId || "",
          deptName: row.deptName || row.DeptName || "",
          email: row.email || row.Email || "",
          HoD: row.HoD || row.hod || row.HOD || "",
        }
        if (!payload.deptId) {
          console.warn("Skipping row without deptId", row)
          continue
        }
        await client.post("/admin/departments", payload)
        processed += 1
      }
      setFeedback({ type: "success", text: `Imported ${processed} departments successfully` })
      setBulkFile(null)
      fetchDepartments()
    } catch (error) {
      console.error("Department bulk upload failed:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Bulk upload failed" })
    } finally {
      setBulkLoading(false)
    }
  }

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Department Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ Add Department"}
        </button>
      </div>

      <div className="bulk-upload-card">
        <h3>Bulk Upload (.xlsx)</h3>
        <p className="bulk-subtitle">Columns: deptId, deptName, email, HoD.</p>
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
            <label>Department ID</label>
            <input
              type="text"
              name="deptId"
              value={formData.deptId}
              onChange={handleInputChange}
              placeholder="Enter department ID"
              disabled={!!editingId}
            />
          </div>

          <div className="form-group">
            <label>Department Name</label>
            <input
              type="text"
              name="deptName"
              value={formData.deptName}
              onChange={handleInputChange}
              placeholder="Enter department name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter department email"
            />
          </div>

          <div className="form-group">
            <label>Head of Department</label>
            <input
              type="text"
              name="HoD"
              value={formData.HoD}
              onChange={handleInputChange}
              placeholder="Enter faculty name (HoD)"
            />
          </div>

          <div className="form-actions">
            <button className="btn-success" onClick={handleSaveDepartment} disabled={loading}>
              {loading ? "Loading..." : editingId ? "Update Department" : "Add Department"}
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
              <th>Department ID</th>
              <th>Department Name</th>
              <th>Email</th>
              <th>HoD</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0 ? (
              departments.map((dept) => (
                <tr key={dept._id}>
                  <td>{dept.deptId}</td>
                  <td>{dept.deptName || dept.name}</td>
                  <td>{dept.email}</td>
                  <td>{dept.HoD?.name || dept.HoD}</td>
                  <td className="action-buttons">
                    <button className="btn-edit" onClick={() => handleEditDepartment(dept)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDeleteDepartment(dept)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No departments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DepartmentManagement
