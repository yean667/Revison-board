import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { ProgressRing } from './ProgressRing';
import { ConfirmDialog } from '../common/ConfirmDialog';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Copy,
  Trash2,
} from 'lucide-react';

export const VisionBoardHeader: React.FC = () => {
  const {
    weekInfo,
    goToPrevWeek,
    goToNextWeek,
    goToCurrentWeek,
    weekStats,
    clearCurrentWeek,
    duplicatePreviousWeek,
    currentPlan,
  } = usePlanner();

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDuplicateConfirm, setShowDuplicateConfirm] = useState(false);

  const handleDuplicateClick = () => {
    if (currentPlan.tasks.length > 0) {
      setShowDuplicateConfirm(true);
    } else {
      duplicatePreviousWeek();
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E6DED4] dark:border-[#38312B]">
        {/* Left: Date navigation and titles */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] flex items-center justify-center text-[#C77D8A] dark:text-[#D47984] shadow-xs">
              <CalendarIcon className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-[#302923] dark:text-[#F5EFEB]">
                  This Week
                </h1>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F2ECE3] dark:bg-[#2C2622] text-[#746B63] dark:text-[#A89D95] border border-[#E6DED4] dark:border-[#38312B]">
                  Weekly Plan
                </span>
              </div>
              <p className="text-xs font-semibold text-[#746B63] dark:text-[#A89D95] tabular-nums mt-0.5">
                {weekInfo.formattedRange}
              </p>
            </div>
          </div>

          {/* Week Date Picker Navigator */}
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-2xl shadow-2xs">
            <button
              type="button"
              onClick={goToPrevWeek}
              title="Previous week"
              aria-label="Previous week"
              className="p-2 text-[#746B63] dark:text-[#A89D95] hover:text-[#302923] dark:hover:text-[#F5EFEB] hover:bg-[#F2ECE3] dark:hover:bg-[#2C2622] rounded-xl transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={goToCurrentWeek}
              title="Jump to current week"
              className="px-3.5 py-1.5 text-xs font-bold text-[#302923] dark:text-[#F5EFEB] hover:bg-[#F2ECE3] dark:hover:bg-[#2C2622] rounded-xl transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              type="button"
              onClick={goToNextWeek}
              title="Next week"
              aria-label="Next week"
              className="p-2 text-[#746B63] dark:text-[#A89D95] hover:text-[#302923] dark:hover:text-[#F5EFEB] hover:bg-[#F2ECE3] dark:hover:bg-[#2C2622] rounded-xl transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDuplicateClick}
              title="Copy chapters from previous week into this week"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#746B63] dark:text-[#A89D95] hover:text-[#302923] dark:hover:text-[#F5EFEB] bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] hover:bg-[#F2ECE3] dark:hover:bg-[#2C2622] rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Duplicate Last Week</span>
            </button>

            {currentPlan.tasks.length > 0 && (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                title="Clear all tasks from this week"
                aria-label="Clear all tasks from this week"
                className="p-2 text-[#8E8379] hover:text-[#C84B5B] bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] hover:bg-[#FDF2F3] dark:hover:bg-[#2C191C] rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Redesigned Progress Ring */}
        <div className="flex items-center justify-start lg:justify-end">
          <ProgressRing
            planned={weekStats.planned}
            completed={weekStats.completed}
            remaining={weekStats.remaining}
          />
        </div>
      </div>

      {/* Clear Week Dialog */}
      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Clear This Week's Plan?"
        message="This will remove all chapters from this week's active board. Your master syllabus and PCM practice records will remain untouched."
        confirmLabel="Clear Week"
        isDestructive={true}
        onConfirm={() => {
          clearCurrentWeek();
          setShowClearConfirm(false);
        }}
        onCancel={() => setShowClearConfirm(false)}
      />

      {/* Duplicate Week Dialog */}
      <ConfirmDialog
        isOpen={showDuplicateConfirm}
        title="Duplicate Previous Week?"
        message="Your current week already has planned chapters. Duplicating will copy last week's chapters as fresh uncompleted tasks for this week."
        confirmLabel="Replace & Duplicate"
        isDestructive={false}
        onConfirm={() => {
          duplicatePreviousWeek();
          setShowDuplicateConfirm(false);
        }}
        onCancel={() => setShowDuplicateConfirm(false)}
      />
    </>
  );
};
