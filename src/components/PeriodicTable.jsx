import { useState } from 'react'

// Simple periodic table reference. Embedded as a clean static SVG-style grid
// so players don't need internet. Only key info: symbol, atomic number, mass.
// First 20 elements + key reference elements for the puzzles in this game.

const ELEMENTS = [
  { z: 1, sym: 'H', mass: 1.0, group: 1, period: 1 },
  { z: 2, sym: 'He', mass: 4.0, group: 18, period: 1 },
  { z: 3, sym: 'Li', mass: 6.9, group: 1, period: 2 },
  { z: 4, sym: 'Be', mass: 9.0, group: 2, period: 2 },
  { z: 5, sym: 'B', mass: 10.8, group: 13, period: 2 },
  { z: 6, sym: 'C', mass: 12.0, group: 14, period: 2 },
  { z: 7, sym: 'N', mass: 14.0, group: 15, period: 2 },
  { z: 8, sym: 'O', mass: 16.0, group: 16, period: 2 },
  { z: 9, sym: 'F', mass: 19.0, group: 17, period: 2 },
  { z: 10, sym: 'Ne', mass: 20.2, group: 18, period: 2 },
  { z: 11, sym: 'Na', mass: 23.0, group: 1, period: 3 },
  { z: 12, sym: 'Mg', mass: 24.3, group: 2, period: 3 },
  { z: 13, sym: 'Al', mass: 27.0, group: 13, period: 3 },
  { z: 14, sym: 'Si', mass: 28.1, group: 14, period: 3 },
  { z: 15, sym: 'P', mass: 31.0, group: 15, period: 3 },
  { z: 16, sym: 'S', mass: 32.1, group: 16, period: 3 },
  { z: 17, sym: 'Cl', mass: 35.5, group: 17, period: 3 },
  { z: 18, sym: 'Ar', mass: 39.9, group: 18, period: 3 },
  { z: 19, sym: 'K', mass: 39.1, group: 1, period: 4 },
  { z: 20, sym: 'Ca', mass: 40.1, group: 2, period: 4 },
]

export default function PeriodicTable() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 font-mono text-xs uppercase tracking-widest px-4 py-2 bg-loyola-blue border border-loyola-gold/40 text-loyola-gold hover:bg-loyola-blue-dark hover:border-loyola-gold transition-all rounded-sm shadow-lg"
      >
        ⚛ Periodic Table
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-loyola-blue-deep border-2 border-loyola-gold rounded-sm max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-loyola-gold/30 sticky top-0 bg-loyola-blue-deep">
              <h2 className="font-display text-lg text-loyola-gold uppercase tracking-widest">
                Periodic Reference
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="font-mono text-loyola-gold hover:text-loyola-paper text-xl px-3"
              >
                ✕
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-1 text-[10px] sm:text-xs">
                {ELEMENTS.map((el) => (
                  <div
                    key={el.z}
                    style={{ gridColumn: el.group, gridRow: el.period }}
                    className="bg-loyola-blue/40 border border-loyola-gold/30 p-1 sm:p-2 text-center hover:bg-loyola-gold/20 hover:border-loyola-gold transition-colors aspect-square flex flex-col justify-center"
                  >
                    <div className="text-loyola-gold/60 text-[8px] sm:text-[10px] font-mono">
                      {el.z}
                    </div>
                    <div className="text-loyola-gold font-mono font-bold text-sm sm:text-base">
                      {el.sym}
                    </div>
                    <div className="text-loyola-paper/60 text-[7px] sm:text-[9px] font-mono">
                      {el.mass}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-loyola-paper/60 font-mono">
                Showing periods 1–4. Atomic mass below symbol. Group numbers (1–18) read left to right.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
