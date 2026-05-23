import Button from '../components/Button'
import { formatTime } from '../hooks/useTimer'
import { GAME_CONFIG } from '../data/rooms'

// Final score formula:
// - Finished under 20:00: score = 1200 - secondsElapsed (higher = better)
//   displayed as "time used"
// - Overtime: score = (1200 - secondsElapsed) but each overtime second counts 2x
//
// Simpler display: show TIME USED. Lower time = better.
// If overtime, show the "effective time" with 2x penalty applied.

export default function VaultScreen({ teamName, secondsLeft, onPlayAgain }) {
  const wasOvertime = secondsLeft < 0
  const overtimeSeconds = wasOvertime ? Math.abs(secondsLeft) : 0
  const baseTimeUsed = GAME_CONFIG.totalTimeSeconds - secondsLeft // negative-safe
  // If overtime, the overtime portion is doubled
  const effectiveTime = wasOvertime
    ? GAME_CONFIG.totalTimeSeconds + overtimeSeconds * GAME_CONFIG.overtimePenaltyMultiplier
    : baseTimeUsed

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
          <div className="border-2 border-loyola-gold bg-loyola-blue-deep/80 rounded-sm p-6 mb-6 animate-pulse-glow">
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
                  Overtime: {formatTime(overtimeSeconds)} × 2 ={' '}
                  {formatTime(overtimeSeconds * 2)}
                </div>
                <div className="text-loyola-gold pt-1 border-t border-loyola-gold/20">
                  Lower is better — beat your classmates
                </div>
              </div>
            ) : (
              <div className="text-xs text-loyola-paper/70 font-mono">
                <div>Time remaining when vault unlocked: {formatTime(secondsLeft)}</div>
                <div className="text-loyola-gold pt-2">
                  Nice run — share with your team!
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button onClick={onPlayAgain} className="text-base">
              ↻ Play Again
            </Button>
            <p className="text-xs text-loyola-paper/50 font-mono pt-2">
              Project by Loyola Blakefield · Chemistry 10
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
