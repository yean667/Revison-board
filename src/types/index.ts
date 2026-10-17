export type Subject = 'physics' | 'chemistry' | 'mathematics';

export interface StageProgress {
  stage1: boolean;
  stage2: boolean;
  stage3: boolean;
  stage4: boolean;
  test: boolean;
}

export interface Chapter {
  id: string;
  name: string;
  subject: Subject;
  order: number;
  stageLabels: [string, string, string, string, string];
  stageDescriptions: [string, string, string, string, string];
  questionCounts: [number, number, number, number, number];
  aliases?: string[];
}

export type TaskStatus = 'not-started' | 'in-progress' | 'completed';

export interface WeeklyTask {
  id: string;
  chapterId: string;
  subject: Subject;
  note: string;
  status: TaskStatus;
  completed: boolean;
  completedAt?: string;
  order: number;
}

export interface WeekPlan {
  weekId: string;
  startDate: string;
  endDate: string;
  tasks: WeeklyTask[];
  notes?: string;
}

export type PCMProgressMap = Record<string, StageProgress>;
export type ChapterNotesMap = Record<string, string>;

export type AppView = 'vision-board' | 'pcm-trackers' | 'weekly-history' | 'notes' | 'settings';
export type SaveStatus = 'idle' | 'saving' | 'saved' | 'failed';
