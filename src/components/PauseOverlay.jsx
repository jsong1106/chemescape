// Full-screen overlay shown when player manually pauses mid-room.
// Prevents reading puzzles while the timer is stopped — keeps the game fair.
export default function PauseOverlay({ onResume }) {
  return (
    <div className="fixed inset-0 z-40 bg-loyola-blue-deep/95 backdrop-blur-md flex items-center justify-center animate-fade-in">
      <div className="text-center px-4">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-loyola-gold/70 mb-3">
          :: System Paused ::
        </div>
        <div className="text-7xl mb-6 text-loyola-gold text-glow-gold">⏸</div>
        <h2 className="font-display text-3xl font-bold text-loyola-gold text-glow-gold mb-2">
          Game Paused
        </h2>
        <p className="text-sm text-loyola-paper/70 mb-8 max-w-sm">
          Timer is frozen. Puzzles are hidden to keep the game fair.
        </p>
        <button
          onClick={onResume}
          className="font-mono uppercase tracking-widest text-sm font-bold px-10 py-4 bg-loyola-gold text-loyola-blue-deep hover:bg-loyola-gold-dark active:translate-y-0.5 transition-all rounded-sm"
        >
          ▶ Resume Game
        </button>
      </div>
    </div>
  )
}
