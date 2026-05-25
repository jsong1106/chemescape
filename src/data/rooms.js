// Single source of truth for all game content.
//
// Each room has 5 SUB-TOPIC SLOTS. Each slot has a pool of puzzles (~4 each).
// On game start, one puzzle is randomly picked from each slot, in order.
// This guarantees every play covers all 5 sub-topics at the right difficulty,
// while giving 4^5 = 1024 unique combinations per room.
//
// The unlock code is derived at runtime by concatenating the chosen puzzle answers.

export const GAME_CONFIG = {
  totalTimeSeconds: 20 * 60,
  overtimePenaltyMultiplier: 2,
}

// Helper for building rooms below. `slots` is an array of arrays of puzzles.
function room({ id, name, difficulty, chapters, subtitle, description, slots }) {
  return { id, name, difficulty, chapters, subtitle, description, slots }
}

export const ROOMS = [
  // =============================================================
  // ROOM 1 - LOBBY OF ELEMENTS - EASY - CH 1-2
  // Slots: sig figs | scientific notation | isotopes | ion charges | formula counting
  // =============================================================
  room({
    id: 1,
    name: 'Lobby of Elements',
    difficulty: 'EASY',
    chapters: 'Chapters 1–2',
    subtitle: 'Foundations: Matter, Energy, Atoms, Ions',
    description:
      "You wake up in the lab supply closet. The door is sealed. Five terminals blink on the wall — solve each to recover the access code.",
    slots: [
      // SLOT 1 - Significant figures
      [
        { id: 'S1A', type: 'Recall', topic: 'Sig Figs',
          prompt: 'How many significant figures are in the measurement 0.004560 g?',
          hint: 'Leading zeros never count. Trailing zeros after a decimal point do count.',
          solution: 'Leading zeros are not significant. Significant digits: 4, 5, 6, 0 → 4 sig figs.',
          answer: 4 },
        { id: 'S1B', type: 'Recall', topic: 'Sig Figs',
          prompt: 'How many significant figures are in the measurement 12.030 mL?',
          hint: 'Zeros BETWEEN non-zero digits always count. Trailing zeros after the decimal count.',
          solution: '1, 2, 0, 3, 0 are all significant → 5 sig figs.',
          answer: 5 },
        { id: 'S1C', type: 'Recall', topic: 'Sig Figs',
          prompt: 'How many significant figures are in 0.0300 kg?',
          hint: 'Strip leading zeros. The rest counts.',
          solution: 'Leading zeros do not count. The 3 and the two trailing zeros after the decimal do → 3 sig figs.',
          answer: 3 },
        { id: 'S1D', type: 'Application', topic: 'Sig Figs',
          prompt: 'A balance reads 5.20 g. A more precise scale reads 5.200 g. How many sig figs does 5.200 have?',
          hint: 'Trailing zeros after a decimal are significant.',
          solution: '5, 2, 0, 0 → 4 sig figs.',
          answer: 4 },
      ],

      // SLOT 2 - Scientific notation
      [
        { id: 'S2A', type: 'Calculation', topic: 'Sci Notation',
          prompt: 'Express 0.00000500 in scientific notation as 5.00 × 10^(−n). What is n?',
          hint: 'Count how many places you move the decimal to the right to get 5.00.',
          solution: 'Move decimal 6 places right: 0.00000500 = 5.00 × 10⁻⁶. n = 6.',
          answer: 6 },
        { id: 'S2B', type: 'Calculation', topic: 'Sci Notation',
          prompt: 'Express 0.00040 in scientific notation as 4.0 × 10^(−n). What is n?',
          hint: 'Move the decimal point until you get a number between 1 and 10.',
          solution: '0.00040 = 4.0 × 10⁻⁴. n = 4.',
          answer: 4 },
        { id: 'S2C', type: 'Calculation', topic: 'Sci Notation',
          prompt: 'Express 7,000,000 as 7 × 10^n. What is n?',
          hint: 'Count the zeros after the 7.',
          solution: '7,000,000 = 7 × 10⁶. n = 6.',
          answer: 6 },
        { id: 'S2D', type: 'Calculation', topic: 'Sci Notation',
          prompt: 'Express 0.005 as 5 × 10^(−n). What is n?',
          hint: 'How many decimal places to move right to get 5?',
          solution: '0.005 = 5 × 10⁻³. n = 3.',
          answer: 3 },
      ],

      // SLOT 3 - Isotopes / atomic structure
      [
        { id: 'S3A', type: 'Application', topic: 'Isotopes',
          prompt: '³¹P (phosphorus, Z = 15) has how many neutrons? Enter the ONES digit.',
          hint: 'Neutrons = mass number − protons.',
          solution: 'Neutrons = 31 − 15 = 16. Ones digit of 16 = 6.',
          answer: 6 },
        { id: 'S3B', type: 'Application', topic: 'Isotopes',
          prompt: '⁵⁶Fe (iron, Z = 26) has how many neutrons? Enter the ONES digit.',
          hint: 'Neutrons = mass number − atomic number.',
          solution: 'Neutrons = 56 − 26 = 30. Ones digit = 0.',
          answer: 0 },
        { id: 'S3C', type: 'Application', topic: 'Isotopes',
          prompt: '¹⁹F (fluorine, Z = 9) has how many neutrons? Enter the ONES digit.',
          hint: 'Subtract protons from mass number.',
          solution: '19 − 9 = 10 neutrons. Ones digit of 10 = 0.',
          answer: 0 },
        { id: 'S3D', type: 'Application', topic: 'Isotopes',
          prompt: '²³Na (sodium, Z = 11) has how many neutrons? Enter the ONES digit.',
          hint: 'Mass number − proton count.',
          solution: '23 − 11 = 12. Ones digit = 2.',
          answer: 2 },
      ],

      // SLOT 4 - Ion charges
      [
        { id: 'S4A', type: 'Application', topic: 'Ion Charges',
          prompt: 'What is the magnitude of the charge on calcium in CaCl₂?',
          hint: 'Chloride is −1. Compound must be neutral overall.',
          solution: 'Two Cl⁻ = −2 total. Ca must be +2 to balance. Magnitude = 2.',
          answer: 2 },
        { id: 'S4B', type: 'Application', topic: 'Ion Charges',
          prompt: 'What is the magnitude of the charge on aluminum in AlCl₃?',
          hint: '3 chlorides each contribute −1.',
          solution: '3 Cl⁻ = −3 total. Al must be +3. Magnitude = 3.',
          answer: 3 },
        { id: 'S4C', type: 'Application', topic: 'Ion Charges',
          prompt: 'In Na₂O, what is the magnitude of the charge on the oxide ion?',
          hint: 'Two Na⁺ contribute +2 total. The compound is neutral.',
          solution: '2 Na⁺ = +2. Oxide must be −2. Magnitude = 2.',
          answer: 2 },
        { id: 'S4D', type: 'Application', topic: 'Ion Charges',
          prompt: 'In K₃N, what is the magnitude of the charge on nitrogen?',
          hint: '3 potassium ions are each +1.',
          solution: '3 K⁺ = +3. N must be −3. Magnitude = 3.',
          answer: 3 },
      ],

      // SLOT 5 - Atom counting in formulas
      [
        { id: 'S5A', type: 'Application', topic: 'Formula Counting',
          prompt: 'Oxygen atoms per formula unit of Al₂(SO₄)₃? Enter the ONES digit.',
          hint: 'The 3 multiplies everything inside the parentheses.',
          solution: '3 × 4 = 12 oxygens. Ones digit of 12 = 2.',
          answer: 2 },
        { id: 'S5B', type: 'Application', topic: 'Formula Counting',
          prompt: 'Hydrogen atoms per formula unit of (NH₄)₂SO₄? Enter the ONES digit.',
          hint: 'The 2 multiplies all H atoms inside the parentheses.',
          solution: '2 × 4 = 8 hydrogens. Ones digit = 8.',
          answer: 8 },
        { id: 'S5C', type: 'Application', topic: 'Formula Counting',
          prompt: 'Total atoms in one formula unit of Ca(NO₃)₂? Enter the ONES digit.',
          hint: '1 Ca + 2 N + 6 O.',
          solution: '1 + 2 + 6 = 9 atoms. Ones digit = 9.',
          answer: 9 },
        { id: 'S5D', type: 'Application', topic: 'Formula Counting',
          prompt: 'Oxygen atoms per formula unit of Mg(OH)₂?',
          hint: 'The 2 multiplies both O and H.',
          solution: '2 oxygens.',
          answer: 2 },
      ],
    ],
  }),

  // =============================================================
  // ROOM 2 - HALL OF PATTERNS - MEDIUM - CH 6-7
  // Slots: shell capacity | orbitals/subshells | electron config | atomic radius | electronegativity/IE
  // =============================================================
  room({
    id: 2,
    name: 'Hall of Patterns',
    difficulty: 'MEDIUM',
    chapters: 'Chapters 6–7',
    subtitle: 'Electronic Structure & Periodic Trends',
    description:
      "The door opens into a circular hall lined with glowing periodic tables. Prove you can predict an element's behavior from its position.",
    slots: [
      // SLOT 1 - Shell capacity
      [
        { id: 'S1A', type: 'Recall', topic: 'Shell Capacity',
          prompt: 'Maximum electrons in the n = 2 shell?',
          hint: 'Use the formula 2n².',
          solution: '2(2)² = 8 electrons.',
          answer: 8 },
        { id: 'S1B', type: 'Recall', topic: 'Shell Capacity',
          prompt: 'Maximum electrons in the n = 1 shell?',
          hint: '2n² with n = 1.',
          solution: '2(1)² = 2 electrons.',
          answer: 2 },
        { id: 'S1C', type: 'Application', topic: 'Shell Capacity',
          prompt: 'Maximum electrons in a single p orbital?',
          hint: 'Pauli exclusion: 2 electrons per orbital max.',
          solution: 'Any single orbital holds 2 electrons.',
          answer: 2 },
        { id: 'S1D', type: 'Application', topic: 'Shell Capacity',
          prompt: 'Maximum electrons in a p SUBSHELL (all 3 orbitals)?',
          hint: '3 orbitals × 2 electrons each.',
          solution: '3 × 2 = 6 electrons.',
          answer: 6 },
      ],

      // SLOT 2 - Orbitals / subshells
      [
        { id: 'S2A', type: 'Recall', topic: 'Orbitals',
          prompt: 'How many orbitals are in a d subshell?',
          hint: 'For d, ℓ = 2, so mℓ runs from −2 to +2.',
          solution: 'mℓ = −2, −1, 0, +1, +2 → 5 orbitals.',
          answer: 5 },
        { id: 'S2B', type: 'Recall', topic: 'Orbitals',
          prompt: 'How many orbitals are in a p subshell?',
          hint: 'For p, ℓ = 1, mℓ = −1, 0, +1.',
          solution: '3 orbitals (px, py, pz).',
          answer: 3 },
        { id: 'S2C', type: 'Recall', topic: 'Orbitals',
          prompt: 'How many orbitals are in an s subshell?',
          hint: 'For s, ℓ = 0, only one mℓ value.',
          solution: '1 orbital.',
          answer: 1 },
        { id: 'S2D', type: 'Application', topic: 'Orbitals',
          prompt: 'How many unpaired electrons in ground-state nitrogen (Z = 7)?',
          hint: 'Config: 1s² 2s² 2p³. Hund\'s rule.',
          solution: '3 p-orbitals each get one electron (Hund\'s rule). 3 unpaired.',
          answer: 3 },
      ],

      // SLOT 3 - Electron config valence
      [
        { id: 'S3A', type: 'Application', topic: 'Electron Config',
          prompt: 'What is the principal quantum number n for the valence shell of sodium (Z = 11)?',
          hint: 'Write the electron configuration. Valence shell = highest n.',
          solution: 'Na: 1s² 2s² 2p⁶ 3s¹. Valence n = 3.',
          answer: 3 },
        { id: 'S3B', type: 'Application', topic: 'Electron Config',
          prompt: 'Valence shell n for potassium (Z = 19)?',
          hint: 'K is in period 4.',
          solution: 'K: [Ar] 4s¹. Valence n = 4.',
          answer: 4 },
        { id: 'S3C', type: 'Application', topic: 'Electron Config',
          prompt: 'Number of valence electrons in oxygen (Z = 8)?',
          hint: 'O is in group 16 (or group VIA).',
          solution: '2s² 2p⁴ → 6 valence electrons.',
          answer: 6 },
        { id: 'S3D', type: 'Application', topic: 'Electron Config',
          prompt: 'Number of valence electrons in sulfur (Z = 16)?',
          hint: 'Same group as oxygen.',
          solution: 'S is in group 16 → 6 valence electrons.',
          answer: 6 },
      ],

      // SLOT 4 - Atomic radius / size
      [
        { id: 'S4A', type: 'Application', topic: 'Atomic Radius',
          prompt: 'Largest atomic radius? (1) Na  (2) Mg  (3) Al  (4) Si',
          hint: 'Radius decreases left → right across a period.',
          solution: 'All in period 3. Na is leftmost → largest radius.',
          answer: 1 },
        { id: 'S4B', type: 'Application', topic: 'Atomic Radius',
          prompt: 'Smallest atomic radius? (1) Li  (2) Na  (3) K  (4) Rb',
          hint: 'Radius increases down a group.',
          solution: 'All in group 1. Li is at the top → smallest.',
          answer: 1 },
        { id: 'S4C', type: 'Application', topic: 'Atomic Radius',
          prompt: 'Largest atomic radius? (1) F  (2) Cl  (3) Br  (4) I',
          hint: 'Radius increases as you go down a group.',
          solution: 'I is at the bottom of group 17 → largest.',
          answer: 4 },
        { id: 'S4D', type: 'Application', topic: 'Atomic Radius',
          prompt: 'Smallest atomic radius? (1) C  (2) N  (3) O  (4) F',
          hint: 'Radius decreases left → right across a period.',
          solution: 'F is rightmost in period 2 → smallest.',
          answer: 4 },
      ],

      // SLOT 5 - Electronegativity / ionization energy
      [
        { id: 'S5A', type: 'Application', topic: 'Electronegativity',
          prompt: 'Most electronegative? (1) F  (2) O  (3) N  (4) C',
          hint: 'EN increases up and to the right.',
          solution: 'F has the highest electronegativity (Pauling 3.98).',
          answer: 1 },
        { id: 'S5B', type: 'Application', topic: 'Electronegativity',
          prompt: 'Lowest electronegativity? (1) Li  (2) Be  (3) B  (4) C',
          hint: 'EN decreases left across a period.',
          solution: 'Li is leftmost in period 2 → lowest EN.',
          answer: 1 },
        { id: 'S5C', type: 'Application', topic: 'Ionization Energy',
          prompt: 'Highest first ionization energy? (1) Li  (2) Be  (3) B  (4) Ne',
          hint: 'Noble gases have the highest IE in their period.',
          solution: 'Ne is the noble gas → highest IE.',
          answer: 4 },
        { id: 'S5D', type: 'Application', topic: 'Ionization Energy',
          prompt: 'Lowest first ionization energy? (1) Na  (2) Mg  (3) Al  (4) Si',
          hint: 'IE generally increases left → right.',
          solution: 'Na is leftmost → easiest to remove an electron.',
          answer: 1 },
      ],
    ],
  }),

  // =============================================================
  // ROOM 3 - THE BOND FORGE - HARD - CH 8-9
  // Slots: electrons in bonds | lone pairs | molecular shape | hybridization | bond energy calc
  // =============================================================
  room({
    id: 3,
    name: 'The Bond Forge',
    difficulty: 'HARD',
    chapters: 'Chapters 8–9',
    subtitle: 'Chemical Bonding & Molecular Geometry',
    description:
      "Sparks fly from welding stations along the wall. To pass, you must draw molecules in your head — count electrons, predict shapes, calculate energies.",
    slots: [
      // SLOT 1 - Electrons in bonds
      [
        { id: 'S1A', type: 'Recall', topic: 'Bond Electrons',
          prompt: 'How many electrons are shared in a double bond?',
          hint: '2 pairs of shared electrons.',
          solution: '2 pairs × 2 e⁻ = 4 electrons.',
          answer: 4 },
        { id: 'S1B', type: 'Recall', topic: 'Bond Electrons',
          prompt: 'How many electrons are shared in a triple bond?',
          hint: '3 pairs of shared electrons.',
          solution: '3 pairs × 2 e⁻ = 6 electrons.',
          answer: 6 },
        { id: 'S1C', type: 'Recall', topic: 'Bond Electrons',
          prompt: 'How many electrons are shared in a single bond?',
          hint: 'One pair.',
          solution: '1 pair × 2 = 2 electrons.',
          answer: 2 },
        { id: 'S1D', type: 'Application', topic: 'Bond Electrons',
          prompt: 'In N₂ (N≡N), how many electrons are shared between the two N atoms?',
          hint: 'It\'s a triple bond.',
          solution: 'Triple bond = 6 shared electrons.',
          answer: 6 },
      ],

      // SLOT 2 - Lone pairs
      [
        { id: 'S2A', type: 'Application', topic: 'Lone Pairs',
          prompt: 'How many lone pairs are on the nitrogen atom in NH₃?',
          hint: 'N has 5 valence e⁻. 3 are shared with H.',
          solution: 'N has 5 valence e⁻. 3 used in N–H bonds. 2 left = 1 lone pair.',
          answer: 1 },
        { id: 'S2B', type: 'Application', topic: 'Lone Pairs',
          prompt: 'How many lone pairs are on the oxygen atom in H₂O?',
          hint: 'O has 6 valence e⁻. 2 are shared with H.',
          solution: '6 − 2 = 4 e⁻ remaining = 2 lone pairs.',
          answer: 2 },
        { id: 'S2C', type: 'Application', topic: 'Lone Pairs',
          prompt: 'How many lone pairs are on each F atom in F₂?',
          hint: 'F has 7 valence e⁻. 1 is used in the F–F bond.',
          solution: '7 − 1 = 6 e⁻ as lone pairs = 3 lone pairs per F.',
          answer: 3 },
        { id: 'S2D', type: 'Application', topic: 'Lone Pairs',
          prompt: 'How many lone pairs are on the central C atom in CH₄?',
          hint: 'C has 4 valence e⁻. All are used in bonds.',
          solution: '4 − 4 = 0 lone pairs.',
          answer: 0 },
      ],

      // SLOT 3 - Molecular shape (multiple choice, answer is the option number)
      [
        { id: 'S3A', type: 'Application', topic: 'Molecular Shape',
          prompt: 'Shape of H₂O? (1) Linear  (2) Bent  (3) Trigonal planar  (4) Tetrahedral',
          hint: '4 electron domains, 2 bonds + 2 lone pairs.',
          solution: '4 domains with 2 lone pairs → bent (~104.5°).',
          answer: 2 },
        { id: 'S3B', type: 'Application', topic: 'Molecular Shape',
          prompt: 'Shape of CO₂? (1) Linear  (2) Bent  (3) Trigonal planar  (4) Tetrahedral',
          hint: 'Central C has 2 double bonds, no lone pairs.',
          solution: '2 electron domains, 0 lone pairs → linear.',
          answer: 1 },
        { id: 'S3C', type: 'Application', topic: 'Molecular Shape',
          prompt: 'Shape of NH₃? (1) Linear  (2) Bent  (3) Trigonal pyramidal  (4) Tetrahedral',
          hint: 'N has 4 domains: 3 bonds + 1 lone pair.',
          solution: '4 domains, 1 lone pair → trigonal pyramidal.',
          answer: 3 },
        { id: 'S3D', type: 'Application', topic: 'Molecular Shape',
          prompt: 'Shape of BF₃? (1) Linear  (2) Bent  (3) Trigonal planar  (4) Tetrahedral',
          hint: 'B has 3 bonds and no lone pairs.',
          solution: '3 electron domains, 0 lone pairs → trigonal planar.',
          answer: 3 },
      ],

      // SLOT 4 - Hybridization
      [
        { id: 'S4A', type: 'Application', topic: 'Hybridization',
          prompt: 'Hybridization of C in CH₄? (1) sp  (2) sp²  (3) sp³  (4) sp³d',
          hint: 'Count electron domains on C.',
          solution: '4 domains → sp³.',
          answer: 3 },
        { id: 'S4B', type: 'Application', topic: 'Hybridization',
          prompt: 'Hybridization of C in CO₂? (1) sp  (2) sp²  (3) sp³  (4) sp³d',
          hint: 'C has 2 double bonds = 2 domains.',
          solution: '2 domains → sp.',
          answer: 1 },
        { id: 'S4C', type: 'Application', topic: 'Hybridization',
          prompt: 'Hybridization of C in C₂H₄ (ethylene, C=C double bond)? (1) sp  (2) sp²  (3) sp³  (4) sp³d',
          hint: 'Each C has 3 domains: 1 double bond + 2 single bonds.',
          solution: '3 domains → sp².',
          answer: 2 },
        { id: 'S4D', type: 'Application', topic: 'Hybridization',
          prompt: 'Hybridization of N in NH₃? (1) sp  (2) sp²  (3) sp³  (4) sp³d',
          hint: 'N has 4 domains (3 bonds + 1 lone pair).',
          solution: '4 domains → sp³.',
          answer: 3 },
      ],

      // SLOT 5 - Bond energy calculation (the harder, calculation-flavored slot)
      [
        { id: 'S5A', type: 'Calculation', topic: 'Bond Energy',
          prompt: 'H₂ + Cl₂ → 2 HCl. Bonds broken: H−H (436) + Cl−Cl (242) = 678 kJ. Bonds formed: 2(H−Cl) = 2(431) = 862 kJ. ΔH = broken − formed. HUNDREDS digit of |ΔH|?',
          hint: 'Compute 678 − 862, take absolute value, find the hundreds digit.',
          solution: 'ΔH = 678 − 862 = −184 kJ. |ΔH| = 184. Hundreds digit = 1.',
          answer: 1 },
        { id: 'S5B', type: 'Calculation', topic: 'Bond Energy',
          prompt: 'For X + Y → Z, broken = 500 kJ, formed = 700 kJ. ΔH = broken − formed. HUNDREDS digit of |ΔH|?',
          hint: 'Compute the difference, take absolute value.',
          solution: 'ΔH = 500 − 700 = −200 kJ. |ΔH| = 200. Hundreds digit = 2.',
          answer: 2 },
        { id: 'S5C', type: 'Calculation', topic: 'Bond Energy',
          prompt: 'Bonds broken = 950 kJ, bonds formed = 650 kJ. ΔH = broken − formed. HUNDREDS digit?',
          hint: 'This one ends up positive (endothermic).',
          solution: 'ΔH = 950 − 650 = +300 kJ. Hundreds digit = 3.',
          answer: 3 },
        { id: 'S5D', type: 'Calculation', topic: 'Bond Energy',
          prompt: '2 H₂ + O₂ → 2 H₂O. Broken: 2(436) + 495 = 1367 kJ. Formed: 4(463) = 1852 kJ. ΔH = broken − formed. THOUSANDS digit of broken bonds energy (1367)?',
          hint: 'Just read the thousands digit of 1367.',
          solution: 'Thousands digit of 1367 = 1.',
          answer: 1 },
      ],
    ],
  }),

  // =============================================================
  // ROOM 4 - THE FINAL REACTOR - EXTRA HARD - CH 3-5
  // Slots: molar mass | mole conversion | molarity | dilution | calorimetry (q = mcΔT)
  // =============================================================
  room({
    id: 4,
    name: 'The Final Reactor',
    difficulty: 'EXTRA HARD',
    chapters: 'Chapters 3–5',
    subtitle: 'Stoichiometry, Solutions, Thermochemistry',
    description:
      "The core reactor pulses. Every puzzle is pure calculation. Get to the Exam Vault.",
    slots: [
      // SLOT 1 - Molar mass
      [
        { id: 'S1A', type: 'Calculation', topic: 'Molar Mass',
          prompt: 'Molar mass of CO₂ (C = 12.0, O = 16.0)? Enter the ONES digit.',
          hint: 'Sum the atomic masses.',
          solution: '12.0 + 2(16.0) = 44.0 g/mol. Ones digit = 4.',
          answer: 4 },
        { id: 'S1B', type: 'Calculation', topic: 'Molar Mass',
          prompt: 'Molar mass of H₂O (H = 1.0, O = 16.0)? Enter the ONES digit.',
          hint: '2 H + 1 O.',
          solution: '2(1.0) + 16.0 = 18.0 g/mol. Ones digit = 8.',
          answer: 8 },
        { id: 'S1C', type: 'Calculation', topic: 'Molar Mass',
          prompt: 'Molar mass of NaCl (Na = 23.0, Cl = 35.5)? Enter the ONES digit.',
          hint: '23.0 + 35.5.',
          solution: '23.0 + 35.5 = 58.5 g/mol. Ones digit = 8.',
          answer: 8 },
        { id: 'S1D', type: 'Calculation', topic: 'Molar Mass',
          prompt: 'Molar mass of CH₄ (C = 12.0, H = 1.0)? Enter the ONES digit.',
          hint: '1 C + 4 H.',
          solution: '12.0 + 4(1.0) = 16.0 g/mol. Ones digit = 6.',
          answer: 6 },
      ],

      // SLOT 2 - Mole conversions
      [
        { id: 'S2A', type: 'Calculation', topic: 'Mole Conversion',
          prompt: 'How many moles are in 88.0 g of CO₂? (M = 44.0 g/mol)',
          hint: 'moles = mass ÷ molar mass.',
          solution: '88.0 ÷ 44.0 = 2.00 mol.',
          answer: 2 },
        { id: 'S2B', type: 'Calculation', topic: 'Mole Conversion',
          prompt: 'How many moles in 36.0 g of H₂O? (M = 18.0 g/mol)',
          hint: 'Divide grams by molar mass.',
          solution: '36.0 ÷ 18.0 = 2.00 mol.',
          answer: 2 },
        { id: 'S2C', type: 'Calculation', topic: 'Mole Conversion',
          prompt: 'How many moles in 117 g of NaCl? (M = 58.5 g/mol)',
          hint: 'mass ÷ molar mass.',
          solution: '117 ÷ 58.5 = 2.00 mol.',
          answer: 2 },
        { id: 'S2D', type: 'Calculation', topic: 'Mole Conversion',
          prompt: 'How many moles in 64.0 g of CH₄? (M = 16.0 g/mol)',
          hint: 'mass ÷ molar mass.',
          solution: '64.0 ÷ 16.0 = 4.00 mol.',
          answer: 4 },
      ],

      // SLOT 3 - Molarity
      [
        { id: 'S3A', type: 'Calculation', topic: 'Molarity',
          prompt: 'Molarity of a solution with 0.50 mol NaCl in 2.0 L? Enter the TENTHS digit (e.g. 0.25 → 2).',
          hint: 'M = mol ÷ L.',
          solution: '0.50 ÷ 2.0 = 0.25 M. Tenths digit = 2.',
          answer: 2 },
        { id: 'S3B', type: 'Calculation', topic: 'Molarity',
          prompt: 'Molarity of a solution with 1.0 mol HCl in 4.0 L? Enter the TENTHS digit.',
          hint: 'M = mol ÷ L.',
          solution: '1.0 ÷ 4.0 = 0.25 M. Tenths digit = 2.',
          answer: 2 },
        { id: 'S3C', type: 'Calculation', topic: 'Molarity',
          prompt: 'Molarity of a solution with 0.30 mol KCl in 1.0 L? Enter the TENTHS digit.',
          hint: 'M = mol ÷ L.',
          solution: '0.30 ÷ 1.0 = 0.30 M. Tenths digit = 3.',
          answer: 3 },
        { id: 'S3D', type: 'Calculation', topic: 'Molarity',
          prompt: 'Molarity of a solution with 2.0 mol NaOH in 5.0 L? Enter the TENTHS digit.',
          hint: 'M = mol ÷ L.',
          solution: '2.0 ÷ 5.0 = 0.40 M. Tenths digit = 4.',
          answer: 4 },
      ],

      // SLOT 4 - Dilution (M1V1 = M2V2)
      [
        { id: 'S4A', type: 'Calculation', topic: 'Dilution',
          prompt: 'mL of 6.0 M HCl needed to make 300 mL of 1.0 M HCl? Use M₁V₁ = M₂V₂. Enter the TENS digit.',
          hint: 'V₁ = (M₂V₂) / M₁.',
          solution: 'V₁ = (1.0 × 300) ÷ 6.0 = 50 mL. Tens digit = 5.',
          answer: 5 },
        { id: 'S4B', type: 'Calculation', topic: 'Dilution',
          prompt: 'mL of 4.0 M NaOH needed to make 200 mL of 0.5 M NaOH? Enter the TENS digit.',
          hint: 'V₁ = (M₂V₂) / M₁.',
          solution: 'V₁ = (0.5 × 200) ÷ 4.0 = 25 mL. Tens digit = 2.',
          answer: 2 },
        { id: 'S4C', type: 'Calculation', topic: 'Dilution',
          prompt: 'mL of 10.0 M H₂SO₄ needed to make 500 mL of 1.0 M H₂SO₄? Enter the TENS digit.',
          hint: 'V₁ = (M₂V₂) / M₁.',
          solution: 'V₁ = (1.0 × 500) ÷ 10.0 = 50 mL. Tens digit = 5.',
          answer: 5 },
        { id: 'S4D', type: 'Calculation', topic: 'Dilution',
          prompt: 'mL of 3.0 M KCl needed to make 600 mL of 0.5 M KCl? Enter the TENS digit.',
          hint: 'V₁ = (M₂V₂) / M₁.',
          solution: 'V₁ = (0.5 × 600) ÷ 3.0 = 100 mL. Tens digit = 0.',
          answer: 0 },
      ],

      // SLOT 5 - Calorimetry (q = mcΔT)
      [
        { id: 'S5A', type: 'Calculation', topic: 'Calorimetry',
          prompt: 'Heat (J) to warm 10.0 g of H₂O from 20.0 → 30.0 °C? c = 4.18. Enter the HUNDREDS digit.',
          hint: 'q = mcΔT.',
          solution: 'q = 10.0 × 4.18 × 10.0 = 418 J. Hundreds digit = 4.',
          answer: 4 },
        { id: 'S5B', type: 'Calculation', topic: 'Calorimetry',
          prompt: 'Heat (J) to warm 50.0 g of H₂O by 10.0 °C? c = 4.18. Enter the THOUSANDS digit.',
          hint: 'q = mcΔT = 50.0 × 4.18 × 10.0.',
          solution: 'q = 2090 J. Thousands digit = 2.',
          answer: 2 },
        { id: 'S5C', type: 'Calculation', topic: 'Calorimetry',
          prompt: 'Heat (J) to warm 25.0 g H₂O from 10.0 → 30.0 °C? c = 4.18. Enter the THOUSANDS digit.',
          hint: 'ΔT = 20.0 °C.',
          solution: 'q = 25.0 × 4.18 × 20.0 = 2090 J. Thousands digit = 2.',
          answer: 2 },
        { id: 'S5D', type: 'Calculation', topic: 'Calorimetry',
          prompt: 'Heat (J) to warm 100.0 g H₂O from 20.0 → 25.0 °C? c = 4.18. Enter the THOUSANDS digit.',
          hint: 'q = mcΔT.',
          solution: 'q = 100.0 × 4.18 × 5.0 = 2090 J. Thousands digit = 2.',
          answer: 2 },
      ],
    ],
  }),
]

// Sanity check at import time: each puzzle answer must be a single digit 0-9.
// Catches typos in the source data before they break gameplay.
for (const r of ROOMS) {
  for (const slot of r.slots) {
    for (const p of slot) {
      if (typeof p.answer !== 'number' || p.answer < 0 || p.answer > 9 || !Number.isInteger(p.answer)) {
        throw new Error(`Bad answer in puzzle ${p.id} of Room ${r.id}: ${p.answer}`)
      }
    }
    if (slot.length === 0) throw new Error(`Empty slot in Room ${r.id}`)
  }
  if (r.slots.length !== 5) throw new Error(`Room ${r.id} must have exactly 5 slots`)
}
