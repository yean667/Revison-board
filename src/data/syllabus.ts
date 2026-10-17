import { Chapter, Subject } from '../types';

export const PHYSICS_CHAPTERS: string[] = [
  'Basic Maths',
  'Units and Dimensions',
  'Motion in 1D',
  'Motion in 2D',
  'NLM (Laws of Motion)',
  'WPE (Work, Power & Energy)',
  'COM (Centre of Mass)',
  'Rotational Motion',
  'Gravitation',
  'Solids',
  'Fluids',
  'Thermal Properties of Matter',
  'Thermodynamics',
  'KTG (Kinetic Theory of Gases)',
  'Oscillations',
  'Waves and Sound',
  'Electrostatics',
  'Capacitance',
  'Current Electricity',
  'Magnetism',
  'EMI (Electromagnetic Induction)',
  'AC (Alternating Current)',
  'EM Waves (Electromagnetic Waves)',
  'Ray Optics',
  'Wave Optics',
  'Dual Nature of Matter',
  'Atomic Physics',
  'Nuclear Physics',
  'Semiconductor Electronics',
]; // 29 chapters

export const CHEMISTRY_CHAPTERS: string[] = [
  'Some Basic Concepts in Chemistry',
  'Atomic Structure',
  'Chemical Bonding and Molecular Structure',
  'Chemical Thermodynamics',
  'Solutions',
  'Equilibrium',
  'Redox Reactions',
  'Electrochemistry',
  'Chemical Kinetics',
  'Classification of Elements and Periodicity',
  'p-Block Elements',
  'd- and f-Block Elements',
  'Coordination Compounds',
  'Purification and Characterisation of Organic Compounds',
  'Some Basic Principles of Organic Chemistry',
  'Hydrocarbons',
  'Organic Compounds Containing Halogens',
  'Alcohols, Phenols and Ethers',
  'Aldehydes, Ketones and Carboxylic Acids',
  'Organic Compounds Containing Nitrogen',
  'Biomolecules',
  'Principles Related to Practical Chemistry',
]; // 22 chapters

export const MATHEMATICS_CHAPTERS: string[] = [
  'Sets',
  'Relations and Functions',
  'Complex Numbers',
  'Quadratic Equations',
  'Matrices',
  'Determinants',
  'Permutations and Combinations',
  'Binomial Theorem',
  'Sequence and Series',
  'Mathematical Induction',
  'Limits, Continuity and Differentiability',
  'Application of Derivatives',
  'Indefinite Integration',
  'Definite Integration',
  'Differential Equations',
  'Vector Algebra',
  'Three Dimensional Geometry',
  'Straight Line',
  'Circle',
  'Parabola',
  'Ellipse',
  'Hyperbola',
  'Trigonometric Ratios and Identities',
  'Inverse Trigonometric Functions',
  'Trigonometric Equations',
  'Coordinate Geometry (Miscellaneous)',
  'Statistics',
  'Probability',
  'Vectors and 3D Geometry (Miscellaneous)',
]; // 29 chapters

const physicsStageLabels: [string, string, string, string, string] = [
  'B1 (1–20)',
  'B2 (21–40)',
  'B3 (41–60)',
  'B4 (61–80)',
  'Test (80 Q)',
];

const physicsStageDescriptions: [string, string, string, string, string] = [
  'Questions 1–20',
  'Questions 21–40',
  'Questions 41–60',
  'Questions 61–80',
  'Test 80 Questions',
];

const chemStageLabels: [string, string, string, string, string] = [
  'B1 (1–20)',
  'B2 (21–40)',
  'B3 (41–60)',
  'B4 (61–80)',
  'Test (80 Q)',
];

const chemStageDescriptions: [string, string, string, string, string] = [
  'Block 1: 20 Questions',
  'Block 2: 20 Questions',
  'Block 3: 20 Questions',
  'Block 4: 20 Questions',
  'Test 80 Questions',
];

const mathStageLabels: [string, string, string, string, string] = [
  'Class (20 Q)',
  'DPP (20 Q)',
  'Module (20 Q)',
  'PYQ (20 Q)',
  'Test (80 Q)',
];

const mathStageDescriptions: [string, string, string, string, string] = [
  'Class: 20 Questions',
  'DPP: 20 Questions',
  'Module: 20 Questions',
  'PYQ: 20 Questions',
  'Test 80 Questions',
];

const standardCounts: [number, number, number, number, number] = [20, 20, 20, 20, 80];

// Chapter aliases dictionary for robust and flexible search
const CHAPTER_ALIASES: Record<string, string[]> = {
  'phy-1': ['Math Tools', 'Calculus', 'Vectors', 'Differentiation', 'Integration'],
  'phy-2': ['Dimensions', 'Errors', 'Significant Figures', 'Vernier', 'Screw Gauge'],
  'phy-3': ['1D', 'Kinematics 1D', 'Speed', 'Velocity', 'Acceleration', 'Free Fall'],
  'phy-4': ['2D', 'Kinematics 2D', 'Projectile Motion', 'Relative Motion', 'River Boat'],
  'phy-5': ['Newton Laws', 'Friction', 'Tension', 'Springs', 'Constraint'],
  'phy-6': ['Work Power Energy', 'Work Energy Theorem', 'Potential Energy', 'Collisions'],
  'phy-7': ['Center of Mass', 'Collisions', 'Conservation of Momentum', 'Impulse'],
  'phy-8': ['Rotation', 'Moment of Inertia', 'Torque', 'Angular Momentum', 'Rolling'],
  'phy-9': ['Gravity', 'Kepler Laws', 'Gravitational Field', 'Escape Velocity', 'Satellites'],
  'phy-10': ['Mechanical Properties of Solids', 'Elasticity', 'Stress', 'Strain', 'Youngs Modulus'],
  'phy-11': ['Mechanical Properties of Fluids', 'Hydrostatics', 'Viscosity', 'Surface Tension', 'Bernoulli'],
  'phy-12': ['Calorimetry', 'Thermal Expansion', 'Heat Transfer', 'Conduction', 'Radiation'],
  'phy-13': ['First Law of Thermodynamics', 'Second Law', 'Carnot Engine', 'Heat Engine'],
  'phy-14': ['Kinetic Theory of Gases', 'Ideal Gas', 'Mean Free Path', 'Degrees of Freedom'],
  'phy-15': ['SHM', 'Simple Harmonic Motion', 'Spring Mass System', 'Simple Pendulum'],
  'phy-16': ['Sound Waves', 'Wave Motion', 'Doppler Effect', 'Organ Pipes', 'Beats'],
  'phy-17': ['Electric Charges and Fields', 'Coulombs Law', 'Gauss Law', 'Electric Dipole', 'Electrostatic Potential'],
  'phy-18': ['Capacitors', 'Dielectrics', 'RC Circuits', 'Energy in Capacitor'],
  'phy-19': ['Kirchhoffs Laws', 'Ohms Law', 'Wheatstone Bridge', 'Potentiometer', 'Meter Bridge'],
  'phy-20': ['Moving Charges and Magnetism', 'Magnetic Field', 'Biot Savart Law', 'Amperes Law', 'Lorentz Force'],
  'phy-21': ['Electromagnetic Induction', 'Faradays Law', 'Lenz Law', 'Self Inductance', 'Mutual Inductance'],
  'phy-22': ['Alternating Current', 'LCR Circuit', 'Resonance', 'Transformer', 'Power Factor'],
  'phy-23': ['Electromagnetic Waves', 'Displacement Current', 'EM Spectrum'],
  'phy-24': ['Geometrical Optics', 'Reflection', 'Refraction', 'Lenses', 'Mirrors', 'Optical Instruments', 'Prism'],
  'phy-25': ['Interference', 'Diffraction', 'YDSE', 'Polarization', 'Young Double Slit'],
  'phy-26': ['Photoelectric Effect', 'de Broglie Wavelength', 'Matter Waves', 'Davisson Germer'],
  'phy-27': ['Bohr Model', 'Hydrogen Spectrum', 'Rydberg Constant', 'Atomic Spectra'],
  'phy-28': ['Radioactivity', 'Nuclear Binding Energy', 'Nuclear Fission', 'Nuclear Fusion', 'Half Life'],
  'phy-29': ['Semiconductors', 'p-n Junction', 'Diodes', 'Logic Gates', 'Transistors', 'LED', 'Zener'],

  // Chemistry aliases
  'chem-1': ['Mole Concept', 'Stoichiometry', 'Molarity', 'Molality', 'Empirical Formula'],
  'chem-2': ['Quantum Numbers', 'Bohr Model', 'Photoelectric', 'Electronic Configuration', 'Heisenberg'],
  'chem-3': ['VSEPR', 'Hybridisation', 'Molecular Orbital Theory', 'MOT', 'Dipole Moment', 'Hydrogen Bonding'],
  'chem-4': ['Thermodynamics', 'Enthalpy', 'Entropy', 'Gibbs Free Energy', 'Thermochemistry', 'Hess Law'],
  'chem-5': ['Colligative Properties', 'Raoults Law', 'Van’t Hoff Factor', 'Vapour Pressure', 'Osmotic Pressure'],
  'chem-6': ['Chemical Equilibrium', 'Ionic Equilibrium', 'pH', 'Buffer Solution', 'Solubility Product', 'Ksp'],
  'chem-7': ['Redox', 'Oxidation Number', 'Oxidation State', 'Balancing Equations', 'Half Reaction'],
  'chem-8': ['Nernst Equation', 'Galvanic Cell', 'Electrolytic Cell', 'Kohlrausch Law', 'Faraday Laws', 'EMF'],
  'chem-9': ['Rate of Reaction', 'Order of Reaction', 'Arrhenius Equation', 'Activation Energy', 'First Order'],
  'chem-10': ['Periodic Table', 'Ionisation Enthalpy', 'Electronegativity', 'Electron Affinity', 'Atomic Radii'],
  'chem-11': ['Group 13', 'Group 14', 'Group 15', 'Group 16', 'Group 17', 'Group 18', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen', 'Halogens', 'Noble Gases'],
  'chem-12': ['Transition Elements', 'd Block', 'f Block', 'Lanthanoids', 'Actinoids', 'KMnO4', 'K2Cr2O7'],
  'chem-13': ['Werner Theory', 'Ligands', 'Crystal Field Theory', 'CFT', 'Isomerism in Complexes', 'IUPAC Naming'],
  'chem-14': ['Qualitative Analysis', 'Chromatography', 'Distillation', 'Crystallisation', 'Kjeldahl Method'],
  'chem-15': ['GOC', 'General Organic Chemistry', 'Inductive Effect', 'Resonance', 'Hyperconjugation', 'Isomerism', 'Carbocation'],
  'chem-16': ['Alkanes', 'Alkenes', 'Alkynes', 'Aromatic Hydrocarbons', 'Benzene', 'Electrophilic Aromatic Substitution'],
  'chem-17': ['Haloalkanes', 'Haloarenes', 'Alkyl Halides', 'SN1', 'SN2', 'Elimination Reactions'],
  'chem-18': ['Organic Compounds Containing Oxygen', 'Oxygen Compounds', 'Alcohols', 'Phenols', 'Ethers', 'Reimer Tiemann', 'Kolbe Reaction'],
  'chem-19': ['Organic Compounds Containing Oxygen', 'Carbonyl Compounds', 'Aldehydes', 'Ketones', 'Carboxylic Acids', 'Aldol', 'Cannizzaro', 'Clemmensen'],
  'chem-20': ['Amines', 'Diazonium Salts', 'Hoffmann Bromamide', 'Carbylamine Test', 'Gabriel Phthalimide'],
  'chem-21': ['Carbohydrates', 'Proteins', 'Amino Acids', 'Nucleic Acids', 'DNA', 'RNA', 'Vitamins'],
  'chem-22': ['Salt Analysis', 'Titration', 'Lab Tests', 'Functional Group Tests', 'Cations and Anions'],

  // Mathematics aliases
  'math-1': ['Set Theory', 'Subsets', 'Venn Diagrams', 'Power Set', 'Cartesian Product'],
  'math-2': ['Domain', 'Range', 'Composite Functions', 'One-One', 'Onto', 'Invertible Functions'],
  'math-3': ['Argand Plane', 'Modulus', 'Argument', 'Cube Roots of Unity', 'De Moivre Theorem'],
  'math-4': ['Roots', 'Discriminant', 'Nature of Roots', 'Common Roots', 'Location of Roots'],
  'math-5': ['Matrix Operations', 'Transpose', 'Symmetric Matrix', 'Inverse of Matrix', 'Matrix Multiplication'],
  'math-6': ['Determinant Properties', 'Cramers Rule', 'Minors', 'Cofactors', 'System of Linear Equations'],
  'math-7': ['Permutations', 'Combinations', 'P and C', 'Arrangements', 'Selections', 'Principle of Counting'],
  'math-8': ['Binomial Theorem', 'General Term', 'Middle Term', 'Binomial Coefficients'],
  'math-9': ['Arithmetic Progression', 'AP', 'Geometric Progression', 'GP', 'Harmonic Progression', 'HP', 'AGP', 'Series Sum'],
  'math-10': ['Principle of Mathematical Induction', 'PMI', 'Inductive Step'],
  'math-11': ['Limits', 'L’Hopital Rule', 'Continuity', 'Differentiability', 'Left and Right Hand Derivatives'],
  'math-12': ['AOD', 'Maxima and Minima', 'Increasing Decreasing', 'Tangents and Normals', 'Rate Measure', 'Monotonicity'],
  'math-13': ['Integration by Substitution', 'Integration by Parts', 'Partial Fractions', 'Standard Integrals'],
  'math-14': ['Definite Integrals', 'Properties of Definite Integrals', 'Leibnitz Rule', 'Area Under Curve', 'AUC'],
  'math-15': ['Variable Separable', 'Homogeneous Differential Equations', 'Linear Differential Equations', 'Integrating Factor'],
  'math-16': ['Dot Product', 'Cross Product', 'Scalar Triple Product', 'Vector Triple Product', 'Vectors'],
  'math-17': ['3D Geometry', 'Direction Cosines', 'Direction Ratios', 'Line in 3D', 'Plane', 'Shortest Distance'],
  'math-18': ['Straight Lines', 'Slope', 'Intercept Form', 'Distance of Point from Line', 'Pair of Straight Lines'],
  'math-19': ['Circles', 'Equation of Circle', 'Tangent to Circle', 'Normal to Circle', 'Family of Circles'],
  'math-20': ['Parabola', 'Focus', 'Directrix', 'Latus Rectum', 'Tangent to Parabola'],
  'math-21': ['Ellipse', 'Eccentricity', 'Foci', 'Major Axis', 'Minor Axis', 'Tangent to Ellipse'],
  'math-22': ['Hyperbola', 'Asymptotes', 'Rectangular Hyperbola', 'Conjugate Hyperbola'],
  'math-23': ['Trigonometry', 'Trigonometric Identities', 'Compound Angles', 'Multiple Angles', 'Submultiple Angles'],
  'math-24': ['ITF', 'Inverse Trigonometry', 'Principal Value Branch', 'Properties of ITF'],
  'math-25': ['General Solution', 'Principal Solution', 'Trig Equations'],
  'math-26': ['Conic Sections Miscellaneous', 'Coordinate Geometry Mixed Practice'],
  'math-27': ['Mean', 'Median', 'Mode', 'Variance', 'Standard Deviation'],
  'math-28': ['Conditional Probability', 'Bayes Theorem', 'Independent Events', 'Binomial Distribution'],
  'math-29': ['Vectors and 3D Miscellaneous', 'Geometry Mixed Practice'],
};

export const MASTER_SYLLABUS: Chapter[] = [
  ...PHYSICS_CHAPTERS.map((name, index) => {
    const id = `phy-${index + 1}`;
    return {
      id,
      name,
      subject: 'physics' as Subject,
      order: index + 1,
      stageLabels: physicsStageLabels,
      stageDescriptions: physicsStageDescriptions,
      questionCounts: standardCounts,
      aliases: CHAPTER_ALIASES[id] || [],
    };
  }),
  ...CHEMISTRY_CHAPTERS.map((name, index) => {
    const id = `chem-${index + 1}`;
    return {
      id,
      name,
      subject: 'chemistry' as Subject,
      order: index + 1,
      stageLabels: chemStageLabels,
      stageDescriptions: chemStageDescriptions,
      questionCounts: standardCounts,
      aliases: CHAPTER_ALIASES[id] || [],
    };
  }),
  ...MATHEMATICS_CHAPTERS.map((name, index) => {
    const id = `math-${index + 1}`;
    return {
      id,
      name,
      subject: 'mathematics' as Subject,
      order: index + 1,
      stageLabels: mathStageLabels,
      stageDescriptions: mathStageDescriptions,
      questionCounts: standardCounts,
      aliases: CHAPTER_ALIASES[id] || [],
    };
  }),
];

export const CHAPTER_BY_ID = new Map<string, Chapter>(
  MASTER_SYLLABUS.map((ch) => [ch.id, ch])
);

export function getChapterById(id: string): Chapter | undefined {
  return CHAPTER_BY_ID.get(id);
}

export function getChaptersBySubject(subject: Subject): Chapter[] {
  return MASTER_SYLLABUS.filter((ch) => ch.subject === subject);
}

export interface SubjectConfig {
  name: string;
  shortName: string;
  subject: Subject;
  pastelAccent: string;
  lightBg: string;
  darkBg: string;
  lightBorder: string;
  darkBorder: string;
  badgeBg: string;
  badgeText: string;
  cardActiveBorder: string;
  emptyDropBorder: string;
}

export const SUBJECT_CONFIGS: Record<Subject, SubjectConfig> = {
  physics: {
    name: 'Physics',
    shortName: 'Physics',
    subject: 'physics',
    pastelAccent: '#58759A', // Muted slate blue
    lightBg: 'bg-[#F2F6FA]',
    darkBg: 'dark:bg-[#1C232D]',
    lightBorder: 'border-[#D4E1EE]',
    darkBorder: 'dark:border-[#2C3848]',
    badgeBg: 'bg-[#E3EDF7] text-[#1D3552] dark:bg-[#223042] dark:text-[#9BBCE2] border border-[#C6DCF0] dark:border-[#384A64]',
    badgeText: 'text-[#1D3552] dark:text-[#9BBCE2]',
    cardActiveBorder: 'hover:border-[#58759A] dark:hover:border-[#7A98BF]',
    emptyDropBorder: 'border-[#B4CBE3] hover:border-[#58759A] dark:border-[#33465D] dark:hover:border-[#7A98BF] bg-[#F4F8FC] dark:bg-[#1C2533]',
  },
  chemistry: {
    name: 'Chemistry',
    shortName: 'Chemistry',
    subject: 'chemistry',
    pastelAccent: '#668A72', // Sage green
    lightBg: 'bg-[#F1F6F2]',
    darkBg: 'dark:bg-[#19241D]',
    lightBorder: 'border-[#CFE2D4]',
    darkBorder: 'dark:border-[#293D30]',
    badgeBg: 'bg-[#E1EFE4] text-[#1E4329] dark:bg-[#1E3324] dark:text-[#9ECEAE] border border-[#C5E1CC] dark:border-[#344E3D]',
    badgeText: 'text-[#1E4329] dark:text-[#9ECEAE]',
    cardActiveBorder: 'hover:border-[#668A72] dark:hover:border-[#85B393]',
    emptyDropBorder: 'border-[#B2D8BC] hover:border-[#668A72] dark:border-[#2C4434] dark:hover:border-[#85B393] bg-[#F3F9F5] dark:bg-[#1A261E]',
  },
  mathematics: {
    name: 'Mathematics',
    shortName: 'Maths',
    subject: 'mathematics',
    pastelAccent: '#8A72A6', // Soft plum
    lightBg: 'bg-[#F6F2F8]',
    darkBg: 'dark:bg-[#231C28]',
    lightBorder: 'border-[#E3D6EB]',
    darkBorder: 'dark:border-[#3D2C46]',
    badgeBg: 'bg-[#EFE5F5] text-[#3D1F57] dark:bg-[#32233B] dark:text-[#D1B5E5] border border-[#DECAE8] dark:border-[#4E3558]',
    badgeText: 'text-[#3D1F57] dark:text-[#D1B5E5]',
    cardActiveBorder: 'hover:border-[#8A72A6] dark:hover:border-[#AD93CA]',
    emptyDropBorder: 'border-[#D2BFE0] hover:border-[#8A72A6] dark:border-[#432F4D] dark:hover:border-[#AD93CA] bg-[#F7F2FA] dark:bg-[#251D2A]',
  },
};
