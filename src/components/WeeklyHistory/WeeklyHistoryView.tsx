import React from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { getChapterById, SUBJECT_CONFIGS } from '../../data/syllabus';
import {
  Calendar,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const WeeklyHistoryView: React.FC = () => {
  const { allWeekPlans } = usePlanner();

  const planList = Object.values(allWeekPlans).sort((a, b) =>
    b.weekId.localeCompare(a.weekId)
  );

  let totalTasksOverall = 0;
  let totalCompletedOverall = 0;

  planList.forEach((plan) => {
    totalTasksOverall += plan.tasks.length;
    totalCompletedOverall += plan.tasks.filter((t) => t.completed).length;
  });

  const overallRate =
    totalTasksOverall > 0
      ? Math.round((totalCompletedOverall / totalTasksOverall) * 100)
      : 0;

  return (
    <div className="space-y-8 sm:space-y-10 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E6DED4] dark:border-[#38312B]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#302923] dark:text-[#F5EFEB]">
              Weekly Revision History
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F2ECE3] dark:bg-[#2C2622] text-[#746B63] dark:text-[#A89D95] border border-[#E6DED4] dark:border-[#38312B]">
              Study Consistency
            </span>
          </div>
          <p className="text-xs font-medium text-[#746B63] dark:text-[#A89D95] mt-1">
            Review past study weeks, completion consistency, and your preparation streak.
          </p>
        </div>

        {/* Aggregate Stats */}
        <div className="flex items-center gap-6 px-6 py-3.5 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl shadow-xs tabular-nums text-xs">
          <div>
            <span className="text-[11px] font-semibold text-[#746B63] dark:text-[#A89D95] block">
              Weeks Logged
            </span>
            <span className="text-base font-bold text-[#302923] dark:text-[#F5EFEB]">
              {planList.length}
            </span>
          </div>
          <div className="w-[1px] h-8 bg-[#E6DED4] dark:bg-[#38312B]" />
          <div>
            <span className="text-[11px] font-semibold text-[#34593E] dark:text-[#9ECEAE] block">
              Global Completion Rate
            </span>
            <span className="text-base font-bold text-[#34593E] dark:text-[#9ECEAE]">
              {overallRate}%{' '}
              <span className="text-xs text-[#746B63] dark:text-[#A89D95] font-normal">
                ({totalCompletedOverall}/{totalTasksOverall})
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Week Cards List */}
      <div className="space-y-5">
        {planList.map((plan) => {
          const completedTasks = plan.tasks.filter((t) => t.completed);
          const activeTasks = plan.tasks.filter((t) => !t.completed);
          const percent =
            plan.tasks.length > 0
              ? Math.round((completedTasks.length / plan.tasks.length) * 100)
              : 0;

          return (
            <div
              key={plan.weekId}
              className="p-6 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl shadow-xs space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FDF2F3] dark:bg-[#2B181B] text-[#C77D8A] dark:text-[#D47984] border border-[#F4CDD2] dark:border-[#4B2227] flex items-center justify-center">
                    <Calendar className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#302923] dark:text-[#F5EFEB]">
                      Week {plan.weekId}
                    </h3>
                    <p className="text-xs font-semibold text-[#746B63] dark:text-[#A89D95] tabular-nums mt-0.5">
                      {new Date(plan.startDate).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      –{' '}
                      {new Date(plan.endDate).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-xs font-semibold tabular-nums">
                  <div className="flex items-center gap-1.5 text-[#34593E] dark:text-[#9ECEAE]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{completedTasks.length} Completed</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#746B63] dark:text-[#A89D95]">
                    <Clock className="w-4 h-4" />
                    <span>{activeTasks.length} Pending</span>
                  </div>
                  <div className="w-24 h-2.5 bg-[#EAE4D8] dark:bg-[#342C26] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#668A72] rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="font-bold text-[#302923] dark:text-[#F5EFEB] text-sm">
                    {percent}%
                  </span>
                </div>
              </div>

              {/* Task badges */}
              {plan.tasks.length > 0 ? (
                <div className="flex flex-wrap gap-2.5 pt-4 border-t border-[#E6DED4]/60 dark:border-[#322A24]">
                  {plan.tasks.map((t) => {
                    const ch = getChapterById(t.chapterId);
                    if (!ch) return null;
                    const config = SUBJECT_CONFIGS[t.subject];

                    return (
                      <div
                        key={t.id}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium border ${
                          t.completed
                            ? 'bg-[#EEF5F0] dark:bg-[#1B271E] text-[#254F30] dark:text-[#9ECEAE] border-[#CFE3D4] dark:border-[#2C4030]'
                            : 'bg-[#F8F5F0] dark:bg-[#201C18] text-[#302923] dark:text-[#F5EFEB] border-[#E6DED4] dark:border-[#38312B]'
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: config.pastelAccent }}
                        />
                        <span className="font-semibold">{ch.name}</span>
                        {t.completed && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#34593E] dark:text-[#88B894]" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs italic text-[#746B63] dark:text-[#A89D95] pt-2">
                  No chapters were planned for this week.
                </p>
              )}
            </div>
          );
        })}

        {planList.length === 0 && (
          <div className="py-20 text-center text-xs font-semibold text-[#746B63] dark:text-[#A89D95]">
            No weekly plans recorded yet. Your study history will appear here as you plan weeks!
          </div>
        )}
      </div>
    </div>
  );
};
