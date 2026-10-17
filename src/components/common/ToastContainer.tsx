import React from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = usePlanner();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success' || !toast.type;
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-md border text-xs font-semibold tracking-wide transition-all duration-200 transform translate-y-0 opacity-100 ${
              isSuccess
                ? 'bg-[#F2F7F3] dark:bg-[#1C2720] text-[#34593E] dark:text-[#A7D4B2] border-[#CBE2D1] dark:border-[#2E4736]'
                : isError
                ? 'bg-[#FDF2F3] dark:bg-[#2B181B] text-[#9E3946] dark:text-[#EFA4AD] border-[#F4CDD2] dark:border-[#4B2227]'
                : 'bg-[#F4F6FB] dark:bg-[#1E222F] text-[#485984] dark:text-[#B0BFDF] border-[#D4DDF0] dark:border-[#323B52]'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#588C66] dark:text-[#77BA88] shrink-0" />}
            {isError && <AlertTriangle className="w-4 h-4 text-[#C84B5B] dark:text-[#E87585] shrink-0" />}
            {!isSuccess && !isError && <Info className="w-4 h-4 text-[#6379AC] dark:text-[#8AA4DC] shrink-0" />}
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
