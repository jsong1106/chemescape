import { useState, useCallback, useEffect } from 'react'

// Persisted game state. Stores team name, current room index, and which
// screen we're on (intro | room | transition | vault).
// Refreshing the page resumes where you left off.

const STORAGE_KEY = 'chemescape-state'

const defaultState = {
  teamName: '',
  currentRoomIndex: 0, // 0-3 for 4 rooms
  screen: 'intro', // intro | room | transition | vault
  finalScoreSeconds: null, // set when vault reached
  wasOvertime: false,
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

export function useGameState() {
  const [state, setState] = useState(loadState)

  // Persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const update = useCallback((patch) => {
    setState((prev) => ({ ...prev, ...patch }))
  }, [])

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('chemescape-timer')
    setState(defaultState)
  }, [])

  return { state, update, reset }
}
