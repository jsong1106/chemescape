import { useState } from 'react'
import Button from '../components/Button'
import { generateGameId, isValidGameId } from '../lib/random'

// Two start modes:
//   - Random: generate a fresh Game ID
//   - Enter ID: type a shared ID (for team-vs-team head-to-head play)
//
// Game ID is mandatory either way — it seeds the puzzle picks.

export default function IntroScreen({ onBegin }) {
  const [teamName, setTeamName] = useState('')
  const [showRules, setShowRules] = useState(false)
  const [mode, setMode] = useState('random') // 'random' | 'enter'
  const [enteredId, setEnteredId] = useState('')
  const [randomId, setRandomId] = useState(() => generateGameId())

  const canBegin =
    teamName.trim().length > 0 &&
    (mode === 'random' || isValidGameId(enteredId))

  const handleBegin = () => {
    const gameId = mode === 'random' ? randomId : parseInt(enteredId, 10)
    onBegin(teamName.trim(), gameId)
  }

  const handleRerollId = () => setRandomId(generateGameId())

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-loyola-gold/70 mb-2">
            Loyola Blakefield · Chemistry 10
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-loyola-gold text-glow-gold leading-none">
            ChemEscape
          </h1>
          <div className="mt-2 font-mono text-sm sm:text-base text-loyola-paper/80 tracking-widest uppercase">
            :: The Central Lab ::
          </div>
        </div>

        {/* Briefing */}
        <div className="border-2 border-loyola-gold/40 bg-loyola-blue-deep/60 rounded-sm p-6 mb-6 animate-fade-in">
          <div className="font-mono text-xs uppercase tracking-widest text-loyola-gold mb-3">
            ▸ Mission Briefing
          </div>
          <p className="text-loyola-paper/90 text-sm leading-relaxed mb-2">
            You and your team are locked inside Loyola's chemistry research lab. Four rooms separate you from the exit.
          </p>
          <p className="text-loyola-paper/90 text-sm leading-relaxed">
            Each room runs a puzzle terminal that only releases the door code when you solve every question. You have{' '}
            <span className="text-loyola-gold font-bold">20 minutes</span>. Move fast.
          </p>
        </div>

        {/* Rules */}
        <div className="border-2 border-loyola-blue/40 bg-loyola-blue-deep/40 rounded-sm mb-6">
          <button
            onClick={() => setShowRules((s) => !s)}
            className="w-full flex items-center justify-between p-4 font-mono text-sm uppercase tracking-widest text-loyola-gold hover:bg-loyola-blue/20"
          >
            <span>▸ How To Play</span>
            <span>{showRules ? '−' : '+'}</span>
          </button>
          {showRules && (
            <div className="px-4 pb-4 space-y-2 text-sm text-loyola-paper/80 animate-fade-in">
              <p>
                <span className="text-loyola-gold font-mono">1.</span> Play solo or in teams of 2–5.
              </p>
              <p>
                <span className="text-loyola-gold font-mono">2.</span> One 20:00 timer runs the entire game. It pauses automatically between rooms, and you can hit the ⏸ button in the top bar to pause anytime (puzzles hide while paused — keeps it fair).
              </p>
              <p>
                <span className="text-loyola-gold font-mono">3.</span>{' '}
                <span className="text-loyola-gold font-bold">Game ID & Team Play:</span> Every game has a 4-digit Game ID shown when you start. Each unique ID produces a different set of puzzles. To play head-to-head against another team, agree on a Game ID first — everyone enters the same number, gets identical puzzles and codes, fair competition. Random plays (no shared ID) are perfect for solo studying.
              </p>
              <p>
                <span className="text-loyola-gold font-mono">4.</span> Each room has 5 puzzles. Solve them to get a 5-digit unlock code. Each puzzle's answer is one digit of the code, in order.{' '}
                <em className="text-loyola-paper/60">Example: if puzzle 1's answer is 3, the first digit of the code is 3. If puzzle 3's answer is 7, the third digit is 7.</em>
              </p>
              <p>
                <span className="text-loyola-gold font-mono">5.</span> Enter the code on the door panel. Correct → next room. Wrong → try again, no penalty.
              </p>
              <p>
                <span className="text-loyola-gold font-mono">6.</span> If the timer hits 0:00, keep playing — but every second of overtime counts as <span className="text-red-400 font-bold">2 seconds</span> against your final score. Your run is flagged "Over Time."
              </p>
              <p>
                <span className="text-loyola-gold font-mono">7.</span> Final score = effective time. Lower = better.
              </p>
              <p>
                <span className="text-loyola-gold font-mono">8.</span> Periodic table provided in-game (bottom-right). No outside notes.
              </p>
              <p>
                <span className="text-loyola-gold font-mono">9.</span> Need to bail out? Use the ✕ Exit button in the top bar anytime — it returns you to the home screen with no score recorded.
              </p>
            </div>
          )}
        </div>

        {/* Team name */}
        <div className="mb-4">
          <label className="block font-mono text-xs uppercase tracking-widest text-loyola-gold/70 mb-2">
            ▸ Team Name
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g., The Mole People"
            maxLength={30}
            className="w-full px-4 py-3 bg-loyola-blue-deep border-2 border-loyola-gold/40 focus:border-loyola-gold outline-none font-mono text-loyola-paper rounded-sm"
          />
        </div>

        {/* Game ID mode selector */}
        <div className="mb-6">
          <div className="block font-mono text-xs uppercase tracking-widest text-loyola-gold/70 mb-2">
            ▸ Game ID
          </div>

          {/* Mode tabs */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setMode('random')}
              className={`flex-1 py-2 font-mono text-xs uppercase tracking-widest border-2 rounded-sm transition-colors ${
                mode === 'random'
                  ? 'border-loyola-gold bg-loyola-gold/10 text-loyola-gold'
                  : 'border-loyola-blue/40 text-loyola-paper/60 hover:border-loyola-blue'
              }`}
            >
              🎲 Random Game
            </button>
            <button
              onClick={() => setMode('enter')}
              className={`flex-1 py-2 font-mono text-xs uppercase tracking-widest border-2 rounded-sm transition-colors ${
                mode === 'enter'
                  ? 'border-loyola-gold bg-loyola-gold/10 text-loyola-gold'
                  : 'border-loyola-blue/40 text-loyola-paper/60 hover:border-loyola-blue'
              }`}
            >
              🔢 Enter Game ID
            </button>
          </div>

          {/* Mode panel */}
          {mode === 'random' ? (
            <div className="border-2 border-loyola-gold/30 bg-loyola-blue-deep/40 rounded-sm p-4 flex items-center justify-between">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-loyola-gold/70 mb-1">
                  Your Game ID
                </div>
                <div className="font-mono text-3xl text-loyola-gold tabular-nums tracking-widest">
                  #{randomId}
                </div>
                <div className="text-xs text-loyola-paper/60 mt-1">
                  Share this ID for teams to play the same puzzles
                </div>
              </div>
              <button
                onClick={handleRerollId}
                className="font-mono text-xs uppercase tracking-widest px-3 py-2 bg-loyola-gold/10 hover:bg-loyola-gold/20 text-loyola-gold border border-loyola-gold/40 rounded-sm"
              >
                🎲 Re-roll
              </button>
            </div>
          ) : (
            <div className="border-2 border-loyola-gold/30 bg-loyola-blue-deep/40 rounded-sm p-4">
              <label className="block font-mono text-xs uppercase tracking-widest text-loyola-gold/70 mb-2">
                Enter shared Game ID (1000–9999)
              </label>
              <input
                type="number"
                value={enteredId}
                onChange={(e) => setEnteredId(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                placeholder="e.g., 7382"
                className="w-full px-4 py-3 bg-loyola-blue-deep border-2 border-loyola-gold/40 focus:border-loyola-gold outline-none font-mono text-2xl text-loyola-gold rounded-sm tracking-widest"
              />
              {enteredId && !isValidGameId(enteredId) && (
                <div className="text-xs text-red-400 mt-2 font-mono">
                  Game ID must be 4 digits (1000–9999)
                </div>
              )}
            </div>
          )}
        </div>

        {/* Begin */}
        <div className="flex justify-center pt-2">
          <Button
            onClick={handleBegin}
            disabled={!canBegin}
            className="text-base px-10 py-4"
          >
            ⚡ Begin Escape ⚡
          </Button>
        </div>
      </div>
    </div>
  )
}
