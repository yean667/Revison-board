import React, { useState, useMemo } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { MASTER_SYLLABUS, SUBJECT_CONFIGS } from '../../data/syllabus';
import { Subject } from '../../types';
import {
  FileText,
  Search,
  Atom,
  FlaskConical,
  Pi,
  BookOpen,
  Maximize2,
} from 'lucide-react';

export const NotesView: React.FC = () => {
  const { chapterNotes, setChapterNote, setSelectedChapter } = usePlanner();
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('phy-17'); // Electrostatics

  const filteredChapters = useMemo(() => {
    return MASTER_SYLLABUS.filter((ch) => {
      const matchSub =
        selectedSubject === 'all' || ch.subject === selectedSubject;
      const matchSearch =
        !searchQuery ||
        ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (chapterNotes[ch.id] &&
          chapterNotes[ch.id].toLowerCase().includes(searchQuery.toLowerCase()));
      return matchSub && matchSearch;
    });
  }, [selectedSubject, searchQuery, chapterNotes]);

  const activeChapter = useMemo(
    () => MASTER_SYLLABUS.find((ch) => ch.id === selectedChapterId) || filteredChapters[0],
    [selectedChapterId, filteredChapters]
  );

  const notesCount = useMemo(() => {
    return Object.values(chapterNotes).filter((n) => n && n.trim().length > 0).length;
  }, [chapterNotes]);

  const getSubjectIcon = (sub: Subject) => {
    if (sub === 'physics') return <Atom className="w-4 h-4 stroke-[2]" />;
    if (sub === 'chemistry') return <FlaskConical className="w-4 h-4 stroke-[2]" />;
    return <Pi className="w-4 h-4 stroke-[2.2]" />;
  };

  return (
    <div className="space-y-8 sm:space-y-10 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E6DED4] dark:border-[#38312B]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#302923] dark:text-[#F5EFEB]">
              Revision Notes & Formulas
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF0E4] dark:bg-[#2B2117] text-[#9E6527] dark:text-[#E5A869] border border-[#E8D6BF] dark:border-[#423324]">
              Study Cheatsheets
            </span>
          </div>
          <p className="text-xs text-[#746B63] dark:text-[#A89D95] mt-1 font-medium">
            Keep key equations, standard results, and revision reminders organized for all {MASTER_SYLLABUS.length} chapters.
          </p>
        </div>

        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] text-xs font-semibold text-[#302923] dark:text-[#F5EFEB] shadow-2xs tabular-nums">
          <BookOpen className="w-4 h-4 text-[#C77D8A] dark:text-[#D47984]" />
          <span>{notesCount} / {MASTER_SYLLABUS.length} Chapters with Notes</span>
        </div>
      </div>

      {/* Main split: Chapter selector on left, lined notepad on right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left column: 5 cols */}
        <div className="md:col-span-5 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl p-5 shadow-xs space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8379]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters or formulas…"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-2xl bg-[#F8F5F0] dark:bg-[#1A1715] border border-[#E6DED4] dark:border-[#38312B] text-[#302923] dark:text-[#F5EFEB] placeholder:text-[#8E8379] focus:outline-hidden focus:border-[#C77D8A]"
            />
          </div>

          {/* Subject Filter Pills */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#F2ECE3] dark:bg-[#1A1715] rounded-2xl text-xs font-semibold border border-[#E6DED4] dark:border-[#38312B]">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'physics', label: 'Physics' },
                { id: 'chemistry', label: 'Chem' },
                { id: 'mathematics', label: 'Maths' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedSubject(t.id)}
                className={`py-1.5 text-center rounded-xl transition-all cursor-pointer truncate ${
                  selectedSubject === t.id
                    ? 'bg-white dark:bg-[#2C2622] font-bold text-[#302923] dark:text-[#F5EFEB] shadow-2xs'
                    : 'text-[#746B63] dark:text-[#A89D95] hover:text-[#302923] dark:hover:text-[#F5EFEB]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Chapters list */}
          <div className="max-h-[520px] overflow-y-auto space-y-2 pr-1">
            {filteredChapters.map((ch) => {
              const isSelected = activeChapter?.id === ch.id;
              const hasNote = Boolean(chapterNotes[ch.id]?.trim());
              const config = SUBJECT_CONFIGS[ch.subject];

              return (
                <div
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FDF2F3] dark:bg-[#2B181B] border-[#C77D8A] text-[#302923] dark:text-[#F5EFEB] font-bold shadow-2xs'
                      : 'bg-[#F8F5F0] dark:bg-[#1D1917] border-[#E6DED4] dark:border-[#38312B] text-[#5C524C] dark:text-[#C4B9B1] hover:border-[#D4C9BC] dark:hover:border-[#4E433B]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${config.badgeBg}`}>
                      {getSubjectIcon(ch.subject)}
                    </div>
                    <span className="truncate font-medium">{ch.name}</span>
                  </div>

                  {hasNote && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#668A72] shrink-0 shadow-2xs" title="Has notes" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: 7 cols (Stationery Notepad) */}
        {activeChapter ? (
          <div className="md:col-span-7 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#E6DED4] dark:border-[#38312B]">
              <div className="flex items-center gap-3.5">
                <div className={`p-2.5 rounded-2xl ${SUBJECT_CONFIGS[activeChapter.subject].badgeBg}`}>
                  {getSubjectIcon(activeChapter.subject)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#302923] dark:text-[#F5EFEB]">
                    {activeChapter.name}
                  </h2>
                  <p className="text-xs font-medium text-[#746B63] dark:text-[#A89D95]">
                    {SUBJECT_CONFIGS[activeChapter.subject].name} · Chapter {activeChapter.order} of {activeChapter.subject === 'physics' ? 29 : activeChapter.subject === 'chemistry' ? 22 : 29}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedChapter(activeChapter)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-[#F8F5F0] dark:bg-[#1A1715] hover:bg-[#F2ECE3] dark:hover:bg-[#28221E] text-[#302923] dark:text-[#F5EFEB] border border-[#E6DED4] dark:border-[#38312B] transition-colors cursor-pointer shadow-2xs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Open in Sheet</span>
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#302923] dark:text-[#F5EFEB]">
                  Chapter Notes & Formulas
                </label>
                <span className="text-[11px] font-medium text-[#746B63] dark:text-[#A89D95]">
                  Autosaves on edit
                </span>
              </div>
              <textarea
                value={chapterNotes[activeChapter.id] || ''}
                onChange={(e) => setChapterNote(activeChapter.id, e.target.value)}
                rows={16}
                placeholder="Write formulas, weak topics, key equations, or revision reminders here..."
                className="w-full p-5 text-xs font-mono rounded-2xl bg-[#F8F5F0] dark:bg-[#1A1715] border border-[#E6DED4] dark:border-[#38312B] text-[#302923] dark:text-[#F5EFEB] placeholder:text-[#8E8379] focus:outline-hidden focus:border-[#C77D8A] leading-relaxed resize-y notebook-ruled"
              />
            </div>
          </div>
        ) : (
          <div className="md:col-span-7 py-24 text-center text-xs text-[#746B63] dark:text-[#A89D95]">
            Select a chapter on the left to write revision notes and formulas.
          </div>
        )}
      </div>
    </div>
  );
};
