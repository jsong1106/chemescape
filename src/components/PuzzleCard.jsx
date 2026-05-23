import { useState } from 'react'

// Single puzzle terminal. Player enters a single digit (0-9).
// When correct, locks the input and reveals the digit in the room's code.
// Hint toggle is always available; solution shown only after correct or on reveal.
export default function PuzzleCard({ puzzle, index, isLocked, onSolve }) {
  const [value, setValue] = useState('')
  const [feedback, setFeedback] = useState(null) // 'wrong' | null
  const [showHint, setShowHint] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLocked || value === '') return
    const num = parseInt(value, 10)
    if (num === puzzle.answer) {
      onSolve(index)
      setFeedback(null)
    } else {
      setFeedback('wrong')
      setTimeout(() => setFeedback(null), 600)
    }
  }

  return (
    <div
      className={`relative border-2 rounded-sm transition-all ${
        isLocked
          ? 'border-loyola-gold bg-loyola-gold/5'
          : 'border-loyola-blue/40 bg-loyola-blue-deep/40 hover:border-loyola-blue'
      } ${feedback === 'wrong' ? 'animate-shake border-red-500' : ''}`}
    >
      {/* Header strip */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-loyola-gold/20 bg-black/20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-loyola-gold/70">PUZZLE {puzzle.id}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 bg-loyola-blue/40 text-loyola-paper/70 rounded-sm">
            {puzzle.type}
          </span>
        </div>
        {isLocked && (
          <span className="font-mono text-xs text-loyola-gold">✓ SOLVED</span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <p className="text-loyola-paper text-sm leading-relaxed">{puzzle.prompt}</p>

        {showHint && !isLocked && (
          <div className="text-xs text-loyola-gold/80 border-l-2 border-loyola-gold/40 pl-3 py-1 animate-fade-in">
            <span className="font-mono uppercase tracking-widest text-loyola-gold/60">
              Hint:{' '}
            </span>
            {puzzle.hint}
          </div>
        )}

        {isLocked && (
          <div className="text-xs text-loyola-paper/70 border-l-2 border-loyola-gold/40 pl-3 py-1 animate-fade-in">
            <span className="font-mono uppercase tracking-widest text-loyola-gold/60">
              Solution:{' '}
            </span>
            {puzzle.solution}
          </div>
        )}

        {/* Answer input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
          <span className="font-mono text-loyola-gold text-sm">{'>'}</span>
          <input
            type="number"
            min="0"
            max="9"
            value={isLocked ? puzzle.answer : value}
            onChange={(e) => {
              const v = e.target.value.slice(-1) // keep last digit only
              setValue(v)
            }}
            disabled={isLocked}
            placeholder="_"
            className="bg-transparent border-b-2 border-loyola-gold/40 focus:border-loyola-gold outline-none w-12 text-center font-mono text-xl text-loyola-gold disabled:opacity-100"
          />
          {!isLocked && (
            <>
              <button
                type="submit"
                className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 bg-loyola-gold/10 hover:bg-loyola-gold/20 text-loyola-gold border border-loyola-gold/40 rounded-sm"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowHint((s) => !s)}
                className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 text-loyola-paper/60 hover:text-loyola-gold"
              >
                {showHint ? 'Hide Hint' : 'Hint'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
