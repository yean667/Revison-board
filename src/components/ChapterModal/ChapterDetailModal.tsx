import React, { useState, useEffect } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { SUBJECT_CONFIGS } from '../../data/syllabus';
import { TaskStatus } from '../../types';
import {
  X,
  Check,
  Trash2,
  Plus,
  Atom,
  FlaskConical,
  Pi,
  FileText,
  CheckSquare,
} from 'lucide-react';

export const ChapterDetailModal: React.FC = () => {
  const {
    selectedChapter,
    setSelectedChapter,
    currentPlan,
    addChapterToCurrentWeek,
    removeTaskFromWeek,
    completeTask,
    updateTaskStatus,
    updateTaskNote,
    togglePCMStage,
    getChapterStageProgress,
    chapterNotes,
    setChapterNote,
    selectedChapterTab,
    setSelectedChapterTab,
  } = usePlanner();

  const activeTab = selectedChapterTab;
  const setActiveTab = setSelectedChapterTab;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedChapter) {
        setSelectedChapter(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedChapter, setSelectedChapter]);

  if (!selectedChapter) return null;

  const config = SUBJECT_CONFIGS[selectedChapter.subject];
  const stageStats = getChapterStageProgress(selectedChapter.id);

  const currentWeekTask = currentPlan.tasks.find(
    (t) => t.chapterId === selectedChapter.id
  );

  const getSubjectIcon = () => {
    if (selectedChapter.subject === 'physics') return <Atom className="w-5 h-5 stroke-[2]" />;
    if (selectedChapter.subject === 'chemistry') return <FlaskConical className="w-5 h-5 stroke-[2]" />;
    return <Pi className="w-5 h-5 stroke-[2.2]" />;
  };

  const handleStatusChange = (status: TaskStatus) => {
    if (!currentWeekTask) {
      addChapterToCurrentWeek(selectedChapter.id);
    } else {
      updateTaskStatus(currentWeekTask.id, status);
    }
  };

  const currentNote = chapterNotes[selectedChapter.id] || '';

  return (
    <div
      onClick={() => setSelectedChapter(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A2420]/45 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E6DED4] dark:border-[#38312B] bg-[#F8F5F0] dark:bg-[#1A1715]">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${config.badgeBg}`}
            >
              {getSubjectIcon()}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-[#302923] dark:text-[#F5EFEB] truncate">
                {selectedChapter.name}
              </h3>
              <p className="text-xs font-semibold text-[#746B63] dark:text-[#A89D95]">
                {config.name} · Chapter {selectedChapter.order} of {selectedChapter.subject === 'physics' ? 29 : selectedChapter.subject === 'chemistry' ? 22 : 29}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedChapter(null)}
            aria-label="Close modal"
            className="p-2 text-[#746B63] hover:text-[#302923] dark:text-[#A89D95] dark:hover:text-[#F5EFEB] hover:bg-[#F2ECE3] dark:hover:bg-[#2C2622] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center px-6 pt-3 border-b border-[#E6DED4] dark:border-[#38312B] bg-white dark:bg-[#221E1B]">
          <button
            type="button"
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'practice'
                ? 'border-[#C77D8A] text-[#C77D8A] dark:text-[#D47984]'
                : 'border-transparent text-[#746B63] dark:text-[#A89D95] hover:text-[#302923] dark:hover:text-[#F5EFEB]'
            }`}
          >
            <CheckSquare className="w-4 h-4 stroke-[2.2]" />
            <span>Practice Tracker</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'border-[#C77D8A] text-[#C77D8A] dark:text-[#D47984]'
                : 'border-transparent text-[#746B63] dark:text-[#A89D95] hover:text-[#302923] dark:hover:text-[#F5EFEB]'
            }`}
          >
            <FileText className="w-4 h-4 stroke-[2.2]" />
            <span>Formulas & Notes</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          {activeTab === 'practice' ? (
            <div className="space-y-6">
              {/* 5 Stage Blocks */}
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-bold text-[#302923] dark:text-[#F5EFEB]">
                    Practice Stages
                  </span>
                  <span className="text-xs font-bold tabular-nums text-[#34593E] dark:text-[#9ECEAE] bg-[#EEF5F0] dark:bg-[#1E2922] px-2.5 py-0.5 rounded-full border border-[#CFE3D4] dark:border-[#2C4030]">
                    {stageStats.completedCount}/5 stages completed
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2.5">
                  {(
                    [
                      { key: 'stage1', label: selectedChapter.stageLabels[0] },
                      { key: 'stage2', label: selectedChapter.stageLabels[1] },
                      { key: 'stage3', label: selectedChapter.stageLabels[2] },
                      { key: 'stage4', label: selectedChapter.stageLabels[3] },
                      { key: 'test', label: selectedChapter.stageLabels[4] },
                    ] as const
                  ).map((st) => {
                    const isChecked = stageStats[st.key];
                    return (
                      <div
                        key={st.key}
                        onClick={() => togglePCMStage(selectedChapter.id, st.key)}
                        className={`flex flex-col items-center justify-between p-3 rounded-2xl border text-center transition-all cursor-pointer select-none ${
                          isChecked
                            ? 'bg-[#EEF5F0] dark:bg-[#1E2922] border-[#B6D8BF] dark:border-[#2E4A35] text-[#254F30] dark:text-[#9ECEAE] font-bold shadow-2xs'
                            : 'bg-[#F8F5F0] dark:bg-[#1A1715] border-[#E6DED4] dark:border-[#38312B] text-[#746B63] dark:text-[#A89D95] hover:border-[#D4C9BC] dark:hover:border-[#4B3F36]'
                        }`}
                      >
                        <span className="text-[11px] font-semibold leading-tight line-clamp-2">
                          {st.label}
                        </span>
                        <div
                          className={`mt-2.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            isChecked
                              ? 'bg-[#668A72] border-[#668A72] text-white shadow-2xs'
                              : 'border-[#D4C9BC] dark:border-[#4A3F37] bg-white dark:bg-[#221E1B]'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Weekly Plan Status */}
              <div className="pt-5 border-t border-[#E6DED4] dark:border-[#38312B]">
                <span className="text-xs font-bold text-[#302923] dark:text-[#F5EFEB] block mb-3">
                  Current Week Target Status
                </span>

                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { val: 'not-started', label: 'Not Started' },
                    { val: 'in-progress', label: 'In Progress' },
                    { val: 'completed', label: 'Completed' },
                  ].map((option) => {
                    const isCurrent =
                      currentWeekTask?.status === option.val ||
                      (!currentWeekTask && option.val === 'not-started');

                    return (
                      <button
                        key={option.val}
                        type="button"
                        onClick={() => handleStatusChange(option.val as TaskStatus)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[#FDF2F3] dark:bg-[#2B181B] border-[#C77D8A] text-[#C77D8A] dark:text-[#D47984] shadow-2xs'
                            : 'bg-[#F8F5F0] dark:bg-[#1A1715] border-[#E6DED4] dark:border-[#38312B] text-[#746B63] dark:text-[#A89D95] hover:bg-white dark:hover:bg-[#28221E]'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weekly note for this chapter */}
              {currentWeekTask && (
                <div className="pt-5 border-t border-[#E6DED4] dark:border-[#38312B]">
                  <label className="text-xs font-bold text-[#302923] dark:text-[#F5EFEB] block mb-2">
                    Weekly Note / Focus Topic
                  </label>
                  <input
                    type="text"
                    value={currentWeekTask.note}
                    onChange={(e) =>
                      updateTaskNote(currentWeekTask.id, e.target.value)
                    }
                    placeholder="e.g. Read theory, solve 30 questions, memorize key reactions"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F8F5F0] dark:bg-[#1A1715] border border-[#E6DED4] dark:border-[#38312B] text-[#302923] dark:text-[#F5EFEB] placeholder:text-[#A89D95] focus:outline-hidden focus:border-[#C77D8A] transition-colors"
                  />
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#302923] dark:text-[#F5EFEB]">
                  Chapter Notes & Formulas
                </label>
                <span className="text-[11px] font-medium text-[#746B63] dark:text-[#A89D95]">
                  Autosaves automatically
                </span>
              </div>
              <textarea
                value={currentNote}
                onChange={(e) => setChapterNote(selectedChapter.id, e.target.value)}
                rows={9}
                placeholder="Write key equations, derivations, memory shortcuts, or tricky questions here..."
                className="w-full p-4 text-xs font-mono rounded-2xl bg-[#F8F5F0] dark:bg-[#1A1715] border border-[#E6DED4] dark:border-[#38312B] text-[#302923] dark:text-[#F5EFEB] placeholder:text-[#A89D95] focus:outline-hidden focus:border-[#C77D8A] leading-relaxed resize-none notebook-ruled"
              />
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between p-6 bg-[#F8F5F0] dark:bg-[#1A1715] border-t border-[#E6DED4] dark:border-[#38312B]">
          {currentWeekTask ? (
            <>
              <button
                type="button"
                onClick={() => {
                  removeTaskFromWeek(currentWeekTask.id);
                  setSelectedChapter(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#C84B5B] hover:text-[#B33C4C] hover:bg-[#FDF2F3] dark:hover:bg-[#2B181B] rounded-xl transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove from week</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  completeTask(currentWeekTask.id);
                  setSelectedChapter(null);
                }}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#668A72] hover:bg-[#577962] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Done</span>
              </button>
            </>
          ) : (
            <div className="flex items-center justify-end w-full">
              <button
                type="button"
                onClick={() => {
                  addChapterToCurrentWeek(selectedChapter.id);
                  setSelectedChapter(null);
                }}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#C77D8A] hover:bg-[#B86F7C] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add to Current Week</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
