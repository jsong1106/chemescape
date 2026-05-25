// Seeded pseudo-random number generator.
// Same seed → same sequence, every time. This is what makes Game IDs reproducible:
// two teams entering ID 7382 see the exact same puzzles in the same order.
//
// Algorithm: Mulberry32. Tiny, fast, good distribution for our needs (not crypto).
//
// Game IDs are 4-digit (1000–9999) for readability. Seed is just the ID number.

const MIN_ID = 1000
const MAX_ID = 9999

export function generateGameId() {
  return Math.floor(Math.random() * (MAX_ID - MIN_ID + 1)) + MIN_ID
}

export function isValidGameId(id) {
  const n = Number(id)
  return Number.isInteger(n) && n >= MIN_ID && n <= MAX_ID
}

// Mulberry32 PRNG. Returns a function that yields [0, 1) on each call.
function makeRng(seed) {
  let a = seed | 0
  return function () {
    a = (a + 0x6d2b79f5) | 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Pick one puzzle from each slot using the seed.
// Returns an array of 5 puzzles in slot order (so unlock code = answers concatenated).
export function pickPuzzlesForRoom(room, seed, roomIndex) {
  // Mix room index into seed so each room gets different picks from the same Game ID.
  const rng = makeRng((seed * 1000003) ^ (roomIndex * 7919))
  return room.slots.map((slot) => {
    const idx = Math.floor(rng() * slot.length)
    return slot[idx]
  })
}

// Build the full game's puzzles for all rooms given a Game ID.
export function buildGameFromSeed(rooms, gameId) {
  return rooms.map((room, i) => {
    const puzzles = pickPuzzlesForRoom(room, gameId, i)
    const code = puzzles.map((p) => p.answer).join('')
    return { ...room, puzzles, code }
  })
}
