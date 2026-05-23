// Single source of truth for all game content.
// Edit puzzles, codes, or room metadata here — UI reads from this file only.
// Each room's `code` is derived from the puzzle answers in order.

export const GAME_CONFIG = {
  totalTimeSeconds: 20 * 60, // 20:00 countdown
  overtimePenaltyMultiplier: 2, // every overtime second = 2 seconds against score
}

export const ROOMS = [
  {
    id: 1,
    name: 'Lobby of Elements',
    difficulty: 'EASY',
    chapters: 'Chapters 1–2',
    subtitle: 'Foundations: Matter, Energy, Atoms, Ions',
    description:
      'You wake up in the lab supply closet. The door is sealed. Five terminals blink on the wall — solve each to recover the access code.',
    code: '46622',
    puzzles: [
      {
        id: '1.1',
        type: 'Recall',
        prompt: 'How many significant figures are in the measurement 0.004560 g?',
        hint: 'Leading zeros never count. Trailing zeros after a decimal point do count.',
        solution:
          'Leading zeros are not significant. The trailing zero after the decimal is significant. Significant digits: 4, 5, 6, 0 → 4 sig figs.',
        answer: 4,
      },
      {
        id: '1.2',
        type: 'Calculation',
        prompt: 'Express 0.00000500 in scientific notation as 5.00 × 10^(−n). What is n?',
        hint: 'Count how many places you move the decimal to the right to get 5.00.',
        solution: 'Move the decimal 6 places right: 0.00000500 = 5.00 × 10⁻⁶. So n = 6.',
        answer: 6,
      },
      {
        id: '1.3',
        type: 'Application',
        prompt:
          'An atom of phosphorus-31 (³¹P) has 15 protons. How many neutrons does it have? Enter the ones digit.',
        hint: 'Neutrons = mass number − protons.',
        solution: 'Neutrons = 31 − 15 = 16. The ones digit of 16 is 6.',
        answer: 6,
      },
      {
        id: '1.4',
        type: 'Application',
        prompt: 'What is the magnitude of the charge on the calcium ion in CaCl₂?',
        hint: 'Chloride is −1. The compound must be neutral overall.',
        solution:
          'Two Cl⁻ ions contribute a total charge of −2. To balance, Ca must be +2. Magnitude = 2.',
        answer: 2,
      },
      {
        id: '1.5',
        type: 'Application',
        prompt: 'How many oxygen atoms are in one formula unit of Al₂(SO₄)₃? Enter the ones digit.',
        hint: 'The subscript 3 multiplies everything inside the parentheses.',
        solution: '3 sulfate groups × 4 oxygens each = 12 oxygens. The ones digit of 12 is 2.',
        answer: 2,
      },
    ],
  },
  {
    id: 2,
    name: 'Hall of Patterns',
    difficulty: 'MEDIUM',
    chapters: 'Chapters 6–7',
    subtitle: 'Electronic Structure & Periodic Trends',
    description:
      'The door opens into a circular hall lined with glowing periodic tables. Five terminals demand you prove you can predict an element\'s behavior from its position.',
    code: '85311',
    puzzles: [
      {
        id: '2.1',
        type: 'Recall',
        prompt: 'What is the maximum number of electrons that can occupy the n = 2 shell?',
        hint: 'The formula is 2n².',
        solution: '2n² = 2(2)² = 2(4) = 8 electrons.',
        answer: 8,
      },
      {
        id: '2.2',
        type: 'Recall',
        prompt: 'How many orbitals are in a d subshell?',
        hint: 'For a d subshell, ℓ = 2, so mℓ runs from −2 to +2.',
        solution: 'mℓ values: −2, −1, 0, +1, +2 → 5 orbitals.',
        answer: 5,
      },
      {
        id: '2.3',
        type: 'Application',
        prompt: 'What is the principal quantum number n for the valence shell of sodium (Z = 11)?',
        hint: 'Write the electron configuration. The valence shell is the highest n.',
        solution: 'Na: 1s² 2s² 2p⁶ 3s¹. The valence electron is in the n = 3 shell.',
        answer: 3,
      },
      {
        id: '2.4',
        type: 'Application',
        prompt:
          'Which element has the LARGEST atomic radius? Enter the number of your answer: (1) Na, (2) Mg, (3) Al, (4) Si',
        hint: 'Atomic radius decreases as you go left → right across a period.',
        solution:
          'All four are in period 3. Radius decreases left to right. Na is leftmost → largest radius.',
        answer: 1,
      },
      {
        id: '2.5',
        type: 'Application',
        prompt:
          'Which element is the MOST electronegative? Enter the number: (1) F, (2) O, (3) N, (4) C',
        hint: 'Electronegativity increases up and to the right on the periodic table.',
        solution: 'Fluorine has the highest electronegativity on the Pauling scale (3.98).',
        answer: 1,
      },
    ],
  },
  {
    id: 3,
    name: 'The Bond Forge',
    difficulty: 'HARD',
    chapters: 'Chapters 8–9',
    subtitle: 'Chemical Bonding & Molecular Geometry',
    description:
      'Sparks fly from welding stations along the wall. To pass, you must draw molecules in your head — count electrons, predict shapes, and calculate bond energies.',
    code: '41231',
    puzzles: [
      {
        id: '3.1',
        type: 'Recall',
        prompt: 'How many electrons are shared in a double bond?',
        hint: 'A double bond is two pairs of shared electrons.',
        solution: 'Double bond = 2 pairs × 2 electrons per pair = 4 electrons.',
        answer: 4,
      },
      {
        id: '3.2',
        type: 'Application',
        prompt: 'How many lone pairs are on the nitrogen atom in NH₃ (ammonia)?',
        hint: 'N has 5 valence electrons. 3 are shared with H. What\'s left?',
        solution:
          'N has 5 valence electrons. 3 are used in N–H bonds. 5 − 3 = 2 electrons remaining = 1 lone pair.',
        answer: 1,
      },
      {
        id: '3.3',
        type: 'Application',
        prompt:
          'What is the molecular shape of H₂O? Enter the number: (1) Linear, (2) Bent, (3) Trigonal planar, (4) Tetrahedral',
        hint: 'O has 4 electron domains total (2 bonds + 2 lone pairs).',
        solution:
          '4 electron domains, 2 bonding + 2 lone pairs → molecular shape is bent (about 104.5°).',
        answer: 2,
      },
      {
        id: '3.4',
        type: 'Application',
        prompt:
          'What is the hybridization of carbon in CH₄ (methane)? Enter the number: (1) sp, (2) sp², (3) sp³, (4) sp³d',
        hint: 'Count the electron domains around carbon. Match to the hybridization.',
        solution: '4 electron domains (4 single bonds) → sp³ hybridization.',
        answer: 3,
      },
      {
        id: '3.5',
        type: 'Calculation',
        prompt:
          'For H₂ + Cl₂ → 2 HCl: bonds broken = H−H (436) + Cl−Cl (242) = 678 kJ. Bonds formed = 2(H−Cl) = 2(431) = 862 kJ. ΔH = broken − formed. Enter the HUNDREDS digit of |ΔH|.',
        hint: 'Compute 678 − 862, then take the absolute value, then find the hundreds digit.',
        solution: 'ΔH = 678 − 862 = −184 kJ. |ΔH| = 184. The hundreds digit of 184 is 1.',
        answer: 1,
      },
    ],
  },
  {
    id: 4,
    name: 'The Final Reactor',
    difficulty: 'EXTRA HARD',
    chapters: 'Chapters 3–5',
    subtitle: 'Stoichiometry, Solutions, Thermochemistry',
    description:
      'The core reactor pulses. Every puzzle is pure calculation. Get to the Exam Vault.',
    code: '42254',
    puzzles: [
      {
        id: '4.1',
        type: 'Calculation',
        prompt:
          'What is the molar mass of CO₂? Use C = 12.0 g/mol and O = 16.0 g/mol. Enter the ones digit.',
        hint: 'Molar mass = sum of atomic masses of each atom in the formula.',
        solution: 'M(CO₂) = 12.0 + 2(16.0) = 44.0 g/mol. The ones digit of 44 is 4.',
        answer: 4,
      },
      {
        id: '4.2',
        type: 'Calculation',
        prompt: 'How many moles are in 88.0 g of CO₂? (Use M = 44.0 g/mol.)',
        hint: 'moles = mass ÷ molar mass.',
        solution: 'n = 88.0 g ÷ 44.0 g/mol = 2.00 mol.',
        answer: 2,
      },
      {
        id: '4.3',
        type: 'Calculation',
        prompt:
          'What is the molarity of a solution containing 0.50 mol NaCl in 2.0 L of solution? Enter the TENTHS digit (e.g., 0.25 M → answer is 2).',
        hint: 'M = moles ÷ liters.',
        solution: 'M = 0.50 mol ÷ 2.0 L = 0.25 M. The tenths digit of 0.25 is 2.',
        answer: 2,
      },
      {
        id: '4.4',
        type: 'Calculation',
        prompt:
          'How many mL of 6.0 M HCl are needed to make 300 mL of 1.0 M HCl? Use M₁V₁ = M₂V₂. Enter the TENS digit.',
        hint: 'Solve V₁ = (M₂ × V₂) ÷ M₁.',
        solution: 'V₁ = (1.0 × 300) ÷ 6.0 = 50 mL. The tens digit of 50 is 5.',
        answer: 5,
      },
      {
        id: '4.5',
        type: 'Calculation',
        prompt:
          'How much heat (in J) is needed to warm 10.0 g of water from 20.0 °C to 30.0 °C? Use c = 4.18 J/g·°C. Enter the HUNDREDS digit of your answer in joules.',
        hint: 'q = m × c × ΔT.',
        solution: 'q = (10.0)(4.18)(10.0) = 418 J. The hundreds digit of 418 is 4.',
        answer: 4,
      },
    ],
  },
]

// Sanity check: ensure the room's stated `code` matches concatenated puzzle answers.
// Throws at import time if they ever drift out of sync, which makes bugs loud.
for (const room of ROOMS) {
  const derived = room.puzzles.map((p) => p.answer).join('')
  if (derived !== room.code) {
    throw new Error(
      `Room ${room.id} code mismatch: stored "${room.code}" vs derived "${derived}"`
    )
  }
}
