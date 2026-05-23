import { useEffect, useState } from 'react'
import { ROOMS, GAME_CONFIG } from './data/rooms'
import { useGameState } from './hooks/useGameState'
import { useTimer } from './hooks/useTimer'
import TimerBar from './components/TimerBar'
import PauseOverlay from './components/PauseOverlay'
import PeriodicTable from './components/PeriodicTable'
import IntroScreen from './screens/IntroScreen'
import RoomScreen from './screens/RoomScreen'
import TransitionScreen from './screens/TransitionScreen'
import VaultScreen from './screens/VaultScreen'

// Top-level state machine:
//   intro → room → transition → room → ... → vault
//
// Timer rules:
//   - Auto-pauses between rooms (transition screen)
//   - Player can also manually pause mid-room via the timer bar button
//   - Manual pause shows a full-screen overlay to prevent puzzle peeking

export default function App() {
  const { state, update, reset } = useGameState()
  const timer = useTimer(GAME_CONFIG.totalTimeSeconds)
  const [manuallyPaused, setManuallyPaused] = useState(false)

  // Auto-pause when not on the room screen.
  // When on room screen, run unless manually paused.
  useEffect(() => {
    if (state.screen === 'room' && !manuallyPaused) {
      timer.start()
    } else {
      timer.pause()
    }
  }, [state.screen, manuallyPaused]) // eslint-disable-line react-hooks/exhaustive-deps

  const currentRoom = ROOMS[state.currentRoomIndex]
  const nextRoom = ROOMS[state.currentRoomIndex + 1]

  // --- Transitions ---

  const handleBegin = (teamName) => {
    update({ teamName, screen: 'room', currentRoomIndex: 0 })
  }

  const handleRoomUnlock = () => {
    setManuallyPaused(false) // clear any manual pause when leaving room
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

  // --- Render ---

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
        />
      )}

      {state.screen === 'intro' && <IntroScreen onBegin={handleBegin} />}

      {state.screen === 'room' && (
        <RoomScreen room={currentRoom} onUnlock={handleRoomUnlock} />
      )}

      {state.screen === 'transition' && (
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
          secondsLeft={state.finalScoreSeconds ?? timer.secondsLeft}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {/* Manual-pause overlay only on room screen */}
      {state.screen === 'room' && manuallyPaused && (
        <PauseOverlay onResume={() => setManuallyPaused(false)} />
      )}

      {(state.screen === 'room' || state.screen === 'transition') && <PeriodicTable />}
    </>
  )
}
