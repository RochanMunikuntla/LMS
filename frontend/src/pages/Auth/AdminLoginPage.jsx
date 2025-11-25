"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/Admin/AdminLoginForm.css";


const getApiRoot = () => {
  const raw = import.meta.env.VITE_API_URL || "http://localhost:3000/api"
  const trimmed = raw.endsWith("/") ? raw.slice(0, -1) : raw
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`
}

const AdminLoginForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    adminId: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.adminId.trim()) {
      newErrors.adminId = "Admin ID is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setErrors({})
    try {
      const apiRoot = getApiRoot()
      const response = await fetch(`${apiRoot}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          adminId: formData.adminId,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        navigate("/admin/dashboard")
      } else {
        setErrors({ submit: data.message || "Login failed" })
      }
    } catch (error) {
      console.error("Login error:", error)
      if (error.message.includes("Failed to fetch")) {
        setErrors({ submit: "Cannot reach server. Please ensure the backend is running." })
      } else {
        setErrors({ submit: "An error occurred. Please try again." })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        {/* Header */}
        <div className="admin-login-header">
          <h1>Admin Login</h1>
          <p>Access admin dashboard and settings</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          {/* Admin ID/Email Field */}
          <div className="form-group">
            <label htmlFor="adminId" className="form-label">
              Admin ID
            </label>
            <div className="input-wrapper">
              <span className="input-icon mail-icon">✉</span>
              <input
                id="adminId"
                type="text"
                name="adminId"
                placeholder="Enter your admin ID"
                value={formData.adminId}
                onChange={handleInputChange}
                className={`form-input ${errors.adminId ? "error" : ""}`}
                disabled={isLoading}
              />
            </div>
            {errors.adminId && <span className="error-text">{errors.adminId}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon lock-icon">🔒</span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? "error" : ""}`}
                disabled={isLoading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {/* Submit Error */}
          {errors.submit && <div className="error-alert">{errors.submit}</div>}

          {/* Submit Button */}
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <a href="/forgot-password">Forgot your password?</a>
          </div>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>
            Need help? <a href="/contact-support">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginForm
