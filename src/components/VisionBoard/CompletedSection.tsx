import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { getChapterById, SUBJECT_CONFIGS } from '../../data/syllabus';
import { formatCompletedAt } from '../../utils/dateUtils';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Atom,
  FlaskConical,
  Pi,
} from 'lucide-react';

export const CompletedSection: React.FC = () => {
  const { completedTasksThisWeek, restoreTask } = usePlanner();
  const [isExpanded, setIsExpanded] = useState(true);

  if (completedTasksThisWeek.length === 0) return null;

  const getSubjectIcon = (subject: string) => {
    if (subject === 'physics') return <Atom className="w-4 h-4 stroke-[2]" />;
    if (subject === 'chemistry') return <FlaskConical className="w-4 h-4 stroke-[2]" />;
    return <Pi className="w-4 h-4 stroke-[2.2]" />;
  };

  return (
    <div className="mt-10 pt-6 border-t border-[#E6DED4] dark:border-[#38312B]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#EEF5F0] dark:bg-[#1E2922] border border-[#CFE3D4] dark:border-[#2C4030] text-[#34593E] dark:text-[#88B894] flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#302923] dark:text-[#F5EFEB]">
              Completed This Week ({completedTasksThisWeek.length})
            </h2>
            <p className="text-[11px] text-[#746B63] dark:text-[#A89D95]">
              Chapters revised and completed for this week
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#746B63] hover:text-[#302923] dark:text-[#A89D95] dark:hover:text-[#F5EFEB] py-1.5 px-3 rounded-xl bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] hover:bg-[#F2ECE3] dark:hover:bg-[#2C2622] transition-colors cursor-pointer shadow-2xs"
        >
          <span>{isExpanded ? 'Hide completed' : 'Show completed'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Grid of completed tasks */}
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-150">
          {completedTasksThisWeek.map((task) => {
            const chapter = getChapterById(task.chapterId);
            if (!chapter) return null;
            const config = SUBJECT_CONFIGS[task.subject];

            return (
              <div
                key={task.id}
                className="group relative flex items-center justify-between p-4 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-2xl shadow-2xs hover:shadow-xs transition-all"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${config.badgeBg}`}>
                    {getSubjectIcon(task.subject)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#302923] dark:text-[#F5EFEB] truncate">
                      {chapter.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#746B63] dark:text-[#A89D95] mt-0.5">
                      <span>{config.name}</span>
                      {task.completedAt && (
                        <>
                          <span>·</span>
                          <span className="tabular-nums">
                            {formatCompletedAt(task.completedAt)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Restore button */}
                <button
                  type="button"
                  onClick={() => restoreTask(task.id)}
                  title="Restore chapter to active board"
                  aria-label={`Restore ${chapter.name}`}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#746B63] hover:text-[#C77D8A] dark:text-[#A89D95] dark:hover:text-[#D47984] hover:bg-[#FDF2F3] dark:hover:bg-[#2C191C] rounded-xl transition-all cursor-pointer border border-transparent hover:border-[#F4CDD2] dark:hover:border-[#4B2227]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Restore</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
