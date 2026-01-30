"use client"

import { useState, useEffect, useCallback } from "react"

interface UseQuizTimerOptions {
  initialSeconds: number | null // null means indefinite
  onTimeUp?: () => void
}

interface UseQuizTimerReturn {
  remainingSeconds: number | null
  isRunning: boolean
  isLowTime: boolean
  formattedTime: string
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
}

export function useQuizTimer({ initialSeconds, onTimeUp }: UseQuizTimerOptions): UseQuizTimerReturn {
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  // Timer is considered "low" when less than 60 seconds remain
  const isLowTime = remainingSeconds !== null && remainingSeconds < 60

  // Format time as MM:SS
  const formattedTime =
    remainingSeconds !== null
      ? `${Math.floor(remainingSeconds / 60)
          .toString()
          .padStart(2, "0")}:${(remainingSeconds % 60).toString().padStart(2, "0")}`
      : ""

  useEffect(() => {
    if (!isRunning || remainingSeconds === null) return

    if (remainingSeconds <= 0) {
      setIsRunning(false)
      onTimeUp?.()
      return
    }

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === null || prev <= 0) return prev
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, remainingSeconds, onTimeUp])

  const startTimer = useCallback(() => {
    if (remainingSeconds !== null && remainingSeconds > 0) {
      setIsRunning(true)
    }
  }, [remainingSeconds])

  const pauseTimer = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resetTimer = useCallback(() => {
    setRemainingSeconds(initialSeconds)
    setIsRunning(false)
  }, [initialSeconds])

  return {
    remainingSeconds,
    isRunning,
    isLowTime,
    formattedTime,
    startTimer,
    pauseTimer,
    resetTimer,
  }
}
