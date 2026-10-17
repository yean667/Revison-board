import React from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { Check, Loader2, AlertCircle } from 'lucide-react';

export const SaveIndicator: React.FC = () => {
  const { saveStatus } = usePlanner();

  if (saveStatus === 'idle') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F2ECE4] dark:bg-[#221C18] border border-[#E5DFD4] dark:border-[#332A24] text-[11px] font-medium text-[#7C7066] dark:text-[#9E9289] select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B3A69A] dark:bg-[#665B52]" />
        <span>Autosave</span>
      </div>
    );
  }

  if (saveStatus === 'saving') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF0E4] dark:bg-[#2B2117] border border-[#E8D6BF] dark:border-[#423324] text-[11px] font-medium text-[#A66D29] dark:text-[#E5A869] select-none animate-pulse">
        <Loader2 className="w-3 h-3 animate-spin" />
        <span>Saving…</span>
      </div>
    );
  }

  if (saveStatus === 'failed') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FBEBED] dark:bg-[#2B181B] border border-[#F1CED3] dark:border-[#4A2429] text-[11px] font-medium text-[#C84B5B] dark:text-[#E87585] select-none">
        <AlertCircle className="w-3 h-3" />
        <span>Save failed</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EEF5F0] dark:bg-[#1A261D] border border-[#CFE3D4] dark:border-[#2C4231] text-[11px] font-medium text-[#467A53] dark:text-[#88B894] select-none">
      <Check className="w-3 h-3 stroke-[2.5]" />
      <span>Saved</span>
    </div>
  );
};
