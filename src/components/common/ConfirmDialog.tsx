import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A2420]/45 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md p-6 sm:p-7 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl shadow-xl space-y-5 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-2xl shrink-0 ${
              isDestructive
                ? 'bg-[#FDF2F3] dark:bg-[#301B1E] text-[#C84B5B] dark:text-[#E87585] border border-[#F4CDD2] dark:border-[#52242B]'
                : 'bg-[#F2F6FA] dark:bg-[#1E2733] text-[#58759A] dark:text-[#9FB2E0] border border-[#D5DEEF] dark:border-[#343D5B]'
            }`}
          >
            <AlertCircle className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#302923] dark:text-[#F5EFEB]">
              {title}
            </h3>
            <p className="mt-1.5 text-xs font-normal text-[#746B63] dark:text-[#A89D95] leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-xs font-semibold text-[#746B63] dark:text-[#A89D95] hover:text-[#302923] dark:hover:text-[#F5EFEB] hover:bg-[#F2ECE3] dark:hover:bg-[#2C2622] rounded-xl transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl text-white transition-all shadow-xs cursor-pointer ${
              isDestructive
                ? 'bg-[#C84B5B] hover:bg-[#B33C4C]'
                : 'bg-[#C77D8A] hover:bg-[#B86F7C]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
