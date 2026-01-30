"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, User } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/student/home" },
  { name: "Courses", href: "/courses" },
  { name: "Learn", href: "/learn" },
  { name: "Practice", href: "/practice" },
  { name: "ProjectHub", href: "/projecthub" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
  <div className="grid h-16 w-full grid-cols-3 items-center">
    {/* Left - Logo (hard left aligned) */}
    <div className="flex justify-start pl-6">
      <Link href="/" className="text-xl font-bold text-blue-600">
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
            pathname === item.href
              ? "text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>

    {/* Right - Notifications & Profile (hard right aligned) */}
    <div className="flex items-center justify-end gap-4 pr-6">
      <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </button>

      <div className="group relative">
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
          <User className="h-5 w-5" />
        </button>

        {/* Dropdown */}
        <div className="invisible absolute right-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
          <div className="w-44 rounded-[12px] border border-gray-100 bg-white py-2 shadow-lg">
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              Settings
            </Link>
            <hr className="my-2 border-gray-100" />
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

  )
}
