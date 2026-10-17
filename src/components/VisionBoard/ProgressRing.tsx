import React from 'react';

interface ProgressRingProps {
  completed: number;
  planned: number;
  remaining: number;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  completed,
  planned,
  remaining,
}) => {
  const size = 68;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = planned > 0 ? Math.min(100, Math.round((completed / planned) * 100)) : 0;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center gap-5 px-5 py-3.5 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl shadow-xs transition-colors">
      {/* Donut progress ring */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-[#E6DED4] dark:text-[#38312B]"
            fill="transparent"
          />
          {/* Progress circle (sage green for completion) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-[#668A72] dark:text-[#85B393] transition-all duration-500 ease-out"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold tabular-nums text-[#302923] dark:text-[#F5EFEB]">
            {percent}%
          </span>
          <span className="text-[9px] font-semibold text-[#746B63] dark:text-[#A89D95] -mt-0.5">
            done
          </span>
        </div>
      </div>

      {/* Numerical Stats Shelf */}
      <div className="flex items-center gap-4 text-xs tabular-nums">
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-[#746B63] dark:text-[#A89D95]">Planned</span>
          <span className="text-base font-bold text-[#302923] dark:text-[#F5EFEB]">
            {planned}
          </span>
        </div>

        <div className="w-[1px] h-7 bg-[#E6DED4] dark:bg-[#38312B]" />

        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-[#4A7255] dark:text-[#85B393]">Completed</span>
          <span className="text-base font-bold text-[#34593E] dark:text-[#9ECEAE]">
            {completed}
          </span>
        </div>

        <div className="w-[1px] h-7 bg-[#E6DED4] dark:bg-[#38312B]" />

        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-[#C77D8A] dark:text-[#D47984]">Remaining</span>
          <span className="text-base font-bold text-[#A84F5B] dark:text-[#EAA2AB]">
            {remaining}
          </span>
        </div>
      </div>
    </div>
  );
};
