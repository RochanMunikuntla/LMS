"use client"

import { Clock } from "lucide-react"

interface QuizTimerProps {
  formattedTime: string
  isLowTime: boolean
}

export function QuizTimer({ formattedTime, isLowTime }: QuizTimerProps) {
  return (
    <div
      className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
        isLowTime ? "bg-red-100 text-red-600 animate-pulse" : "bg-gray-100 text-gray-700"
      }`}
    >
      <Clock className={`h-4 w-4 ${isLowTime ? "text-red-600" : "text-gray-500"}`} />
      <span className={isLowTime ? "font-bold" : ""}>{formattedTime}</span>
    </div>
  )
}
