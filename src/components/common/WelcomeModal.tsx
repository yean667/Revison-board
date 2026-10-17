import React, { useState, useEffect } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { BookOpen, ArrowRight, X } from 'lucide-react';

export const WelcomeModal: React.FC = () => {
  const { isWelcomeModalOpen, completeWelcomeModal, boardName } = usePlanner();
  const [customName, setCustomName] = useState(boardName === 'Revision Board' ? '' : boardName);

  useEffect(() => {
    if (isWelcomeModalOpen) {
      setCustomName(boardName === 'Revision Board' ? '' : boardName);
    }
  }, [isWelcomeModalOpen, boardName]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWelcomeModalOpen) {
        completeWelcomeModal(boardName || 'Revision Board');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWelcomeModalOpen, completeWelcomeModal, boardName]);

  if (!isWelcomeModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeWelcomeModal(customName.trim() || 'Revision Board');
  };

  const sampleSuggestions = [
    "Aru's Study Space",
    'My JEE Journey',
    'The Grind Room',
    'My Revision Corner',
  ];

  return (
    <div
      onClick={() => completeWelcomeModal(boardName || 'Revision Board')}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A2420]/45 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#F8F5F0] dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200"
      >
        {/* Optional Close Button */}
        <button
          type="button"
          onClick={() => completeWelcomeModal(boardName || 'Revision Board')}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 text-[#746B63] hover:text-[#302923] dark:text-[#A89D95] dark:hover:text-[#F5EFEB] rounded-xl hover:bg-[#F2ECE3] dark:hover:bg-[#2C2622] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-3xl bg-[#FDF2F3] dark:bg-[#2B181B] text-[#C77D8A] dark:text-[#D47984] border border-[#F4CDD2] dark:border-[#4B2227] flex items-center justify-center shadow-xs">
            <BookOpen className="w-7 h-7 stroke-[2]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#302923] dark:text-[#F5EFEB] tracking-tight">
              What would you like to call your revision board?
            </h2>
            <p className="text-xs sm:text-sm text-[#746B63] dark:text-[#A89D95] max-w-sm mx-auto leading-relaxed">
              Give your study space a name that feels like yours. You can change it anytime.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              autoFocus
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Aru's Study Space"
              className="w-full px-4 py-3.5 text-sm font-semibold rounded-2xl bg-white dark:bg-[#1A1715] border-2 border-[#E6DED4] dark:border-[#38312B] text-[#302923] dark:text-[#F5EFEB] placeholder:text-[#A89D95] focus:outline-hidden focus:border-[#C77D8A] dark:focus:border-[#D47984] transition-colors shadow-2xs"
            />
          </div>

          {/* Quick Preset Ideas */}
          <div>
            <span className="text-[11px] font-semibold text-[#746B63] dark:text-[#A89D95] block mb-2">
              Popular ideas:
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setCustomName(suggestion)}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-white dark:bg-[#2C2622] border border-[#E6DED4] dark:border-[#38312B] text-[#746B63] dark:text-[#C4B9B1] hover:text-[#C77D8A] dark:hover:text-[#D47984] hover:border-[#F4CDD2] dark:hover:border-[#4B2227] transition-all cursor-pointer shadow-2xs"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
            <button
              type="button"
              onClick={() => completeWelcomeModal('Revision Board')}
              className="w-full sm:w-auto px-4 py-3 text-xs font-semibold text-[#746B63] dark:text-[#A89D95] hover:text-[#302923] dark:hover:text-[#F5EFEB] transition-colors cursor-pointer text-center"
            >
              Keep default &ldquo;Revision Board&rdquo;
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#C77D8A] hover:bg-[#B86F7C] dark:bg-[#D47984] dark:hover:bg-[#C77D8A] rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
