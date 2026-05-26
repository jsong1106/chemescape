import { formatTime } from '../hooks/useTimer'

// Fixed-position timer bar with Game ID badge, pause toggle, and exit button.
export default function TimerBar({
  secondsLeft,
  isOvertime,
  isPaused,
  isAutoPaused,
  onTogglePause,
  onExit,
  gameId,
}) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-loyola-blue-deep/95 backdrop-blur border-b-2 border-loyola-gold/30">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        {/* Left: status indicator + label + game ID */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-3 h-3 rounded-full shrink-0 ${
              isPaused
                ? 'bg-loyola-gold/50'
                : isOvertime
                ? 'bg-red-500 animate-pulse-glow'
                : 'bg-loyola-gold animate-pulse-glow'
            }`}
          />
          <span className="text-xs uppercase tracking-widest text-loyola-gold/70 font-mono truncate hidden sm:inline">
            {isAutoPaused ? 'Paused · Between Rooms' : isPaused ? 'Paused' : isOvertime ? 'Overtime' : 'Time'}
          </span>
          {gameId && (
            <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 bg-loyola-blue/40 text-loyola-paper/70 border border-loyola-gold/30 rounded-sm">
              ID #{gameId}
            </span>
          )}
        </div>

        {/* Right: timer + pause + exit */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`font-mono text-xl sm:text-2xl font-bold tabular-nums ${
              isOvertime ? 'text-red-400 text-glow-gold' : 'text-loyola-gold text-glow-gold'
            }`}
          >
            {formatTime(secondsLeft)}
          </div>

          {onTogglePause && !isAutoPaused && (
            <button
              onClick={onTogglePause}
              className="font-mono text-xs uppercase tracking-widest px-2 sm:px-3 py-1.5 bg-loyola-gold/10 hover:bg-loyola-gold/20 text-loyola-gold border border-loyola-gold/40 rounded-sm transition-colors"
              aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
            >
              {isPaused ? '▶' : '⏸'}
              <span className="hidden sm:inline ml-1">{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
          )}

          {onExit && (
            <button
              onClick={onExit}
              className="font-mono text-xs uppercase tracking-widest px-2 sm:px-3 py-1.5 bg-transparent hover:bg-red-400/10 text-red-400/80 hover:text-red-400 border border-red-400/30 hover:border-red-400/60 rounded-sm transition-colors"
              aria-label="Exit game"
            >
              ✕<span className="hidden sm:inline ml-1">Exit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
