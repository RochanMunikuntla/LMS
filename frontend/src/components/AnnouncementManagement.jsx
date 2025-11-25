"use client"

import { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import client from "../services/api"
import "../styles/Admin/AnnouncementManagement.css"

const initialFormState = {
  title: "",
  description: "",
  content: "",
}

const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState([])
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

  const fetchAnnouncements = async () => {
    try {
      const { data } = await client.get("/admin/announcements")
      setAnnouncements(data?.message ?? [])
    } catch (error) {
      console.error("Error fetching announcements:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to load announcements" })
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData(initialFormState)
  }

  const handleSaveAnnouncement = async () => {
    setLoading(true)
    try {
      if (editingId) {
        await client.put(`/admin/announcements/${editingId}`, formData)
        setFeedback({ type: "success", text: "Announcement updated successfully" })
      } else {
        await client.post("/admin/announcements", formData)
        setFeedback({ type: "success", text: "Announcement posted successfully" })
      }
      resetForm()
      fetchAnnouncements()
    } catch (error) {
      console.error("Error saving announcement:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to save announcement" })
    } finally {
      setLoading(false)
    }
  }

  const handleEditAnnouncement = (announcement) => {
    setFormData({
      title: announcement.title || "",
      description: announcement.description || "",
      content: announcement.content || "",
    })
    setEditingId(announcement._id)
    setShowForm(true)
  }

  const handleDeleteAnnouncement = async (announcement) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return
    try {
      await client.delete(`/admin/announcements/${announcement._id}`)
      setFeedback({ type: "success", text: "Announcement deleted successfully" })
      fetchAnnouncements()
    } catch (error) {
      console.error("Error deleting announcement:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Failed to delete announcement" })
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
          title: row.title || row.Title || "",
          description: row.description || row.Description || "",
          content: row.content || row.Content || "",
        }
        if (!payload.title) {
          console.warn("Skipping row without title", row)
          continue
        }
        await client.post("/admin/announcements", payload)
        processed += 1
      }
      setFeedback({ type: "success", text: `Imported ${processed} announcements successfully` })
      setBulkFile(null)
      fetchAnnouncements()
    } catch (error) {
      console.error("Announcement bulk upload failed:", error)
      setFeedback({ type: "error", text: error.response?.data?.message || "Bulk upload failed" })
    } finally {
      setBulkLoading(false)
    }
  }

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Announcement Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ Post Announcement"}
        </button>
      </div>

      <div className="bulk-upload-card">
        <h3>Bulk Upload (.xlsx)</h3>
        <p className="bulk-subtitle">Columns: title, description, content.</p>
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
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter announcement title"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter brief description"
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Enter full announcement content"
              rows="5"
            />
          </div>

          <div className="form-actions">
            <button className="btn-success" onClick={handleSaveAnnouncement} disabled={loading}>
              {loading ? "Loading..." : editingId ? "Update Announcement" : "Post Announcement"}
            </button>
            <button className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="announcements-list">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div key={announcement._id} className="announcement-card">
              <div className="announcement-header">
                <h3>{announcement.title}</h3>
                <div className="announcement-actions">
                  <button className="btn-edit" onClick={() => handleEditAnnouncement(announcement)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDeleteAnnouncement(announcement)}>
                    Delete
                  </button>
                </div>
              </div>
              <p className="announcement-description">{announcement.description}</p>
              <p className="announcement-content">{announcement.content}</p>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "2rem" }}>No announcements found</div>
        )}
      </div>
    </div>
  )
}

export default AnnouncementManagement
