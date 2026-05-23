import Button from '../components/Button'
import { formatTime } from '../hooks/useTimer'

export default function TransitionScreen({
  completedRoom,
  nextRoom,
  secondsLeft,
  onContinue,
}) {
  const isFinalRoom = !nextRoom

  return (
    <div className="min-h-screen flex items-center justify-center p-4 grid-bg">
      <div className="max-w-xl w-full text-center">
        {/* Unlock confirmation */}
        <div className="mb-6 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-loyola-gold/20 border border-loyola-gold/40 rounded-sm mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-loyola-gold">
              ✓ Room {completedRoom.id} Cleared
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-loyola-gold text-glow-gold mb-2">
            Door Unlocked
          </h1>
          <p className="text-loyola-paper/70 text-sm">
            You escaped <span className="text-loyola-gold">{completedRoom.name}</span>.
          </p>
        </div>

        {/* Timer status */}
        <div className="border-2 border-loyola-blue/40 bg-loyola-blue-deep/60 rounded-sm p-6 mb-6">
          <div className="font-mono text-xs uppercase tracking-widest text-loyola-gold/70 mb-2">
            ⏸ Timer Paused
          </div>
          <div className="font-mono text-4xl text-loyola-gold text-glow-gold tabular-nums mb-2">
            {formatTime(secondsLeft)}
          </div>
          <div className="text-xs text-loyola-paper/60">
            {secondsLeft < 0
              ? 'Overtime — every second counts double against your score'
              : 'Time remaining'}
          </div>
        </div>

        {/* Next room preview or vault */}
        {isFinalRoom ? (
          <div className="space-y-4 animate-fade-in">
            <p className="text-loyola-paper/80">
              You've cleared all four rooms. The Exam Vault is ahead.
            </p>
            <Button onClick={onContinue} className="text-base px-10 py-4">
              ⚡ Enter the Exam Vault ⚡
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="border-l-2 border-loyola-gold/40 pl-4 py-2 text-left">
              <div className="font-mono text-xs uppercase tracking-widest text-loyola-gold/60 mb-1">
                Next Up · Room {nextRoom.id} / 4
              </div>
              <div className="font-display text-xl text-loyola-gold mb-1">{nextRoom.name}</div>
              <div className="font-mono text-xs text-loyola-paper/60 mb-2">
                {nextRoom.difficulty} · {nextRoom.chapters}
              </div>
              <p className="text-sm text-loyola-paper/80 italic">{nextRoom.subtitle}</p>
            </div>
            <Button onClick={onContinue} className="text-base px-10 py-4">
              ▶ Enter Room {nextRoom.id}
            </Button>
            <p className="text-xs text-loyola-paper/50 font-mono">
              Timer resumes when you click.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
