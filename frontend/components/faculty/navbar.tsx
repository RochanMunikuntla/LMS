"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, User, LogOut, ChevronDown } from "lucide-react"
import { useState } from "react"

const navItems = [
  { name: "Home", href: "/faculty/home" },
  { name: "Courses", href: "/faculty/courses" },
]

export function FacultyNavbar() {
  const pathname = usePathname()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="grid h-16 w-full grid-cols-3 items-center px-8">
        {/* Left - Logo */}
        <div className="flex justify-start">
          <Link href="/faculty/home" className="text-2xl font-bold text-blue-600">
            LMS
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith(item.href)
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right - Notifications & Profile */}
        <div className="flex items-center justify-end gap-4">
          <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            >
              <User className="h-5 w-5" />
            </button>

            {/* Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
                <Link
                  href="/faculty/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Profile
                </Link>
                <hr className="my-2 border-gray-100" />
                <Link
                  href="/login/faculty"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
