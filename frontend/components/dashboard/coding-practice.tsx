"use client"

import Link from "next/link"
import { TrendingUp, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CodingPractice() {
  return (
    <div className="relative overflow-hidden rounded-[20px] bg-blue-600 p-6 text-white">
      {/* Background decoration */}
      <div className="absolute right-4 top-4">
        <TrendingUp className="h-6 w-6 text-blue-400" />
      </div>

      <p className="text-xs font-medium uppercase tracking-wide text-blue-200">CODING PRACTICE</p>
      <p className="mt-3 text-sm text-blue-100">Recent Session</p>
      <h3 className="mt-1 text-xl font-bold">Arrays & Hashing</h3>
      <p className="mt-2 text-sm italic text-blue-100">"You're 3 problems away from a 7-day streak!"</p>

      <Button asChild className="mt-5 w-full rounded-full bg-white text-blue-600 hover:bg-blue-50">
        <Link href="/practice">
          <Code className="mr-2 h-4 w-4" />
          Continue Practice
        </Link>
      </Button>
    </div>
  )
}
