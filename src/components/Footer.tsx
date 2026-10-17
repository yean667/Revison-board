import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto py-8 border-t border-[#E8E2D8] dark:border-[#332D28] bg-[#FAF8F5]/60 dark:bg-[#161412]/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#8C827A] dark:text-[#8E837A]">
        {/* Left: Built with love by Aru */}
        <div className="flex items-center gap-1.5" aria-label="Built with love by Aru">
          <span>Built with</span>
          <Heart className="w-3.5 h-3.5 fill-[#C86D78] text-[#C86D78] dark:fill-[#E08792] dark:text-[#E08792] inline mx-0.5" />
          <span>by</span>
          <a
            href="https://www.instagram.com/mrprofessorirl/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Aru on Instagram"
            className="font-bold text-[#2D2521] dark:text-[#EDE6E1] hover:text-[#C86D78] dark:hover:text-[#E08792] transition-colors underline decoration-[#C86D78]/30 hover:decoration-[#C86D78] underline-offset-4 cursor-pointer"
          >
            Aru
          </a>
        </div>

        {/* Right: Local storage assurance */}
        <div className="text-[11px] text-[#A3978E] dark:text-[#7A6F66]">
          Local-first study planner · 78-chapter JEE Main tracker
        </div>
      </div>
    </footer>
  );
};
