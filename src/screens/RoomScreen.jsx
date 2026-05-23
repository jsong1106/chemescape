import { useState, useMemo } from 'react'
import PuzzleCard from '../components/PuzzleCard'
import CodePanel from '../components/CodePanel'

export default function RoomScreen({ room, onUnlock }) {
  // Track which puzzles are solved (by index)
  const [solvedIndexes, setSolvedIndexes] = useState(() => new Set())

  const handleSolve = (index) => {
    setSolvedIndexes((prev) => {
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }

  const allSolved = solvedIndexes.size === room.puzzles.length

  // Show partial code preview as puzzles get solved
  const codePreview = useMemo(
    () =>
      room.puzzles
        .map((p, i) => (solvedIndexes.has(i) ? String(p.answer) : '_'))
        .join(' '),
    [room.puzzles, solvedIndexes]
  )

  const difficultyColors = {
    EASY: 'text-green-400 border-green-400/40',
    MEDIUM: 'text-loyola-gold border-loyola-gold/40',
    HARD: 'text-orange-400 border-orange-400/40',
    'EXTRA HARD': 'text-red-400 border-red-400/40',
  }

  return (
    <div className="min-h-screen pt-16 pb-24 px-4 grid-bg">
      <div className="max-w-3xl mx-auto">
        {/* Room header */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs uppercase tracking-widest text-loyola-gold/70">
              Room {room.id} / 4
            </span>
            <span
              className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 border rounded-sm ${
                difficultyColors[room.difficulty]
              }`}
            >
              {room.difficulty}
            </span>
            <span className="font-mono text-xs text-loyola-paper/50">{room.chapters}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-loyola-gold text-glow-gold mb-1">
            {room.name}
          </h1>
          <p className="text-sm text-loyola-paper/70 italic">{room.subtitle}</p>
        </div>

        {/* Room description / story */}
        <div className="border-l-2 border-loyola-gold/40 pl-4 py-2 mb-6 text-sm text-loyola-paper/80 italic animate-fade-in">
          {room.description}
        </div>

        {/* Code preview strip */}
        <div className="mb-6 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-loyola-gold/60 mb-2">
            Code Progress
          </div>
          <div className="inline-block px-6 py-2 bg-loyola-blue-deep/60 border border-loyola-gold/30 rounded-sm">
            <span className="font-mono text-2xl text-loyola-gold tracking-[0.4em] tabular-nums">
              {codePreview}
            </span>
          </div>
          <div className="font-mono text-xs text-loyola-paper/50 mt-2">
            {solvedIndexes.size} / {room.puzzles.length} puzzles solved
          </div>
        </div>

        {/* Puzzles */}
        <div className="space-y-3 mb-8">
          {room.puzzles.map((puzzle, i) => (
            <PuzzleCard
              key={puzzle.id}
              puzzle={puzzle}
              index={i}
              isLocked={solvedIndexes.has(i)}
              onSolve={handleSolve}
            />
          ))}
        </div>

        {/* Code panel */}
        <CodePanel
          expectedCode={room.code}
          onUnlock={onUnlock}
          allSolved={allSolved}
        />
      </div>
    </div>
  )
}
