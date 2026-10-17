import React, { useState, useMemo, useEffect } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { MASTER_SYLLABUS, SUBJECT_CONFIGS } from '../../data/syllabus';
import { Subject, Chapter } from '../../types';
import {
  Search,
  X,
  GripVertical,
  Plus,
  Check,
  Atom,
  FlaskConical,
  Pi,
  BookOpen,
} from 'lucide-react';

interface ChapterLibraryProps {
  filterSubject?: Subject | 'all';
  onClose?: () => void;
  isDrawer?: boolean;
}

export const ChapterLibrary: React.FC<ChapterLibraryProps> = ({
  filterSubject = 'all',
  onClose,
  isDrawer = false,
}) => {
  const { currentPlan, addChapterToCurrentWeek, setSelectedChapter } = usePlanner();
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>(filterSubject);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (filterSubject) setSelectedSubject(filterSubject);
  }, [filterSubject]);

  const activeChapterIds = useMemo(
    () => new Set(currentPlan.tasks.map((t) => t.chapterId)),
    [currentPlan.tasks]
  );

  const filteredChapters = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return MASTER_SYLLABUS.filter((ch) => {
      const matchSubject =
        selectedSubject === 'all' || ch.subject === selectedSubject;
      const matchQuery =
        !q ||
        ch.name.toLowerCase().includes(q) ||
        ch.subject.toLowerCase().includes(q) ||
        ch.order.toString().includes(q) ||
        (ch.aliases && ch.aliases.some((alias) => alias.toLowerCase().includes(q)));
      return matchSubject && matchQuery;
    });
  }, [selectedSubject, searchQuery]);

  const handleDragStart = (e: React.DragEvent, chapter: Chapter) => {
    e.dataTransfer.setData('text/plain', chapter.id);
    e.dataTransfer.setData('application/chapter-id', chapter.id);
    e.dataTransfer.setData('application/chapter-subject', chapter.subject);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const getSubjectIcon = (subject: Subject) => {
    if (subject === 'physics') return <Atom className="w-3.5 h-3.5 stroke-[2]" />;
    if (subject === 'chemistry') return <FlaskConical className="w-3.5 h-3.5 stroke-[2]" />;
    return <Pi className="w-3.5 h-3.5 stroke-[2.2]" />;
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F5F0] dark:bg-[#1A1715] border-l border-[#E6DED4] dark:border-[#38312B] select-none">
      {/* Drawer Header */}
      <div className="p-6 border-b border-[#E6DED4] dark:border-[#38312B] bg-white dark:bg-[#221E1B]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FDF2F3] dark:bg-[#2B181B] text-[#C77D8A] dark:text-[#D47984] flex items-center justify-center border border-[#F4CDD2] dark:border-[#4B2227]">
              <BookOpen className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#302923] dark:text-[#F5EFEB]">
                Chapter Library
              </h3>
              <p className="text-[11px] font-semibold text-[#746B63] dark:text-[#A89D95]">
                Full {MASTER_SYLLABUS.length}-Chapter JEE Main Syllabus
              </p>
            </div>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close chapter library"
              className="p-2 text-[#746B63] hover:text-[#302923] dark:text-[#A89D95] dark:hover:text-[#F5EFEB] rounded-xl hover:bg-[#F2ECE3] dark:hover:bg-[#2C2622] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative mb-3.5">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8379]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by chapter, topic, or alias (e.g. Redox, Matrices, SHM)..."
            className="w-full pl-10 pr-8 py-2.5 text-xs rounded-2xl bg-[#F8F5F0] dark:bg-[#1A1715] border border-[#E6DED4] dark:border-[#38312B] text-[#302923] dark:text-[#F5EFEB] placeholder:text-[#8E8379] focus:outline-hidden focus:border-[#C77D8A] transition-colors font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8379] hover:text-[#302923] dark:hover:text-[#F5EFEB] text-xs font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Subject Filter Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#F2ECE3] dark:bg-[#1A1715] border border-[#E6DED4] dark:border-[#38312B] rounded-2xl text-xs font-semibold">
          {(
            [
              { id: 'all', label: `All (${MASTER_SYLLABUS.length})` },
              { id: 'physics', label: 'Physics (29)' },
              { id: 'chemistry', label: 'Chem (22)' },
              { id: 'mathematics', label: 'Maths (29)' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedSubject(tab.id)}
              className={`py-1.5 rounded-xl text-center transition-all cursor-pointer truncate ${
                selectedSubject === tab.id
                  ? 'bg-white dark:bg-[#2C2622] text-[#302923] dark:text-[#F5EFEB] shadow-2xs font-bold'
                  : 'text-[#746B63] dark:text-[#A89D95] hover:text-[#302923] dark:hover:text-[#F5EFEB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters list */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
        {filteredChapters.map((ch) => {
          const isAdded = activeChapterIds.has(ch.id);
          const config = SUBJECT_CONFIGS[ch.subject];

          return (
            <div
              key={ch.id}
              draggable
              onDragStart={(e) => handleDragStart(e, ch)}
              className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-grab active:cursor-grabbing ${
                isAdded
                  ? 'bg-[#F2ECE3] dark:bg-[#26211D] border-[#E6DED4] dark:border-[#3A322C]'
                  : 'bg-white dark:bg-[#221E1B] border-[#E6DED4] dark:border-[#38312B] hover:border-[#D4C9BC] dark:hover:border-[#4E433A] hover:shadow-2xs'
              }`}
            >
              <div
                onClick={() => setSelectedChapter(ch)}
                className="flex items-center gap-3 min-w-0 flex-1 pr-2 cursor-pointer"
              >
                <GripVertical className="w-4 h-4 text-[#A89D95] dark:text-[#6E635C] group-hover:text-[#52473E] dark:group-hover:text-[#EDE6E1] shrink-0 transition-colors" />
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${config.badgeBg}`}
                >
                  {getSubjectIcon(ch.subject)}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#302923] dark:text-[#F5EFEB] truncate block group-hover:text-[#C77D8A] dark:group-hover:text-[#D47984] transition-colors">
                    {ch.name}
                  </span>
                  <span className="text-[10px] font-semibold text-[#746B63] dark:text-[#A89D95]">
                    {config.name} · Chapter {ch.order}
                  </span>
                </div>
              </div>

              {/* Add button or Added badge */}
              <button
                type="button"
                onClick={() => {
                  if (!isAdded) {
                    addChapterToCurrentWeek(ch.id);
                  }
                }}
                disabled={isAdded}
                title={isAdded ? 'Already added to this week' : 'Add to this week'}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow-2xs ${
                  isAdded
                    ? 'text-[#2D5438] dark:text-[#9ECEAE] bg-[#E1EFE4] dark:bg-[#1E3324] border border-[#C5E1CC] dark:border-[#344E3D] cursor-default'
                    : 'text-white bg-[#C77D8A] hover:bg-[#B86F7C] border border-[#C77D8A]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Add</span>
                  </>
                )}
              </button>
            </div>
          );
        })}

        {filteredChapters.length === 0 && (
          <div className="py-16 text-center text-xs font-semibold text-[#746B63] dark:text-[#A89D95]">
            No chapters match &ldquo;{searchQuery}&rdquo;. Try another topic name.
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="p-4 border-t border-[#E6DED4] dark:border-[#38312B] bg-white dark:bg-[#221E1B] text-[11px] font-medium text-center text-[#746B63] dark:text-[#A89D95]">
        Drag any chapter card directly to your board, or click <strong className="text-[#302923] dark:text-[#F5EFEB]">Add</strong>
      </div>
    </div>
  );
};
