"use client"

import React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function StudentLoginPage() {
  const [formData, setFormData] = useState({ id: "", password: "" })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.id || !formData.password) {
      setError("Please fill in all fields")
      return
    }
    // Backend authentication will handle login
    console.log("[v0] Student login attempt:", { id: formData.id })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <div className="space-y-6 p-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900">LMS</h1>
            <p className="mt-2 text-lg font-semibold text-slate-700">Student Login</p>
            <p className="mt-1 text-sm text-slate-500">Access your learning portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ID Field */}
            <div className="space-y-2">
              <label htmlFor="id" className="block text-sm font-medium text-slate-700">
                Student ID
              </label>
              <input
                id="id"
                name="id"
                type="text"
                placeholder="e.g., 2420030176"
                value={formData.id}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Submit Button */}
            <Button type="submit" className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700">
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500">
            This is a learning management system. Use your institutional credentials.
          </p>
        </div>
      </Card>
    </div>
  )
}
