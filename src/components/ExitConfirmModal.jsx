// Confirmation modal shown when the user clicks the Exit button.
// Hard "Cancel"-first design: the destructive action is on the right
// and visually de-emphasized to prevent fat-finger mistakes.
export default function ExitConfirmModal({ onCancel, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-[60] bg-loyola-blue-deep/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="max-w-sm w-full border-2 border-loyola-gold bg-loyola-blue-deep rounded-sm p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-5xl mb-3">⚠️</div>
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-loyola-gold/70 mb-2">
          :: Exit Game ::
        </div>
        <h2 className="font-display text-2xl font-bold text-loyola-gold text-glow-gold mb-3">
          Are you sure?
        </h2>
        <p className="text-sm text-loyola-paper/80 mb-6">
          All progress in this game will be lost. You'll return to the home screen and your timer will reset.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 font-mono uppercase tracking-widest text-sm font-bold px-6 py-3 bg-loyola-gold text-loyola-blue-deep hover:bg-loyola-gold-dark transition-colors rounded-sm"
          >
            ← Keep Playing
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 font-mono uppercase tracking-widest text-sm px-6 py-3 bg-transparent text-red-400 border-2 border-red-400/40 hover:border-red-400 hover:bg-red-400/10 transition-colors rounded-sm"
          >
            ✕ Exit Anyway
          </button>
        </div>
      </div>
    </div>
  )
}
