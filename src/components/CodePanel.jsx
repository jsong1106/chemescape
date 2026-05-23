import { useState, useRef, useEffect } from 'react'

// 5-digit code entry. Auto-advances between fields. Validates on submit.
// Shows shake animation on wrong code.
export default function CodePanel({ expectedCode, onUnlock, allSolved }) {
  const [digits, setDigits] = useState(['', '', '', '', ''])
  const [feedback, setFeedback] = useState(null) // 'wrong' | null
  const inputsRef = useRef([])

  // Focus first input when all puzzles solved
  useEffect(() => {
    if (allSolved && inputsRef.current[0]) {
      inputsRef.current[0].focus()
    }
  }, [allSolved])

  const handleChange = (i, v) => {
    const digit = v.replace(/[^0-9]/g, '').slice(-1)
    const next = [...digits]
    next[i] = digit
    setDigits(next)
    if (digit && i < 4) inputsRef.current[i + 1]?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const entered = digits.join('')
    if (entered === expectedCode) {
      onUnlock()
    } else {
      setFeedback('wrong')
      setTimeout(() => setFeedback(null), 600)
    }
  }

  return (
    <div
      className={`border-2 rounded-sm p-6 bg-black/30 transition-all ${
        allSolved
          ? 'border-loyola-gold animate-pulse-glow'
          : 'border-loyola-blue/30 opacity-50'
      } ${feedback === 'wrong' ? 'animate-shake border-red-500' : ''}`}
    >
      <div className="text-center mb-4">
        <div className="font-mono text-xs uppercase tracking-widest text-loyola-gold/70 mb-1">
          {allSolved ? '⚡ Door Access Panel ⚡' : 'Door Access Panel — Locked'}
        </div>
        <div className="text-xs text-loyola-paper/60">
          {allSolved
            ? 'Enter the 5-digit code from your puzzle answers'
            : 'Solve all 5 puzzles to enable code entry'}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="flex gap-2 sm:gap-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="number"
              min="0"
              max="9"
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              disabled={!allSolved}
              className="w-12 h-16 sm:w-14 sm:h-20 text-center text-3xl sm:text-4xl font-mono font-bold bg-loyola-blue-deep border-2 border-loyola-gold/40 focus:border-loyola-gold text-loyola-gold rounded-sm outline-none disabled:opacity-40"
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={!allSolved || digits.some((d) => d === '')}
          className="font-mono uppercase tracking-widest text-sm font-bold px-8 py-3 bg-loyola-gold text-loyola-blue-deep hover:bg-loyola-gold-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          → Unlock Door
        </button>
      </form>
    </div>
  )
}
