import React, { useState } from 'react';
import { Subject, WeeklyTask } from '../../types';
import { SUBJECT_CONFIGS, getChapterById } from '../../data/syllabus';
import { usePlanner } from '../../context/PlannerContext';
import { ChapterCard } from './ChapterCard';
import {
  Atom,
  FlaskConical,
  Pi,
  Plus,
  Box,
  Sparkles,
} from 'lucide-react';

interface SubjectColumnProps {
  subject: Subject;
  tasks: WeeklyTask[];
  onOpenLibraryForSubject: (subject: Subject) => void;
}

export const SubjectColumn: React.FC<SubjectColumnProps> = ({
  subject,
  tasks,
  onOpenLibraryForSubject,
}) => {
  const {
    addChapterToCurrentWeek,
    reorderTasks,
    showToast,
  } = usePlanner();

  const config = SUBJECT_CONFIGS[subject];
  const [isOverColumn, setIsOverColumn] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isOverColumn) setIsOverColumn(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsOverColumn(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOverColumn(false);

    const chapterId =
      e.dataTransfer.getData('text/plain') ||
      e.dataTransfer.getData('application/chapter-id');
    if (chapterId) {
      const chapter = getChapterById(chapterId);
      if (chapter) {
        if (chapter.subject !== subject) {
          showToast(
            `"${chapter.name}" belongs to ${SUBJECT_CONFIGS[chapter.subject].name}`,
            'info'
          );
          addChapterToCurrentWeek(chapterId);
          return;
        }
        addChapterToCurrentWeek(chapterId);
        return;
      }
    }

    const sourceTaskIndexStr = e.dataTransfer.getData('application/task-index');
    const sourceSubject = e.dataTransfer.getData('application/task-subject') as Subject;

    if (sourceTaskIndexStr && sourceSubject === subject) {
      const sourceIndex = parseInt(sourceTaskIndexStr, 10);
      if (!isNaN(sourceIndex) && sourceIndex !== tasks.length - 1) {
        reorderTasks(subject, sourceIndex, tasks.length - 1);
      }
    }
  };

  const handleCardDragStart = (
    e: React.DragEvent,
    _task: WeeklyTask,
    index: number
  ) => {
    setDraggingIndex(index);
    e.dataTransfer.setData('application/task-index', index.toString());
    e.dataTransfer.setData('application/task-subject', subject);
  };

  const handleCardDragOver = (e: React.DragEvent, _targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleCardDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOverColumn(false);
    setDraggingIndex(null);

    const chapterId =
      e.dataTransfer.getData('text/plain') ||
      e.dataTransfer.getData('application/chapter-id');
    if (chapterId) {
      const chapter = getChapterById(chapterId);
      if (chapter) {
        if (chapter.subject !== subject) {
          showToast(
            `"${chapter.name}" belongs to ${SUBJECT_CONFIGS[chapter.subject].name}`,
            'info'
          );
          addChapterToCurrentWeek(chapterId);
          return;
        }
        addChapterToCurrentWeek(chapterId);
        return;
      }
    }

    const sourceIndexStr = e.dataTransfer.getData('application/task-index');
    const sourceSubject = e.dataTransfer.getData('application/task-subject') as Subject;

    if (sourceIndexStr && sourceSubject === subject) {
      const sourceIndex = parseInt(sourceIndexStr, 10);
      if (!isNaN(sourceIndex) && sourceIndex !== targetIndex) {
        reorderTasks(subject, sourceIndex, targetIndex);
      }
    }
  };

  const getSubjectIcon = () => {
    if (subject === 'physics') return <Atom className="w-4 h-4 stroke-[2]" />;
    if (subject === 'chemistry') return <FlaskConical className="w-4 h-4 stroke-[2]" />;
    return <Pi className="w-4 h-4 stroke-[2.2]" />;
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col rounded-3xl p-5 sm:p-6 transition-all duration-200 border ${
        config.lightBg
      } ${config.darkBg} ${config.lightBorder} ${config.darkBorder} ${
        isOverColumn
          ? 'ring-2 ring-[#C86D78]/40 dark:ring-[#E08792]/40 scale-[1.008]'
          : 'shadow-2xs'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E6DED4]/60 dark:border-[#38312B]">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl shadow-2xs ${config.badgeBg}`}>
            {getSubjectIcon()}
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight text-[#302923] dark:text-[#F5EFEB]">
              {config.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white dark:bg-[#221E1B] text-[#746B63] dark:text-[#A89D95] tabular-nums border border-[#E6DED4] dark:border-[#38312B] shadow-2xs">
            {tasks.length} {tasks.length === 1 ? 'chapter' : 'chapters'}
          </span>

          <button
            type="button"
            onClick={() => onOpenLibraryForSubject(subject)}
            title={`Add ${config.name} chapter`}
            aria-label={`Add ${config.name} chapter`}
            className="w-8 h-8 rounded-xl bg-white dark:bg-[#221E1B] hover:bg-[#F2ECE3] dark:hover:bg-[#2C2622] text-[#302923] dark:text-[#F5EFEB] flex items-center justify-center transition-colors cursor-pointer shadow-2xs border border-[#E6DED4] dark:border-[#38312B]"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Cards container */}
      <div className="flex flex-col gap-3 min-h-[160px] flex-1">
        {tasks.map((task, idx) => (
          <ChapterCard
            key={task.id}
            task={task}
            index={idx}
            onDragStart={handleCardDragStart}
            onDragOver={handleCardDragOver}
            onDrop={handleCardDrop}
            isDragging={draggingIndex === idx}
          />
        ))}

        {/* Empty drop target area (No reduced opacity, clearly readable) */}
        <div
          onClick={() => onOpenLibraryForSubject(subject)}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed transition-all duration-150 text-center cursor-pointer ${
            tasks.length === 0 ? 'my-auto py-10' : 'mt-1 py-5'
          } ${config.emptyDropBorder}`}
        >
          <div className="w-10 h-10 mb-2.5 rounded-2xl bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] flex items-center justify-center shadow-2xs text-[#302923] dark:text-[#F5EFEB]">
            {getSubjectIcon()}
          </div>
          <span className="text-xs font-bold text-[#302923] dark:text-[#F5EFEB]">
            Drag chapters here
          </span>
          <span className="text-[11px] font-medium text-[#746B63] dark:text-[#A89D95] mt-0.5">
            from syllabus library or click to choose
          </span>
        </div>
      </div>
    </div>
  );
};
