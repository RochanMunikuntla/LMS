"use client"

import { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import client from "../services/api"
import "../styles/Admin/CareerManagement.css"

const initialFormState = {
  title: "",
  company: "",
  description: "",
  requirements: "",
  salary: "",
  deadline: "",
}

const getCareerEndpoint = (type) => (type === "internships" ? "/admin/career/internships" : "/admin/career/jobs")

const CareerManagement = () => {
  const [careerType, setCareerType] = useState("internships")
  const [items, setItems] = useState([])
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

  const fetchItems = async (type) => {
    try {
      const { data } = await client.get(getCareerEndpoint(type))
      setItems(data?.message ?? [])
    } catch (error) {
      console.error("Error fetching career items:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to load items" })
    }
  }

  useEffect(() => {
    fetchItems(careerType)
  }, [careerType])

  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData(initialFormState)
  }

  const handleSaveItem = async () => {
    setLoading(true)
    try {
      if (editingId) {
        await client.put(`${getCareerEndpoint(careerType)}/${editingId}`, formData)
        setFeedback({ type: "success", text: "Item updated successfully" })
      } else {
        await client.post(getCareerEndpoint(careerType), formData)
        setFeedback({ type: "success", text: "Item added successfully" })
      }
      resetForm()
      fetchItems(careerType)
    } catch (error) {
      console.error("Error saving item:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to save item" })
    } finally {
      setLoading(false)
    }
  }

  const handleEditItem = (item) => {
    setFormData({
      title: item.title || "",
      company: item.company || "",
      description: item.description || "",
      requirements: item.requirements || "",
      salary: item.salary || "",
      deadline: item.deadline ? item.deadline.substring(0, 10) : "",
    })
    setEditingId(item._id)
    setShowForm(true)
  }

  const handleDeleteItem = async (item) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return
    try {
      await client.delete(`${getCareerEndpoint(careerType)}/${item._id}`)
      setFeedback({ type: "success", text: "Item deleted successfully" })
      fetchItems(careerType)
    } catch (error) {
      console.error("Error deleting item:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to delete item" })
    }
  }

  const handleCancel = () => {
    resetForm()
  }

  const handleTypeChange = (type) => {
    setCareerType(type)
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
  setBulkLoading(true)
  try {
    const rows = await parseExcel(bulkFile)
    let processed = 0
    for (const row of rows) {
      const payload = {
        title: row.title || row.Title || "",
        company: row.company || row.Company || "",
        description: row.description || row.Description || "",
        requirements: row.requirements || row.Requirements || "",
        salary: row.salary || row.Salary || "",
        deadline: row.deadline || row.Deadline || "",
      }
      if (!payload.title) {
        console.warn("Skipping row without title", row)
        continue
      }
      await client.post(getCareerEndpoint(careerType), payload)
      processed += 1
    }
    setFeedback({ type: "success", text: `Imported ${processed} ${careerType}` })
    setBulkFile(null)
    fetchItems(careerType)
  } catch (error) {
    console.error("Career bulk upload failed:", error)
    setFeedback({ type: "error", text: error.response?.data?.message || "Bulk upload failed" })
  } finally {
    setBulkLoading(false)
  }
}

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Career Management</h2>
        <div className="type-tabs">
          <button
            className={`tab-button ${careerType === "internships" ? "active" : ""}`}
            onClick={() => handleTypeChange("internships")}
          >
            Internships
          </button>
          <button
            className={`tab-button ${careerType === "jobs" ? "active" : ""}`}
            onClick={() => handleTypeChange("jobs")}
          >
            Jobs
          </button>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : `+ Add ${careerType === "internships" ? "Internship" : "Job"}`}
        </button>
      </div>

      <div className="bulk-upload-card">
        <h3>Bulk Upload (.xlsx)</h3>
        <p className="bulk-subtitle">Columns: title, company, description, requirements, salary, deadline.</p>
        <div className="bulk-inputs">
          <input type="file" accept=".xlsx,.xls" onChange={(event) => setBulkFile(event.target.files?.[0] ?? null)} />
          <button className="btn-secondary" onClick={handleBulkUpload} disabled={bulkLoading || !bulkFile}>
            {bulkLoading ? "Uploading..." : `Upload ${careerType === "internships" ? "Internships" : "Jobs"}`}
          </button>
        </div>
      </div>

      {feedback.text && <div className={`message ${feedback.type === "error" ? "error" : "success"}`}>{feedback.text}</div>}

      {showForm && (
        <div className="form-container">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter title"
            />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Enter company name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              placeholder="Enter requirements"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Salary / Stipend</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="Enter salary/stipend"
            />
          </div>

          <div className="form-group">
            <label>Deadline</label>
            <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} />
          </div>

          <div className="form-actions">
            <button className="btn-success" onClick={handleSaveItem} disabled={loading}>
              {loading ? "Loading..." : editingId ? "Update" : "Add"}
            </button>
            <button className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="career-list">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="career-card">
              <div className="career-header">
                <h3>{item.title}</h3>
                <span className="company-badge">{item.company}</span>
              </div>
              <p className="career-description">{item.description}</p>
              <div className="career-meta">
                <span>Salary: {item.salary}</span>
                <span>Deadline: {item.deadline}</span>
              </div>
              <p className="career-requirements">Requirements: {item.requirements}</p>
              <div className="career-actions">
                <button className="btn-edit" onClick={() => handleEditItem(item)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDeleteItem(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "2rem" }}>No {careerType} found</div>
        )}
      </div>
    </div>
  )
}

export default CareerManagement
