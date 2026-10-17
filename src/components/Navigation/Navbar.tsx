import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { AppView } from '../../types';
import { MASTER_SYLLABUS } from '../../data/syllabus';
import { SaveIndicator } from '../common/SaveIndicator';
import {
  LayoutDashboard,
  CheckSquare,
  History,
  FileText,
  Settings,
  Sun,
  Moon,
  Plus,
  Menu,
  X,
  BookOpen,
  Edit3,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    theme,
    toggleTheme,
    toggleLibrary,
    boardName,
    setIsWelcomeModalOpen,
  } = usePlanner();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: AppView; label: string; icon: React.ReactNode }> = [
    {
      id: 'vision-board',
      label: 'Vision Board',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'pcm-trackers',
      label: 'PCM Trackers',
      icon: <CheckSquare className="w-4 h-4" />,
    },
    {
      id: 'weekly-history',
      label: 'Weekly History',
      icon: <History className="w-4 h-4" />,
    },
    {
      id: 'notes',
      label: 'Notes & Formulas',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#F8F5F0]/90 dark:bg-[#1A1715]/90 backdrop-blur-md border-b border-[#E6DED4] dark:border-[#38312B] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3.5 shrink-0">
            <button
              type="button"
              onClick={() => setCurrentView('vision-board')}
              title="Go to Vision Board"
              aria-label="Go to Vision Board"
              className="w-10 h-10 rounded-2xl bg-[#C77D8A] dark:bg-[#D47984] flex items-center justify-center text-white shadow-sm shadow-[#C77D8A]/25 hover:scale-105 transition-transform duration-200 cursor-pointer focus:outline-hidden"
            >
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 group">
                <button
                  type="button"
                  onClick={() => setIsWelcomeModalOpen(true)}
                  title="Click to rename your revision board"
                  className="text-base font-bold tracking-tight text-[#302923] dark:text-[#F5EFEB] font-sans hover:text-[#C77D8A] dark:hover:text-[#D47984] transition-colors cursor-pointer text-left flex items-center gap-1.5 focus:outline-hidden"
                >
                  <span>{boardName}</span>
                  <Edit3 className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 text-[#C77D8A] dark:text-[#D47984] transition-opacity" />
                </button>
              </div>
              <span className="text-[11px] font-semibold text-[#746B63] dark:text-[#A89D95] -mt-0.5">
                JEE Main {MASTER_SYLLABUS.length}-Chapter Revision Planner
              </span>
            </div>
          </div>

          {/* Desktop Center Navigation Pills */}
          <nav className="hidden lg:flex items-center p-1.5 bg-[#F2ECE3] dark:bg-[#201C19] border border-[#E6DED4] dark:border-[#38312B] rounded-2xl shadow-2xs">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-[#2C2622] text-[#302923] dark:text-[#F5EFEB] shadow-xs font-bold'
                      : 'text-[#746B63] dark:text-[#A89D95] hover:text-[#302923] dark:hover:text-[#F5EFEB] hover:bg-white/50 dark:hover:bg-[#28221E]'
                  }`}
                >
                  <span
                    className={
                      isActive
                        ? 'text-[#C77D8A] dark:text-[#D47984]'
                        : 'text-[#8E8379] dark:text-[#8E8379]'
                    }
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <SaveIndicator />
            </div>

            {/* + Add Chapters Quick Button */}
            <button
              type="button"
              onClick={toggleLibrary}
              title={`Browse all ${MASTER_SYLLABUS.length} chapters`}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-[#C77D8A] hover:bg-[#B86F7C] dark:bg-[#D47984] dark:hover:bg-[#C77D8A] rounded-xl shadow-xs transition-all duration-150 hover:shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Add Chapters</span>
              <span className="sm:hidden">Add</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Warm Ivory Light Mode' : 'Switch to Warm Charcoal Dark Mode'}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-xl bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] text-[#746B63] dark:text-[#A89D95] hover:text-[#302923] dark:hover:text-[#F5EFEB] hover:bg-[#F2ECE3] dark:hover:bg-[#2C2622] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#E5A869]" />
              ) : (
                <Moon className="w-4 h-4 text-[#7A98BF]" />
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 rounded-xl bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] text-[#746B63] dark:text-[#A89D95] cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E6DED4] dark:border-[#38312B] bg-[#F8F5F0] dark:bg-[#1A1715] px-4 py-4 space-y-2 animate-in fade-in duration-150">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCurrentView(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-[#28221E] text-[#302923] dark:text-[#F5EFEB] shadow-xs font-bold border border-[#E6DED4] dark:border-[#3A322C]'
                      : 'text-[#746B63] dark:text-[#A89D95] hover:bg-[#F2ECE3] dark:hover:bg-[#241E1A]'
                  }`}
                >
                  <span
                    className={
                      isActive
                        ? 'text-[#C77D8A] dark:text-[#D47984]'
                        : 'text-[#8E8379] dark:text-[#8E8379]'
                    }
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#E6DED4] dark:border-[#38312B] flex items-center justify-between px-2 text-xs text-[#746B63] dark:text-[#A89D95]">
            <span>Autosave Status</span>
            <SaveIndicator />
          </div>
        </div>
      )}
    </header>
  );
};
