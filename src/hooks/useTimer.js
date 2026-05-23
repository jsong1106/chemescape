import { useEffect, useRef, useState, useCallback } from 'react'

// Global countdown timer with pause support and overtime tracking.
// - secondsLeft can go negative (overtime); UI displays accordingly.
// - Persists to localStorage so refresh doesn't reset progress.
export function useTimer(initialSeconds, storageKey = 'chemescape-timer') {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved !== null) {
      const parsed = parseInt(saved, 10)
      if (!isNaN(parsed)) return parsed
    }
    return initialSeconds
  })
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!isRunning) return
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1
        localStorage.setItem(storageKey, String(next))
        return next
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [isRunning, storageKey])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])
  const reset = useCallback(() => {
    setIsRunning(false)
    setSecondsLeft(initialSeconds)
    localStorage.removeItem(storageKey)
  }, [initialSeconds, storageKey])

  return { secondsLeft, isRunning, start, pause, reset, isOvertime: secondsLeft < 0 }
}

// Format seconds as MM:SS (handles negative overtime by prefixing "+")
export function formatTime(seconds) {
  const sign = seconds < 0 ? '+' : ''
  const abs = Math.abs(seconds)
  const m = Math.floor(abs / 60)
  const s = abs % 60
  return `${sign}${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
