import { useState, useCallback, useEffect } from 'react'

// Persisted game state. Refresh restores in-progress games.

const STORAGE_KEY = 'chemescape-state'

const defaultState = {
  teamName: '',
  gameId: null,
  currentRoomIndex: 0,
  screen: 'intro',
  finalScoreSeconds: null,
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
