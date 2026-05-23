import { useState } from 'react'
import Button from '../components/Button'

export default function IntroScreen({ onBegin }) {
  const [teamName, setTeamName] = useState('')
  const [showRules, setShowRules] = useState(false)

  const canBegin = teamName.trim().length > 0

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo / title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-4">
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
        </div>

        {/* Briefing box */}
        <div className="border-2 border-loyola-gold/40 bg-loyola-blue-deep/60 rounded-sm p-6 mb-6 animate-fade-in">
          <div className="font-mono text-xs uppercase tracking-widest text-loyola-gold mb-3">
            ▸ Mission Briefing
          </div>
          <p className="text-loyola-paper/90 text-sm leading-relaxed mb-2">
            You and your team are locked inside Loyola's chemistry research lab. The fire alarm tripped at 7:42 PM and the doors auto-sealed. Standard.
          </p>
          <p className="text-loyola-paper/90 text-sm leading-relaxed">
            Four rooms separate you from the exit. Each room runs a puzzle terminal that only releases the door code when you solve every question. You have <span className="text-loyola-gold font-bold">20 minutes</span>. Move fast.
          </p>
        </div>

        {/* Rules accordion */}
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
                <span className="text-loyola-gold font-mono">3.</span> Each room has 5 puzzles. Solve them to get a 5-digit unlock code. Each puzzle's answer is one digit of the code, in order.{' '}
                <em className="text-loyola-paper/60">Example: if puzzle 1's answer is 3, the first digit of the code is 3. If puzzle 3's answer is 7, the third digit is 7.</em>
              </p>
              <p>
                <span className="text-loyola-gold font-mono">4.</span> Enter the code on the door panel. Correct → next room. Wrong → try again, no penalty.
              </p>
              <p>
                <span className="text-loyola-gold font-mono">5.</span> If the timer hits 0:00, keep playing — but every second of overtime counts as <span className="text-red-400 font-bold">2 seconds</span> against your final score. Your run is flagged "Over Time."
              </p>
              <p>
                <span className="text-loyola-gold font-mono">6.</span> Final score = time remaining when you reach the Exam Vault. Lowest score (most time saved) wins.
              </p>
              <p>
                <span className="text-loyola-gold font-mono">7.</span> Periodic table is provided in-game (bottom-right button). No outside notes.
              </p>
            </div>
          )}
        </div>

        {/* Team name input */}
        <div className="space-y-4">
          <div>
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

          <div className="flex justify-center pt-2">
            <Button
              onClick={() => onBegin(teamName.trim())}
              disabled={!canBegin}
              className="text-base px-10 py-4"
            >
              ⚡ Begin Escape ⚡
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
