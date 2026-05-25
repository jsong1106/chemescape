import { useEffect, useState, useMemo } from 'react'
import { ROOMS, GAME_CONFIG } from './data/rooms'
import { buildGameFromSeed } from './lib/random'
import { useGameState } from './hooks/useGameState'
import { useTimer } from './hooks/useTimer'
import TimerBar from './components/TimerBar'
import PauseOverlay from './components/PauseOverlay'
import PeriodicTable from './components/PeriodicTable'
import IntroScreen from './screens/IntroScreen'
import RoomScreen from './screens/RoomScreen'
import TransitionScreen from './screens/TransitionScreen'
import VaultScreen from './screens/VaultScreen'

// Top-level state machine.
// On game start, we use the Game ID to seed a deterministic puzzle pick
// from each room's slot pool. Same ID = same puzzles for every team.

export default function App() {
  const { state, update, reset } = useGameState()
  const timer = useTimer(GAME_CONFIG.totalTimeSeconds)
  const [manuallyPaused, setManuallyPaused] = useState(false)

  // Build the active game (4 rooms with picked puzzles + derived codes)
  // from the current Game ID. Recomputed only when Game ID changes.
  const activeRooms = useMemo(() => {
    if (!state.gameId) return null
    return buildGameFromSeed(ROOMS, state.gameId)
  }, [state.gameId])

  // Auto-pause when not on room screen; respect manual pause too.
  useEffect(() => {
    if (state.screen === 'room' && !manuallyPaused) {
      timer.start()
    } else {
      timer.pause()
    }
  }, [state.screen, manuallyPaused]) // eslint-disable-line react-hooks/exhaustive-deps

  const currentRoom = activeRooms?.[state.currentRoomIndex]
  const nextRoom = activeRooms?.[state.currentRoomIndex + 1]

  const handleBegin = (teamName, gameId) => {
    update({ teamName, gameId, screen: 'room', currentRoomIndex: 0 })
  }

  const handleRoomUnlock = () => {
    setManuallyPaused(false)
    update({ screen: 'transition' })
  }

  const handleContinue = () => {
    if (!nextRoom) {
      timer.pause()
      update({
        screen: 'vault',
        finalScoreSeconds: timer.secondsLeft,
        wasOvertime: timer.secondsLeft < 0,
      })
    } else {
      update({
        currentRoomIndex: state.currentRoomIndex + 1,
        screen: 'room',
      })
    }
  }

  const handlePlayAgain = () => {
    timer.reset()
    setManuallyPaused(false)
    reset()
  }

  const handleTogglePause = () => {
    setManuallyPaused((p) => !p)
  }

  const showTimer = state.screen === 'room' || state.screen === 'transition'
  const isAutoPaused = state.screen === 'transition'

  return (
    <>
      {showTimer && (
        <TimerBar
          secondsLeft={timer.secondsLeft}
          isOvertime={timer.isOvertime}
          isPaused={manuallyPaused || isAutoPaused}
          isAutoPaused={isAutoPaused}
          onTogglePause={state.screen === 'room' ? handleTogglePause : undefined}
          gameId={state.gameId}
        />
      )}

      {state.screen === 'intro' && <IntroScreen onBegin={handleBegin} />}

      {state.screen === 'room' && currentRoom && (
        <RoomScreen room={currentRoom} onUnlock={handleRoomUnlock} />
      )}

      {state.screen === 'transition' && currentRoom && (
        <TransitionScreen
          completedRoom={currentRoom}
          nextRoom={nextRoom}
          secondsLeft={timer.secondsLeft}
          onContinue={handleContinue}
        />
      )}

      {state.screen === 'vault' && (
        <VaultScreen
          teamName={state.teamName}
          gameId={state.gameId}
          secondsLeft={state.finalScoreSeconds ?? timer.secondsLeft}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {state.screen === 'room' && manuallyPaused && (
        <PauseOverlay onResume={() => setManuallyPaused(false)} />
      )}

      {(state.screen === 'room' || state.screen === 'transition') && <PeriodicTable />}
    </>
  )
}
