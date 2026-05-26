import { useEffect, useState, useMemo } from 'react'
import { ROOMS, GAME_CONFIG } from './data/rooms'
import { buildGameFromSeed } from './lib/random'
import { useGameState } from './hooks/useGameState'
import { useTimer } from './hooks/useTimer'
import TimerBar from './components/TimerBar'
import PauseOverlay from './components/PauseOverlay'
import ExitConfirmModal from './components/ExitConfirmModal'
import PeriodicTable from './components/PeriodicTable'
import IntroScreen from './screens/IntroScreen'
import RoomScreen from './screens/RoomScreen'
import TransitionScreen from './screens/TransitionScreen'
import VaultScreen from './screens/VaultScreen'

// Top-level state machine.
// Exit button is available during room and transition screens.
// Confirmation modal prevents accidental quits.

export default function App() {
  const { state, update, reset } = useGameState()
  const timer = useTimer(GAME_CONFIG.totalTimeSeconds)
  const [manuallyPaused, setManuallyPaused] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  // Active puzzles seeded by Game ID
  const activeRooms = useMemo(() => {
    if (!state.gameId) return null
    return buildGameFromSeed(ROOMS, state.gameId)
  }, [state.gameId])

  // Auto-pause when not on room screen; respect manual pause and exit modal
  useEffect(() => {
    if (state.screen === 'room' && !manuallyPaused && !showExitConfirm) {
      timer.start()
    } else {
      timer.pause()
    }
  }, [state.screen, manuallyPaused, showExitConfirm]) // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleRequestExit = () => {
    setShowExitConfirm(true)
  }

  const handleConfirmExit = () => {
    // Same effect as Play Again: full wipe
    timer.reset()
    setManuallyPaused(false)
    setShowExitConfirm(false)
    reset()
  }

  const handleCancelExit = () => {
    setShowExitConfirm(false)
  }

  const showTimer = state.screen === 'room' || state.screen === 'transition'
  const isAutoPaused = state.screen === 'transition'
  const canExit = showTimer

  return (
    <>
      {showTimer && (
        <TimerBar
          secondsLeft={timer.secondsLeft}
          isOvertime={timer.isOvertime}
          isPaused={manuallyPaused || isAutoPaused}
          isAutoPaused={isAutoPaused}
          onTogglePause={state.screen === 'room' ? handleTogglePause : undefined}
          onExit={canExit ? handleRequestExit : undefined}
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

      {/* Overlays */}
      {state.screen === 'room' && manuallyPaused && !showExitConfirm && (
        <PauseOverlay onResume={() => setManuallyPaused(false)} />
      )}

      {showExitConfirm && (
        <ExitConfirmModal onCancel={handleCancelExit} onConfirm={handleConfirmExit} />
      )}

      {(state.screen === 'room' || state.screen === 'transition') && <PeriodicTable />}
    </>
  )
}
