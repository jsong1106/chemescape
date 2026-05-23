# ChemEscape: The Central Lab

Chemistry final exam review escape room game for Loyola Blakefield Chemistry 10.

Players work through 4 difficulty-tiered "rooms" covering all 9 textbook chapters in ~20 minutes. Each room contains 5 puzzles whose single-digit answers concatenate into a 5-digit unlock code.

## Tech Stack

- **React 18** + **Vite** (fast dev, no config drama)
- **Tailwind CSS** (theme tokens for Loyola blue/gold)
- **Frontend only** — no backend, no database. State persists in `localStorage`.
- **Deployed on Vercel** as a static SPA.

## Local Development

Prereqs: Node.js 18+ ([install here](https://nodejs.org)).

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build for Production

```bash
npm run build
npm run preview   # preview the built site locally
```

Output goes to `dist/`.

## Project Structure

```
src/
├── App.jsx                 # Top-level state machine (intro → room → transition → vault)
├── main.jsx                # React entry point
├── index.css               # Tailwind + CRT scanline + custom utilities
├── data/
│   └── rooms.js            # All puzzles, codes, room metadata (edit here)
├── hooks/
│   ├── useTimer.js         # 20:00 countdown with pause + overtime
│   └── useGameState.js     # Team name, current room, screen, persisted to localStorage
├── components/
│   ├── TimerBar.jsx        # Fixed-top timer display
│   ├── Button.jsx          # Reusable terminal-style button
│   ├── PuzzleCard.jsx      # Single puzzle terminal with answer input + hint
│   ├── CodePanel.jsx       # 5-digit code entry pad
│   └── PeriodicTable.jsx   # Modal reference (periods 1-4)
└── screens/
    ├── IntroScreen.jsx     # Team name + rules
    ├── RoomScreen.jsx      # 5 puzzles + code panel
    ├── TransitionScreen.jsx # Between rooms (timer paused)
    └── VaultScreen.jsx     # Final score
```

## Editing Puzzles

All game content lives in `src/data/rooms.js`. Each puzzle has:
- `id`, `type` (Recall/Application/Calculation), `prompt`, `hint`, `solution`, `answer` (single digit 0-9)

The file includes a runtime assertion: if the stored room `code` doesn't match the concatenated puzzle answers, the app throws on load. Catches typos immediately.

## Theme Tokens

Loyola colors are centralized in `tailwind.config.js`:
- `loyola-blue` `#0033A0` (dominant)
- `loyola-blue-dark` `#001A5C`
- `loyola-blue-deep` `#000D33` (page background)
- `loyola-gold` `#FFC72C` (accent)
- `loyola-gold-dark` `#E5A800`
- `loyola-paper` `#F8F6EF` (off-white body text)

## Deploying to Vercel

See `DEPLOY.md` in this folder for the step-by-step.

## Game Rules

1. Play solo or in teams of 2–5.
2. One 20-minute timer runs the game. Pauses between rooms.
3. Each room has 5 puzzles. Solve them to get a 5-digit unlock code. Each puzzle's answer becomes one digit of the code, in order.
4. Enter the code on the door panel. Correct → next room. Wrong → try again, no penalty.
5. If the timer hits 0:00, keep playing — but every overtime second = 2 seconds against your final score.
6. Final score = effective time. Lower = better.
7. Periodic table provided in-game.
