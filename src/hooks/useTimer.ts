import { useState, useEffect, useCallback } from 'react'

interface TimerOptions {
  initialTime?: number // in seconds
  onComplete?: () => void
  autoStart?: boolean
}

export function useTimer({ initialTime = 0, onComplete, autoStart = false }: TimerOptions = {}) {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(autoStart)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            setIsRunning(false)
            if (onComplete) onComplete()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, isPaused, onComplete])

  const start = useCallback(() => {
    setIsRunning(true)
    setIsPaused(false)
  }, [])

  const pause = useCallback(() => {
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    setIsPaused(false)
  }, [])

  const stop = useCallback(() => {
    setIsRunning(false)
    setIsPaused(false)
    setTime(initialTime)
  }, [initialTime])

  const reset = useCallback(() => {
    setTime(initialTime)
  }, [initialTime])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  return {
    time,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    stop,
    reset,
    formattedTime: formatTime(time),
  }
}
