import { useState } from 'react'
import Button from '../components/Button'
import { formatTime } from '../hooks/useTimer'
import { GAME_CONFIG } from '../data/rooms'

// Final score screen. Now also shows the Game ID so winners can share it
// for classmates to attempt the same set of puzzles.

export default function VaultScreen({ teamName, gameId, secondsLeft, onPlayAgain }) {
  const [copied, setCopied] = useState(false)
  const wasOvertime = secondsLeft < 0
  const overtimeSeconds = wasOvertime ? Math.abs(secondsLeft) : 0
  const baseTimeUsed = GAME_CONFIG.totalTimeSeconds - secondsLeft
  const effectiveTime = wasOvertime
    ? GAME_CONFIG.totalTimeSeconds + overtimeSeconds * GAME_CONFIG.overtimePenaltyMultiplier
    : baseTimeUsed

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(String(gameId))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: just visual feedback
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 grid-bg">
      <div className="max-w-xl w-full text-center">
        <div className="animate-fade-in">
          <div className="text-6xl mb-4">🎓</div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-loyola-gold/70 mb-2">
            :: Exam Vault Unlocked ::
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-loyola-gold text-glow-gold mb-3">
            You Escaped
          </h1>
          <p className="text-loyola-paper/80 mb-6">
            <span className="text-loyola-gold font-mono">{teamName}</span> · ready for the final exam
          </p>

          {/* Score box */}
          <div className="border-2 border-loyola-gold bg-loyola-blue-deep/80 rounded-sm p-6 mb-4 animate-pulse-glow">
            {wasOvertime && (
              <div className="inline-block mb-3 px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-sm">
                <span className="font-mono text-xs uppercase tracking-widest text-red-400">
                  ⚠ Over Time
                </span>
              </div>
            )}

            <div className="font-mono text-xs uppercase tracking-widest text-loyola-gold/70 mb-2">
              Final Score · Effective Time
            </div>
            <div className="font-mono text-5xl text-loyola-gold text-glow-gold tabular-nums mb-3">
              {formatTime(effectiveTime)}
            </div>

            {wasOvertime ? (
              <div className="text-xs text-loyola-paper/70 space-y-1 font-mono">
                <div>Base time: 20:00</div>
                <div>
                  Overtime: {formatTime(overtimeSeconds)} × 2 = {formatTime(overtimeSeconds * 2)}
                </div>
                <div className="text-loyola-gold pt-1 border-t border-loyola-gold/20">
                  Lower is better — beat your classmates
                </div>
              </div>
            ) : (
              <div className="text-xs text-loyola-paper/70 font-mono">
                <div>Time remaining when vault unlocked: {formatTime(secondsLeft)}</div>
              </div>
            )}
          </div>

          {/* Game ID share */}
          {gameId && (
            <div className="border-2 border-loyola-blue/40 bg-loyola-blue-deep/40 rounded-sm p-4 mb-6">
              <div className="font-mono text-xs uppercase tracking-widest text-loyola-gold/70 mb-2">
                ▸ Share This Game
              </div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="font-mono text-3xl text-loyola-gold tabular-nums tracking-widest">
                  #{gameId}
                </span>
                <button
                  onClick={handleCopyId}
                  className="font-mono text-xs uppercase tracking-widest px-3 py-2 bg-loyola-gold/10 hover:bg-loyola-gold/20 text-loyola-gold border border-loyola-gold/40 rounded-sm"
                >
                  {copied ? '✓ Copied' : '📋 Copy ID'}
                </button>
              </div>
              <div className="text-xs text-loyola-paper/60">
                Send this ID to classmates so they can attempt your exact set and compare times.
              </div>
            </div>
          )}

          <Button onClick={onPlayAgain} className="text-base">
            ↻ Play Again
          </Button>
          <p className="text-xs text-loyola-paper/50 font-mono pt-4">
            Project by Loyola Blakefield · Chemistry 10
          </p>
        </div>
      </div>
    </div>
  )
}
