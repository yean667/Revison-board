import {
  WeekPlan,
  PCMProgressMap,
  ChapterNotesMap,
  SaveStatus,
  WeeklyTask,
} from '../types';
import { getWeekInfo } from '../utils/dateUtils';

const DB_NAME = 'RevisionBoardDB';
const DB_VERSION = 2;
const STORE_WEEK_PLANS = 'weekPlans';
const STORE_PCM = 'pcmProgress';
const STORE_NOTES = 'chapterNotes';
const STORE_PREFS = 'preferences';

export interface AppData {
  version?: number;
  boardName?: string;
  hasSeenWelcomeModal?: boolean;
  weekPlans: Record<string, WeekPlan>;
  pcmProgress: PCMProgressMap;
  chapterNotes: ChapterNotesMap;
  theme: 'dark' | 'light';
}

type SaveListener = (status: SaveStatus) => void;
const saveListeners: Set<SaveListener> = new Set();

export function onSaveStatusChange(listener: SaveListener) {
  saveListeners.add(listener);
  return () => {
    saveListeners.delete(listener);
  };
}

function notifySaveStatus(status: SaveStatus) {
  saveListeners.forEach((fn) => fn(status));
}

// Open IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_WEEK_PLANS)) {
        db.createObjectStore(STORE_WEEK_PLANS, { keyPath: 'weekId' });
      }
      if (!db.objectStoreNames.contains(STORE_PCM)) {
        db.createObjectStore(STORE_PCM);
      }
      if (!db.objectStoreNames.contains(STORE_NOTES)) {
        db.createObjectStore(STORE_NOTES);
      }
      if (!db.objectStoreNames.contains(STORE_PREFS)) {
        db.createObjectStore(STORE_PREFS);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export function createInitialSampleData(): AppData {
  const currentWeek = getWeekInfo();
  const currentWeekId = currentWeek.weekId;

  // Initial tasks mirroring the cute mockup
  const sampleTasks: WeeklyTask[] = [
    // Physics
    {
      id: `task-1`,
      chapterId: 'phy-17', // Electrostatics
      subject: 'physics',
      note: 'Revise notes + solve DPP',
      status: 'not-started',
      completed: false,
      order: 1,
    },
    {
      id: `task-2`,
      chapterId: 'phy-19', // Current Electricity
      subject: 'physics',
      note: 'Numericals + PYQs',
      status: 'not-started',
      completed: false,
      order: 2,
    },
    // Chemistry
    {
      id: `task-3`,
      chapterId: 'chem-8', // Electrochemistry (now separate chapter #8)
      subject: 'chemistry',
      note: 'Read theory + DPP',
      status: 'not-started',
      completed: false,
      order: 1,
    },
    {
      id: `task-4`,
      chapterId: 'chem-9', // Chemical Kinetics (now #9)
      subject: 'chemistry',
      note: 'Module + PYQs',
      status: 'in-progress',
      completed: false,
      order: 2,
    },
    {
      id: `task-5`,
      chapterId: 'chem-13', // Coordination Compounds (now #13)
      subject: 'chemistry',
      note: 'NCERT + short notes',
      status: 'not-started',
      completed: false,
      order: 3,
    },
    // Mathematics
    {
      id: `task-6`,
      chapterId: 'math-12', // Indefinite Integration (Integral Calculus)
      subject: 'mathematics',
      note: 'Examples + PYQs',
      status: 'not-started',
      completed: false,
      order: 1,
    },
    {
      id: `task-7`,
      chapterId: 'math-14', // Differential Equations
      subject: 'mathematics',
      note: 'Full module',
      status: 'not-started',
      completed: false,
      order: 2,
    },
    // Completed this week
    {
      id: `task-8`,
      chapterId: 'phy-8', // Rotational Motion
      subject: 'physics',
      note: 'Formulas & angular momentum',
      status: 'completed',
      completed: true,
      completedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      order: 3,
    },
    {
      id: `task-9`,
      chapterId: 'chem-4', // Chemical Thermodynamics
      subject: 'chemistry',
      note: 'Gibbs energy & entropy',
      status: 'completed',
      completed: true,
      completedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      order: 4,
    },
    {
      id: `task-10`,
      chapterId: 'math-24', // Trigonometric Equations
      subject: 'mathematics',
      note: 'General solutions',
      status: 'completed',
      completed: true,
      completedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      order: 3,
    },
    {
      id: `task-11`,
      chapterId: 'phy-9', // Gravitation
      subject: 'physics',
      note: 'Orbital velocity & Kepler laws',
      status: 'completed',
      completed: true,
      completedAt: new Date().toISOString(),
      order: 4,
    },
  ];

  // Initial PCM Practice Checkboxes matching mockup
  const samplePCM: PCMProgressMap = {
    // Physics
    'phy-1': { stage1: true, stage2: false, stage3: true, stage4: false, test: false },
    'phy-3': { stage1: true, stage2: false, stage3: false, stage4: false, test: false },
    'phy-5': { stage1: false, stage2: true, stage3: false, stage4: false, test: false },
    'phy-6': { stage1: true, stage2: true, stage3: false, stage4: false, test: false },
    // Chemistry
    'chem-4': { stage1: false, stage2: true, stage3: false, stage4: false, test: false },
    'chem-5': { stage1: true, stage2: false, stage3: false, stage4: false, test: false },
    'chem-7': { stage1: false, stage2: false, stage3: false, stage4: false, test: false }, // Redox Reactions
    'chem-8': { stage1: true, stage2: true, stage3: false, stage4: false, test: false }, // Electrochemistry
    // Mathematics
    'math-1': { stage1: true, stage2: true, stage3: false, stage4: false, test: false },
    'math-4': { stage1: false, stage2: false, stage3: true, stage4: false, test: false },
    'math-5': { stage1: false, stage2: true, stage3: false, stage4: false, test: false },
  };

  const sampleNotes: ChapterNotesMap = {
    'phy-17': 'Focus on Gauss Law applications and potential due to dipoles.',
    'chem-7': 'Oxidation state rules and balancing redox reactions in acidic/basic medium.',
    'chem-8': 'Remember sign conventions in Nernst equation: E = E0 - (0.0591/n) log Q.',
    'math-12': 'Review integration by parts shortcuts and substitution types.',
  };

  return {
    version: 3,
    boardName: 'Revision Board',
    hasSeenWelcomeModal: false,
    weekPlans: {
      [currentWeekId]: {
        weekId: currentWeekId,
        startDate: currentWeek.startDate.toISOString(),
        endDate: currentWeek.endDate.toISOString(),
        tasks: sampleTasks,
        notes: 'Target: Complete Electrochemistry, Matrices and Calculus PYQs with 90%+ accuracy.',
      },
    },
    pcmProgress: samplePCM,
    chapterNotes: sampleNotes,
    theme: 'light',
  };
}

// Fallback localStorage keys
const LS_DATA_KEY = 'revision_board_data_v3';
const LS_V2_KEY = 'revision_board_data_v2';
const LS_LEGACY_KEY = 'revision_board_data_v1';

/**
 * Robust Migration supporting V1 -> V2 -> V3 (separated chapters)
 */
export function migrateDataToCurrent(data: any): AppData {
  if (!data) return createInitialSampleData();

  let working = { ...data };
  const currentVersion = working.version || 1;

  if (currentVersion >= 3) {
    if (!working.boardName) working.boardName = 'Revision Board';
    if (working.hasSeenWelcomeModal === undefined) working.hasSeenWelcomeModal = true;
    if (!working.theme) working.theme = 'light';
    return working as AppData;
  }

  // 1. Migrate V1 to V2 if needed (Separating Redox & Electrochemistry)
  if (currentVersion < 2) {
    const v2Plans: Record<string, WeekPlan> = {};
    for (const [weekId, plan] of Object.entries(working.weekPlans || {})) {
      const castPlan = plan as WeekPlan;
      const updatedTasks: WeeklyTask[] = (castPlan.tasks || []).map((t) => {
        if (t.subject === 'chemistry') {
          if (t.chapterId === 'chem-7') {
            const note = (t.note || '').toLowerCase();
            if (note.includes('electro') || note.includes('nernst') || note.includes('cell') || note.includes('theory')) {
              return { ...t, chapterId: 'chem-8' };
            }
            return { ...t, chapterId: 'chem-7' };
          }
          const match = t.chapterId.match(/^chem-(\d+)$/);
          if (match) {
            const num = parseInt(match[1], 10);
            if (num >= 8) {
              return { ...t, chapterId: `chem-${num + 1}` };
            }
          }
        }
        return t;
      });
      v2Plans[weekId] = { ...castPlan, tasks: updatedTasks };
    }

    const v2PCM: PCMProgressMap = {};
    for (const [chId, p] of Object.entries((working.pcmProgress || {}) as PCMProgressMap)) {
      if (chId.startsWith('chem-')) {
        const match = chId.match(/^chem-(\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num === 7) {
            v2PCM['chem-8'] = p;
            v2PCM['chem-7'] = { stage1: false, stage2: false, stage3: false, stage4: false, test: false };
          } else if (num >= 8) {
            v2PCM[`chem-${num + 1}`] = p;
          } else {
            v2PCM[chId] = p;
          }
        } else {
          v2PCM[chId] = p;
        }
      } else {
        v2PCM[chId] = p;
      }
    }

    const v2Notes: ChapterNotesMap = {};
    for (const [chId, note] of Object.entries((working.chapterNotes || {}) as ChapterNotesMap)) {
      if (chId.startsWith('chem-')) {
        const match = chId.match(/^chem-(\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num === 7) {
            v2Notes['chem-8'] = note;
          } else if (num >= 8) {
            v2Notes[`chem-${num + 1}`] = note;
          } else {
            v2Notes[chId] = note;
          }
        } else {
          v2Notes[chId] = note;
        }
      } else {
        v2Notes[chId] = note;
      }
    }

    working.weekPlans = v2Plans;
    working.pcmProgress = v2PCM;
    working.chapterNotes = v2Notes;
    working.version = 2;
  }

  // 2. Migrate V2 to V3 (Separating Matrices & Determinants, and Alcohols & Aldehydes)
  if (working.version < 3) {
    const v3Plans: Record<string, WeekPlan> = {};
    for (const [weekId, plan] of Object.entries(working.weekPlans || {})) {
      const castPlan = plan as WeekPlan;
      const updatedTasks: WeeklyTask[] = (castPlan.tasks || []).map((t) => {
        // Maths migration: math-5 was Matrices & Determinants. Now math-5 is Matrices, math-6 is Determinants.
        // math-6+ shift by +1
        if (t.subject === 'mathematics') {
          const match = t.chapterId.match(/^math-(\d+)$/);
          if (match) {
            const num = parseInt(match[1], 10);
            if (num === 5) {
              const note = (t.note || '').toLowerCase();
              if (note.includes('determ') || note.includes('cramer')) {
                return { ...t, chapterId: 'math-6' };
              }
              return { ...t, chapterId: 'math-5' };
            } else if (num >= 6) {
              return { ...t, chapterId: `math-${num + 1}` };
            }
          }
        }

        // Chemistry migration: chem-18 was Oxygen compounds. Now chem-18 is Alcohols/Phenols/Ethers, chem-19 is Aldehydes/Ketones/Carboxylic Acids.
        // chem-19+ shift by +1
        if (t.subject === 'chemistry') {
          const match = t.chapterId.match(/^chem-(\d+)$/);
          if (match) {
            const num = parseInt(match[1], 10);
            if (num === 18) {
              const note = (t.note || '').toLowerCase();
              if (note.includes('aldehyde') || note.includes('ketone') || note.includes('carboxylic')) {
                return { ...t, chapterId: 'chem-19' };
              }
              return { ...t, chapterId: 'chem-18' };
            } else if (num >= 19) {
              return { ...t, chapterId: `chem-${num + 1}` };
            }
          }
        }
        return t;
      });
      v3Plans[weekId] = { ...castPlan, tasks: updatedTasks };
    }

    const v3PCM: PCMProgressMap = {};
    for (const [chId, p] of Object.entries((working.pcmProgress || {}) as PCMProgressMap)) {
      if (chId.startsWith('math-')) {
        const match = chId.match(/^math-(\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num === 5) {
            v3PCM['math-5'] = p;
            v3PCM['math-6'] = { stage1: false, stage2: false, stage3: false, stage4: false, test: false };
          } else if (num >= 6) {
            v3PCM[`math-${num + 1}`] = p;
          } else {
            v3PCM[chId] = p;
          }
        } else {
          v3PCM[chId] = p;
        }
      } else if (chId.startsWith('chem-')) {
        const match = chId.match(/^chem-(\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num === 18) {
            v3PCM['chem-18'] = p;
            v3PCM['chem-19'] = { stage1: false, stage2: false, stage3: false, stage4: false, test: false };
          } else if (num >= 19) {
            v3PCM[`chem-${num + 1}`] = p;
          } else {
            v3PCM[chId] = p;
          }
        } else {
          v3PCM[chId] = p;
        }
      } else {
        v3PCM[chId] = p;
      }
    }

    const v3Notes: ChapterNotesMap = {};
    for (const [chId, note] of Object.entries((working.chapterNotes || {}) as ChapterNotesMap)) {
      if (chId.startsWith('math-')) {
        const match = chId.match(/^math-(\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num >= 6) {
            v3Notes[`math-${num + 1}`] = note;
          } else {
            v3Notes[chId] = note;
          }
        } else {
          v3Notes[chId] = note;
        }
      } else if (chId.startsWith('chem-')) {
        const match = chId.match(/^chem-(\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num >= 19) {
            v3Notes[`chem-${num + 1}`] = note;
          } else {
            v3Notes[chId] = note;
          }
        } else {
          v3Notes[chId] = note;
        }
      } else {
        v3Notes[chId] = note;
      }
    }

    working.weekPlans = v3Plans;
    working.pcmProgress = v3PCM;
    working.chapterNotes = v3Notes;
    working.version = 3;
  }

  return {
    version: 3,
    boardName: working.boardName || 'Revision Board',
    hasSeenWelcomeModal: working.hasSeenWelcomeModal ?? true,
    weekPlans: working.weekPlans || {},
    pcmProgress: working.pcmProgress || {},
    chapterNotes: working.chapterNotes || {},
    theme: working.theme || 'light',
  };
}

export async function loadAppData(): Promise<AppData> {
  try {
    const db = await openDB();
    const plansTx = db.transaction(STORE_WEEK_PLANS, 'readonly');
    const plansStore = plansTx.objectStore(STORE_WEEK_PLANS);
    const allPlansReq = plansStore.getAll();

    const pcmTx = db.transaction(STORE_PCM, 'readonly');
    const pcmReq = pcmTx.objectStore(STORE_PCM).get('progress');

    const notesTx = db.transaction(STORE_NOTES, 'readonly');
    const notesReq = notesTx.objectStore(STORE_NOTES).get('notes');

    const prefsTx = db.transaction(STORE_PREFS, 'readonly');
    const themeReq = prefsTx.objectStore(STORE_PREFS).get('theme');
    const boardNameReq = prefsTx.objectStore(STORE_PREFS).get('boardName');
    const welcomeReq = prefsTx.objectStore(STORE_PREFS).get('hasSeenWelcomeModal');
    const versionReq = prefsTx.objectStore(STORE_PREFS).get('version');

    const [plans, pcm, notes, theme, boardName, welcome, version] = await Promise.all([
      new Promise<WeekPlan[]>((res) => {
        allPlansReq.onsuccess = () => res(allPlansReq.result || []);
        allPlansReq.onerror = () => res([]);
      }),
      new Promise<PCMProgressMap>((res) => {
        pcmReq.onsuccess = () => res(pcmReq.result || {});
        pcmReq.onerror = () => res({});
      }),
      new Promise<ChapterNotesMap>((res) => {
        notesReq.onsuccess = () => res(notesReq.result || {});
        notesReq.onerror = () => res({});
      }),
      new Promise<'dark' | 'light'>((res) => {
        themeReq.onsuccess = () => res(themeReq.result || 'light');
        themeReq.onerror = () => res('light');
      }),
      new Promise<string | undefined>((res) => {
        boardNameReq.onsuccess = () => res(boardNameReq.result);
        boardNameReq.onerror = () => res(undefined);
      }),
      new Promise<boolean | undefined>((res) => {
        welcomeReq.onsuccess = () => res(welcomeReq.result);
        welcomeReq.onerror = () => res(undefined);
      }),
      new Promise<number | undefined>((res) => {
        versionReq.onsuccess = () => res(versionReq.result);
        versionReq.onerror = () => res(undefined);
      }),
    ]);

    if (!plans || plans.length === 0) {
      // Check localStorage v3, v2 or legacy v1
      const lsRaw = localStorage.getItem(LS_DATA_KEY) || localStorage.getItem(LS_V2_KEY) || localStorage.getItem(LS_LEGACY_KEY);
      if (lsRaw) {
        try {
          const parsed = JSON.parse(lsRaw);
          const migrated = migrateDataToCurrent(parsed);
          await saveAllAppData(migrated);
          return migrated;
        } catch {
          // invalid
        }
      }
      // Seed default sample data for new user
      const initial = createInitialSampleData();
      await saveAllAppData(initial);
      return initial;
    }

    const weekPlansMap: Record<string, WeekPlan> = {};
    for (const plan of plans) {
      weekPlansMap[plan.weekId] = plan;
    }

    const loadedData: AppData = {
      version: version || 1,
      boardName: boardName || 'Revision Board',
      hasSeenWelcomeModal: welcome !== undefined ? welcome : false,
      weekPlans: weekPlansMap,
      pcmProgress: pcm,
      chapterNotes: notes,
      theme: theme || 'light',
    };

    const finalData = migrateDataToCurrent(loadedData);
    if (!version || version < 3) {
      await saveAllAppData(finalData);
    }
    return finalData;
  } catch (err) {
    console.warn('Falling back to localStorage for data loading', err);
    const lsRaw = localStorage.getItem(LS_DATA_KEY) || localStorage.getItem(LS_V2_KEY) || localStorage.getItem(LS_LEGACY_KEY);
    if (lsRaw) {
      try {
        const parsed = JSON.parse(lsRaw);
        return migrateDataToCurrent(parsed);
      } catch {
        // ignore
      }
    }
    const initial = createInitialSampleData();
    try {
      localStorage.setItem(LS_DATA_KEY, JSON.stringify(initial));
    } catch {
      // ignore
    }
    return initial;
  }
}

export async function saveWeekPlan(plan: WeekPlan): Promise<void> {
  notifySaveStatus('saving');
  try {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_WEEK_PLANS, 'readwrite');
      tx.objectStore(STORE_WEEK_PLANS).put(plan);
      await new Promise<void>((res, rej) => {
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      });
    } catch (e) {
      console.warn('IDB write failed, using LS', e);
    }

    updateLocalStorage((data) => {
      data.weekPlans[plan.weekId] = plan;
    });

    notifySaveStatus('saved');
  } catch (err) {
    console.error('Failed to save week plan', err);
    notifySaveStatus('failed');
    throw err;
  }
}

export async function savePCMProgress(progress: PCMProgressMap): Promise<void> {
  notifySaveStatus('saving');
  try {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_PCM, 'readwrite');
      tx.objectStore(STORE_PCM).put(progress, 'progress');
      await new Promise<void>((res, rej) => {
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      });
    } catch (e) {
      console.warn('IDB write failed, using LS', e);
    }

    updateLocalStorage((data) => {
      data.pcmProgress = progress;
    });

    notifySaveStatus('saved');
  } catch (err) {
    console.error('Failed to save PCM progress', err);
    notifySaveStatus('failed');
    throw err;
  }
}

export async function saveChapterNotes(notes: ChapterNotesMap): Promise<void> {
  notifySaveStatus('saving');
  try {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NOTES, 'readwrite');
      tx.objectStore(STORE_NOTES).put(notes, 'notes');
      await new Promise<void>((res, rej) => {
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      });
    } catch (e) {
      console.warn('IDB write failed, using LS', e);
    }

    updateLocalStorage((data) => {
      data.chapterNotes = notes;
    });

    notifySaveStatus('saved');
  } catch (err) {
    console.error('Failed to save chapter notes', err);
    notifySaveStatus('failed');
    throw err;
  }
}

export async function saveTheme(theme: 'dark' | 'light'): Promise<void> {
  try {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_PREFS, 'readwrite');
      tx.objectStore(STORE_PREFS).put(theme, 'theme');
    } catch {
      // ignore
    }
    updateLocalStorage((data) => {
      data.theme = theme;
    });
  } catch {
    // ignore
  }
}

export async function saveBoardName(name: string): Promise<void> {
  notifySaveStatus('saving');
  try {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_PREFS, 'readwrite');
      tx.objectStore(STORE_PREFS).put(name, 'boardName');
    } catch {
      // ignore
    }
    updateLocalStorage((data) => {
      data.boardName = name;
    });
    notifySaveStatus('saved');
  } catch (err) {
    console.error('Failed to save board name', err);
    notifySaveStatus('failed');
    throw err;
  }
}

export async function saveWelcomeModalSeen(seen: boolean): Promise<void> {
  try {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_PREFS, 'readwrite');
      tx.objectStore(STORE_PREFS).put(seen, 'hasSeenWelcomeModal');
    } catch {
      // ignore
    }
    updateLocalStorage((data) => {
      data.hasSeenWelcomeModal = seen;
    });
  } catch {
    // ignore
  }
}

export async function saveAllAppData(data: AppData): Promise<void> {
  notifySaveStatus('saving');
  try {
    try {
      const db = await openDB();
      const tx = db.transaction(
        [STORE_WEEK_PLANS, STORE_PCM, STORE_NOTES, STORE_PREFS],
        'readwrite'
      );
      const plansStore = tx.objectStore(STORE_WEEK_PLANS);
      plansStore.clear();
      for (const p of Object.values(data.weekPlans)) {
        plansStore.put(p);
      }
      tx.objectStore(STORE_PCM).put(data.pcmProgress, 'progress');
      tx.objectStore(STORE_NOTES).put(data.chapterNotes, 'notes');
      tx.objectStore(STORE_PREFS).put(data.theme, 'theme');
      tx.objectStore(STORE_PREFS).put(data.boardName || 'Revision Board', 'boardName');
      tx.objectStore(STORE_PREFS).put(data.hasSeenWelcomeModal ?? true, 'hasSeenWelcomeModal');
      tx.objectStore(STORE_PREFS).put(2, 'version');
      await new Promise<void>((res, rej) => {
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      });
    } catch (e) {
      console.warn('IDB bulk write failed', e);
    }

    localStorage.setItem(LS_DATA_KEY, JSON.stringify(data));
    notifySaveStatus('saved');
  } catch (err) {
    console.error('Failed to save all app data', err);
    notifySaveStatus('failed');
    throw err;
  }
}

function updateLocalStorage(updater: (data: AppData) => void) {
  try {
    const raw = localStorage.getItem(LS_DATA_KEY) || localStorage.getItem(LS_LEGACY_KEY);
    const data: AppData = raw ? JSON.parse(raw) : createInitialSampleData();
    updater(data);
    localStorage.setItem(LS_DATA_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('LocalStorage update warning', e);
  }
}
