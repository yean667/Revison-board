import React, { useState } from 'react';
import { WeeklyTask } from '../../types';
import { getChapterById, SUBJECT_CONFIGS } from '../../data/syllabus';
import { usePlanner } from '../../context/PlannerContext';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { GripVertical, Check, FileText, Trash2 } from 'lucide-react';

interface ChapterCardProps {
  task: WeeklyTask;
  index: number;
  onDragStart: (e: React.DragEvent, task: WeeklyTask, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  isDragging?: boolean;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  task,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}) => {
  const {
    completeTask,
    removeTaskFromWeek,
    openChapterDetail,
    getChapterStageProgress,
    chapterNotes,
  } = usePlanner();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const chapter = getChapterById(task.chapterId);
  const subjectConfig = SUBJECT_CONFIGS[task.subject];
  const stageStats = getChapterStageProgress(task.chapterId);
  const hasNotes = Boolean(chapterNotes[task.chapterId]?.trim());

  if (!chapter) return null;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.action-stop-propagation')) {
      return;
    }
    openChapterDetail(chapter, 'practice');
  };

  const handleNotesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openChapterDetail(chapter, 'notes');
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleDoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    completeTask(task.id);
  };

  const handleDragStartInternal = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(e, task, index);
  };

  return (
    <>
      <div
        draggable
        onDragStart={handleDragStartInternal}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          onDragOver(e, index);
        }}
        onDrop={(e) => onDrop(e, index)}
        onClick={handleCardClick}
        className={`group relative flex items-center justify-between p-4 bg-white dark:bg-[#25201C] border border-[#E6DED4] dark:border-[#3E352E] rounded-2xl shadow-2xs hover:shadow-xs transition-all duration-150 cursor-pointer ${
          subjectConfig.cardActiveBorder
        } ${isDragging ? 'opacity-40 scale-[0.98]' : 'opacity-100'}`}
      >
        {/* Left side: Grip dots + Chapter details */}
        <div className="flex items-start gap-3 min-w-0 pr-2">
          <div
            title="Drag to reorder within column"
            className="action-stop-propagation mt-0.5 text-[#B8ADA4] dark:text-[#6E635C] group-hover:text-[#52473E] dark:group-hover:text-[#EDE6E1] cursor-grab active:cursor-grabbing p-1 transition-colors shrink-0"
          >
            <GripVertical className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#302923] dark:text-[#F5EFEB] leading-snug truncate group-hover:text-[#C77D8A] dark:group-hover:text-[#D47984] transition-colors">
                {chapter.name}
              </h4>
            </div>

            {task.note ? (
              <p className="mt-1 text-xs text-[#746B63] dark:text-[#A89D95] line-clamp-1 italic font-normal">
                &ldquo;{task.note}&rdquo;
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-2 text-[11px] text-[#746B63] dark:text-[#A89D95]">
                <span className="tabular-nums font-semibold">
                  {stageStats.completedCount}/5 stages
                </span>
                <span>·</span>
                <span>
                  {stageStats.completedCount === 0
                    ? 'Ready to revise'
                    : 'Practice in progress'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Action Buttons (Notes, Remove, Done) */}
        <div className="action-stop-propagation shrink-0 ml-2 flex items-center gap-1.5">
          {/* Notes & Formulas quick button */}
          <button
            type="button"
            onClick={handleNotesClick}
            title={hasNotes ? 'View/Edit notes (Notes present)' : 'Add chapter notes & formulas'}
            aria-label={`Notes for ${chapter.name}`}
            className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
              hasNotes
                ? 'bg-[#EEF5F0] dark:bg-[#1B271E] border-[#CFE3D4] dark:border-[#2C4030] text-[#34593E] dark:text-[#9ECEAE]'
                : 'bg-white dark:bg-[#201C19] border-[#E6DED4] dark:border-[#38312B] text-[#746B63] dark:text-[#A89D95] hover:text-[#C77D8A] dark:hover:text-[#D47984] hover:bg-[#FDF2F3] dark:hover:bg-[#2B181B]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 stroke-[2]" />
          </button>

          {/* Remove from this week button */}
          <button
            type="button"
            onClick={handleRemoveClick}
            title="Remove from this week's plan"
            aria-label={`Remove ${chapter.name} from week`}
            className="w-8 h-8 rounded-xl border border-[#E6DED4] dark:border-[#38312B] hover:border-[#F4CDD2] dark:hover:border-[#52242B] bg-white dark:bg-[#201C19] hover:bg-[#FDF2F3] dark:hover:bg-[#2C191C] text-[#8E8379] hover:text-[#C84B5B] dark:text-[#877B72] dark:hover:text-[#E87585] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
          >
            <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
          </button>

          {/* Checkmark Done button */}
          <button
            type="button"
            onClick={handleDoneClick}
            title="Mark as completed this week"
            aria-label={`Mark ${chapter.name} completed for this week`}
            className="w-8 h-8 rounded-xl border-2 border-[#D4C9BC] dark:border-[#4A3F36] hover:border-[#668A72] dark:hover:border-[#85B393] hover:bg-[#EEF5F0] dark:hover:bg-[#1E2922] bg-white dark:bg-[#201C19] flex items-center justify-center transition-all cursor-pointer group/btn shadow-2xs"
          >
            <Check className="w-4 h-4 text-[#B8ADA4] dark:text-[#6E635C] group-hover/btn:text-[#4A7255] dark:group-hover/btn:text-[#85B393] transition-colors stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Confirmation Dialog for removing chapter from week */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Remove Chapter from Week?"
        message={`Remove "${chapter.name}" from this week's active revision board? Your master practice checkboxes and chapter notes will remain safely saved.`}
        confirmLabel="Remove"
        isDestructive={true}
        onConfirm={() => {
          removeTaskFromWeek(task.id);
          setShowDeleteConfirm(false);
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
};
