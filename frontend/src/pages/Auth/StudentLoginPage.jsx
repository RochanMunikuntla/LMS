"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./StudentLoginForm.css"

const StudentLoginForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    studentId: "",
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

    if (!formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required"
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
    setErrors({}) // Clear previous errors
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000"
      // Remove trailing slash and ensure we have the base URL
      const baseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl
      // Check if /api is already in the base URL
      const loginUrl = baseUrl.endsWith('/api') 
        ? `${baseUrl}/student/login` 
        : `${baseUrl}/api/student/login`
      console.log("Attempting login to:", loginUrl)
      console.log("Request body:", { studentId: formData.studentId, password: "***" })
      
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for session-based auth
        body: JSON.stringify({
          studentId: formData.studentId,
          password: formData.password,
        }),
      })

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        // Try to parse error message
        let errorMessage = "Login failed"
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch {
          // If response is not JSON, use status text
          if (response.status === 404) {
            errorMessage = "API endpoint not found. Please check if the backend server is running and the route is correct."
          } else {
            errorMessage = response.statusText || `Error ${response.status}: Login failed`
          }
        }
        console.error("Login failed:", response.status, errorMessage)
        setErrors({ submit: errorMessage })
        return
      }

      // Parse successful response
      let data
      try {
        data = await response.json()
      } catch {
        // If response is not JSON but status is ok, still redirect
        console.warn("Response is not JSON, but status is OK")
        navigate("/student/home")
        return
      }

      console.log("Login successful:", data)
      // Redirect to student home page
      navigate("/student/home")
    } catch (error) {
      console.error("Login error:", error)
      // Provide more specific error messages
      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        setErrors({ submit: "Cannot connect to server. Please check if the backend is running." })
      } else {
        setErrors({ submit: error.message || "An error occurred. Please try again." })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-form-wrapper">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h1>Student Login</h1>
          <p>Access your LMS account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Student ID Field */}
          <div className="form-group">
            <label htmlFor="studentId" className="form-label">
              Student ID
            </label>
            <div className="input-wrapper">
              <span className="input-icon mail-icon">✉</span>
              <input
                id="studentId"
                type="text"
                name="studentId"
                placeholder="Enter your student ID"
                value={formData.studentId}
                onChange={handleInputChange}
                className={`form-input ${errors.studentId ? "error" : ""}`}
                disabled={isLoading}
              />
            </div>
            {errors.studentId && <span className="error-text">{errors.studentId}</span>}
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

export default StudentLoginForm
