import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import {
  MASTER_SYLLABUS,
  SUBJECT_CONFIGS,
} from '../../data/syllabus';
import { Subject } from '../../types';
import {
  Atom,
  FlaskConical,
  Pi,
  Search,
  Check,
} from 'lucide-react';

export const PCMTrackersView: React.FC = () => {
  const {
    togglePCMStage,
    getSubjectProgressStats,
    getChapterStageProgress,
    setSelectedChapter,
  } = usePlanner();

  const [activeTab, setActiveTab] = useState<Subject | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'uncompleted' | 'completed'>('all');

  const physicsStats = getSubjectProgressStats('physics');
  const chemistryStats = getSubjectProgressStats('chemistry');
  const mathStats = getSubjectProgressStats('mathematics');

  const totalQuestionsSolved =
    physicsStats.completedQuestions +
    chemistryStats.completedQuestions +
    mathStats.completedQuestions;

  const totalQuestionsMaster =
    physicsStats.totalQuestions +
    chemistryStats.totalQuestions +
    mathStats.totalQuestions;

  const totalChaptersDone =
    physicsStats.completedChapters +
    chemistryStats.completedChapters +
    mathStats.completedChapters;

  const totalChaptersOverall = MASTER_SYLLABUS.length;

  const renderSubjectTable = (subject: Subject) => {
    const config = SUBJECT_CONFIGS[subject];
    const stats = getSubjectProgressStats(subject);
    const chapters = MASTER_SYLLABUS.filter((ch) => ch.subject === subject);

    const q = searchQuery.toLowerCase().trim();
    const displayedChapters = chapters.filter((ch) => {
      const matchSearch =
        !q ||
        ch.name.toLowerCase().includes(q) ||
        ch.order.toString().includes(q) ||
        (ch.aliases && ch.aliases.some((alias) => alias.toLowerCase().includes(q)));

      const progress = getChapterStageProgress(ch.id);
      const matchStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'completed'
          ? progress.isFullyDone
          : !progress.isFullyDone;

      return matchSearch && matchStatus;
    });

    const stageLabels = chapters[0].stageLabels;

    return (
      <div
        key={subject}
        className="flex flex-col bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl overflow-hidden shadow-xs"
      >
        {/* Subject Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 border-b border-[#E6DED4] dark:border-[#38312B] bg-[#F8F5F0]/80 dark:bg-[#1A1715]/80 gap-3">
          <div className="flex items-center gap-3.5">
            <div className={`p-2.5 rounded-2xl shadow-2xs ${config.badgeBg}`}>
              {subject === 'physics' && <Atom className="w-5 h-5 stroke-[2]" />}
              {subject === 'chemistry' && <FlaskConical className="w-5 h-5 stroke-[2]" />}
              {subject === 'mathematics' && <Pi className="w-5 h-5 stroke-[2.2]" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#302923] dark:text-[#F5EFEB]">
                {config.name}
              </h3>
              <p className="text-xs font-semibold text-[#746B63] dark:text-[#A89D95]">
                {stats.totalChapters} chapters · 160 questions each
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs font-bold tabular-nums text-[#302923] dark:text-[#F5EFEB]">
                {stats.completedChapters}/{stats.totalChapters} Mastered
              </span>
              <p className="text-[11px] font-semibold text-[#746B63] dark:text-[#A89D95] tabular-nums">
                {stats.completedQuestions.toLocaleString()} / {stats.totalQuestions.toLocaleString()} Qs
              </p>
            </div>
            <div className="w-20 h-2.5 rounded-full bg-[#EAE4D8] dark:bg-[#342C26] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  backgroundColor: config.pastelAccent,
                  width: `${(stats.completedChapters / stats.totalChapters) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Spacious Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E6DED4] dark:border-[#38312B] text-[11px] font-bold text-[#746B63] dark:text-[#A89D95] uppercase tracking-wider bg-[#F8F5F0]/60 dark:bg-[#1A1715]/60">
                <th className="py-3.5 px-4 w-14 text-center">No.</th>
                <th className="py-3.5 px-4 min-w-[200px]">Chapter / Topic</th>
                <th className="py-3.5 px-2 text-center w-24">{stageLabels[0]}</th>
                <th className="py-3.5 px-2 text-center w-24">{stageLabels[1]}</th>
                <th className="py-3.5 px-2 text-center w-24">{stageLabels[2]}</th>
                <th className="py-3.5 px-2 text-center w-24">{stageLabels[3]}</th>
                <th className="py-3.5 px-2 text-center w-24">{stageLabels[4]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DED4]/60 dark:divide-[#322A24] text-xs">
              {displayedChapters.map((chapter) => {
                const stage = getChapterStageProgress(chapter.id);

                return (
                  <tr
                    key={chapter.id}
                    className="hover:bg-[#F8F5F0] dark:hover:bg-[#26211D] transition-colors group"
                  >
                    {/* No. */}
                    <td className="py-3.5 px-4 text-center font-bold tabular-nums text-[#8E8379] dark:text-[#8E8379]">
                      {chapter.order}
                    </td>

                    {/* Chapter Name */}
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => setSelectedChapter(chapter)}
                        className="font-bold text-[#302923] dark:text-[#F5EFEB] hover:text-[#C77D8A] dark:hover:text-[#D47984] transition-colors text-left cursor-pointer flex items-center gap-2"
                      >
                        <span>{chapter.name}</span>
                        {stage.isFullyDone && (
                          <span className="w-2 h-2 rounded-full bg-[#668A72] inline-block shadow-2xs" title="All 5 stages completed" />
                        )}
                      </button>
                    </td>

                    {/* Checkbox Stages 1 to 5 */}
                    {(
                      [
                        { key: 'stage1', label: stageLabels[0] },
                        { key: 'stage2', label: stageLabels[1] },
                        { key: 'stage3', label: stageLabels[2] },
                        { key: 'stage4', label: stageLabels[3] },
                        { key: 'test', label: stageLabels[4] },
                      ] as const
                    ).map((st) => {
                      const isChecked = stage[st.key];
                      return (
                        <td key={st.key} className="py-3.5 px-2 text-center">
                          <button
                            type="button"
                            onClick={() => togglePCMStage(chapter.id, st.key)}
                            aria-label={`Toggle ${chapter.name} ${st.label}`}
                            className={`w-7 h-7 mx-auto rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-[#668A72] border-[#668A72] text-white shadow-2xs'
                                : 'border-[#D4C9BC] dark:border-[#4A3F36] hover:border-[#668A72] dark:hover:border-[#85B393] bg-white dark:bg-[#201C19]'
                            }`}
                          >
                            {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {displayedChapters.length === 0 && (
          <div className="py-12 text-center text-xs font-semibold text-[#746B63] dark:text-[#A89D95]">
            No matching chapters found in {config.name}.
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E6DED4] dark:border-[#38312B]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#302923] dark:text-[#F5EFEB]">
              PCM Question Practice Trackers
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F2ECE3] dark:bg-[#2C2622] text-[#746B63] dark:text-[#A89D95] border border-[#E6DED4] dark:border-[#38312B]">
              Independent Trackers
            </span>
          </div>
          <p className="text-xs font-medium text-[#746B63] dark:text-[#A89D95] mt-1">
            Track question blocks (20 Qs) and full test stages (80 Qs) independently across all {totalChaptersOverall} chapters.
          </p>
        </div>

        {/* Global Progress Statistics */}
        <div className="flex items-center gap-6 px-6 py-3.5 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl shadow-xs tabular-nums text-xs">
          <div>
            <span className="text-[11px] font-semibold text-[#746B63] dark:text-[#A89D95] block">
              Total Questions Solved
            </span>
            <span className="text-base font-bold text-[#302923] dark:text-[#F5EFEB]">
              {totalQuestionsSolved.toLocaleString()}{' '}
              <span className="text-xs text-[#746B63] dark:text-[#A89D95] font-normal">
                / {totalQuestionsMaster.toLocaleString()}
              </span>
            </span>
          </div>
          <div className="w-[1px] h-8 bg-[#E6DED4] dark:bg-[#38312B]" />
          <div>
            <span className="text-[11px] font-semibold text-[#34593E] dark:text-[#9ECEAE] block">
              Chapters Fully Mastered
            </span>
            <span className="text-base font-bold text-[#34593E] dark:text-[#9ECEAE]">
              {totalChaptersDone}{' '}
              <span className="text-xs text-[#746B63] dark:text-[#A89D95] font-normal">/ {totalChaptersOverall}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3 Subject Quick Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          {
            subject: 'physics' as Subject,
            stats: physicsStats,
            config: SUBJECT_CONFIGS.physics,
          },
          {
            subject: 'chemistry' as Subject,
            stats: chemistryStats,
            config: SUBJECT_CONFIGS.chemistry,
          },
          {
            subject: 'mathematics' as Subject,
            stats: mathStats,
            config: SUBJECT_CONFIGS.mathematics,
          },
        ].map(({ subject, stats, config }) => {
          const percent = Math.round(
            (stats.completedQuestions / stats.totalQuestions) * 100
          );

          return (
            <div
              key={subject}
              onClick={() => setActiveTab(subject)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                activeTab === subject
                  ? 'bg-white dark:bg-[#221E1B] ring-2 ring-[#C77D8A] dark:ring-[#D47984] shadow-sm'
                  : 'bg-white dark:bg-[#221E1B] border-[#E6DED4] dark:border-[#38312B] hover:border-[#D4C9BC] dark:hover:border-[#4B3F36]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-[#302923] dark:text-[#F5EFEB]">
                  {config.name}
                </span>
                <span className="text-xs font-semibold tabular-nums text-[#746B63] dark:text-[#A89D95]">
                  {stats.completedChapters}/{stats.totalChapters} ch
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#EAE4D8] dark:bg-[#342C26] overflow-hidden mb-2.5">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: config.pastelAccent,
                    width: `${percent}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#746B63] dark:text-[#A89D95] tabular-nums font-semibold">
                <span>{stats.completedQuestions.toLocaleString()} Qs done</span>
                <span className="font-bold text-[#302923] dark:text-[#F5EFEB]">{percent}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and View toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Subject Filter Pills */}
        <div className="flex items-center p-1.5 bg-[#F2ECE3] dark:bg-[#201C19] border border-[#E6DED4] dark:border-[#38312B] rounded-2xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white dark:bg-[#2C2622] text-[#302923] dark:text-[#F5EFEB] shadow-2xs font-bold'
                : 'text-[#746B63] dark:text-[#A89D95] hover:text-[#302923] dark:hover:text-[#F5EFEB]'
            }`}
          >
            All 3 Subjects ({totalChaptersOverall})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('physics')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'physics'
                ? 'bg-white dark:bg-[#2C2622] text-[#223B59] dark:text-[#9BBCE2] shadow-2xs font-bold'
                : 'text-[#746B63] dark:text-[#A89D95] hover:text-[#223B59]'
            }`}
          >
            Physics ({physicsStats.totalChapters})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chemistry')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'chemistry'
                ? 'bg-white dark:bg-[#2C2622] text-[#1E4329] dark:text-[#9ECEAE] shadow-2xs font-bold'
                : 'text-[#746B63] dark:text-[#A89D95] hover:text-[#1E4329]'
            }`}
          >
            Chemistry ({chemistryStats.totalChapters})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mathematics')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'mathematics'
                ? 'bg-white dark:bg-[#2C2622] text-[#3D1F57] dark:text-[#D1B5E5] shadow-2xs font-bold'
                : 'text-[#746B63] dark:text-[#A89D95] hover:text-[#3D1F57]'
            }`}
          >
            Mathematics ({mathStats.totalChapters})
          </button>
        </div>

        {/* Search & Status filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8379]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters in trackers…"
              className="pl-10 pr-3.5 py-2 text-xs rounded-2xl bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] text-[#302923] dark:text-[#F5EFEB] placeholder:text-[#8E8379] focus:outline-hidden focus:border-[#C77D8A]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3.5 py-2 text-xs font-semibold rounded-2xl bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] text-[#302923] dark:text-[#F5EFEB] focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Chapters</option>
            <option value="uncompleted">Unfinished Stages</option>
            <option value="completed">All 5 Stages Completed</option>
          </select>
        </div>
      </div>

      {/* Tables Display */}
      {activeTab === 'all' ? (
        <div className="space-y-8">
          {renderSubjectTable('physics')}
          {renderSubjectTable('chemistry')}
          {renderSubjectTable('mathematics')}
        </div>
      ) : (
        <div className="w-full">{renderSubjectTable(activeTab)}</div>
      )}
    </div>
  );
};
