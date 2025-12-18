"use client"

import { useState } from "react"
import client from "../services/api"

export default function StudentLoginForm({ onSuccessRedirect } = {}) {
  const [formData, setFormData] = useState({ studentId: "", password: "" })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.studentId.trim()) newErrors.studentId = "Student ID is required"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
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
      const payload = { studentId: formData.studentId, password: formData.password }
      await client.post("/student/login", payload)

      if (typeof onSuccessRedirect === "function") {
        onSuccessRedirect()
        return
      }

      window.location.href = "/student/home"
    } catch (error) {
      console.error("Login error:", error)
      const message =
        error?.response?.data?.message ||
        (error?.message?.includes("Network") || error?.message?.includes("Failed to fetch")
          ? "Cannot connect to server. Please check if the backend is running."
          : error?.message || "An error occurred. Please try again.")
      setErrors({ submit: message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 text-gray-100">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-white">Student Login</h1>
          <p className="text-sm text-gray-400 mt-1">Access your LMS account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Student ID */}
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-300">Student ID</label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">✉</span>
              <input
                id="studentId"
                name="studentId"
                type="text"
                placeholder="Enter your student ID"
                value={formData.studentId}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`block w-full pl-10 pr-3 py-2 rounded-lg bg-gray-900 border ${errors.studentId ? 'border-red-500' : 'border-gray-700'} text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              />
            </div>
            {errors.studentId && <p className="mt-2 text-sm text-red-400">{errors.studentId}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">🔒</span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`block w-full pl-10 pr-12 py-2 rounded-lg bg-gray-900 border ${errors.password ? 'border-red-500' : 'border-gray-700'} text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                disabled={isLoading}
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-200"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="rounded-md bg-red-900/40 p-3 text-sm text-red-300 border border-red-700">{errors.submit}</div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-center">
            <a className="text-sm text-indigo-400 hover:underline" href="/forgot-password">Forgot your password?</a>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Need help? <a className="text-indigo-400 hover:underline" href="/contact-support">Contact Support</a>
        </div>
      </div>
    </div>
  )
}
