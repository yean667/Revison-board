import React, { useRef, useState, useEffect } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import {
  PHYSICS_CHAPTERS,
  CHEMISTRY_CHAPTERS,
  MATHEMATICS_CHAPTERS,
  MASTER_SYLLABUS,
} from '../../data/syllabus';
import { ConfirmDialog } from '../common/ConfirmDialog';
import {
  Moon,
  Sun,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  CheckCircle,
  Database,
  Sparkles,
  Palette,
  Edit3,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    boardName,
    setBoardName,
    theme,
    toggleTheme,
    resetToMockupData,
    clearCurrentWeek,
    exportDataJSON,
    importDataJSON,
    showToast,
  } = usePlanner();

  const [inputBoardName, setInputBoardName] = useState(boardName);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setInputBoardName(boardName);
  }, [boardName]);

  const handleSaveBoardName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputBoardName.trim()) {
      setInputBoardName('Revision Board');
      setBoardName('Revision Board');
    } else {
      setBoardName(inputBoardName.trim());
    }
  };

  const sampleSuggestions = [
    "Aru's Study Space",
    'My JEE Journey',
    'The Grind Room',
    'My Revision Corner',
    'Revision Board',
  ];

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${boardName.toLowerCase().replace(/\s+/g, '-')}-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Study backup downloaded successfully ✓', 'success');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        await importDataJSON(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-8 sm:space-y-10 max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-[#E6DED4] dark:border-[#38312B]">
        <h1 className="text-2xl font-bold tracking-tight text-[#302923] dark:text-[#F5EFEB]">
          Planner Settings & Backup
        </h1>
        <p className="text-xs text-[#746B63] dark:text-[#A89D95] mt-1 font-medium">
          Personalize your board name, customize themes, create portable study backups, or verify syllabus data.
        </p>
      </div>

      <div className="space-y-6">
        {/* Custom Board Name Card */}
        <div className="p-6 sm:p-7 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FDF2F3] dark:bg-[#2B181B] text-[#C77D8A] dark:text-[#D47984] border border-[#F4CDD2] dark:border-[#4B2227] flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#302923] dark:text-[#F5EFEB]">
                Revision Board Name
              </h3>
              <p className="text-xs text-[#746B63] dark:text-[#A89D95]">
                Personalize your workspace title. This name appears in the header and browser tab.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveBoardName} className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2.5">
              <input
                type="text"
                value={inputBoardName}
                onChange={(e) => setInputBoardName(e.target.value)}
                placeholder="e.g. Aru's Study Space"
                className="flex-1 px-4 py-2.5 text-xs font-semibold rounded-2xl bg-[#F8F5F0] dark:bg-[#1A1715] border border-[#E6DED4] dark:border-[#38312B] text-[#302923] dark:text-[#F5EFEB] placeholder:text-[#8E8379] focus:outline-hidden focus:border-[#C77D8A] transition-colors"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#C77D8A] hover:bg-[#B86F7C] dark:bg-[#D47984] dark:hover:bg-[#C77D8A] rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Save Name</span>
              </button>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-[#746B63] dark:text-[#A89D95] block mb-2">
                Quick presets:
              </span>
              <div className="flex flex-wrap gap-2">
                {sampleSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setInputBoardName(suggestion);
                      setBoardName(suggestion);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      boardName === suggestion
                        ? 'bg-[#FDF2F3] dark:bg-[#2B181B] text-[#C77D8A] dark:text-[#D47984] border-[#F4CDD2] dark:border-[#4B2227] font-bold shadow-2xs'
                        : 'bg-[#F8F5F0] dark:bg-[#251F1B] border-[#E6DED4] dark:border-[#38312B] text-[#746B63] dark:text-[#A89D95] hover:text-[#C77D8A] dark:hover:text-[#D47984]'
                    }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Theme Card */}
        <div className="p-6 sm:p-7 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FAF0E4] dark:bg-[#2B2117] text-[#9E6527] dark:text-[#E5A869] border border-[#E8D6BF] dark:border-[#423324] flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#302923] dark:text-[#F5EFEB]">
                Theme & Aesthetic
              </h3>
              <p className="text-xs text-[#746B63] dark:text-[#A89D95]">
                Choose your preferred stationery mood. Light mode is warm milky ivory, and dark mode uses warm charcoal.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Light Mode Card */}
            <div
              onClick={() => {
                if (theme !== 'light') toggleTheme();
              }}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                theme === 'light'
                  ? 'border-[#C77D8A] bg-[#FDF8F8] shadow-xs'
                  : 'border-[#E6DED4] bg-[#F8F5F0] hover:border-[#D4C9BC]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                    <Sun className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-[#302923]">
                    Warm Ivory Light
                  </span>
                </div>
                {theme === 'light' && (
                  <span className="text-[11px] font-bold text-[#C77D8A] bg-[#FDF2F3] px-2.5 py-0.5 rounded-full border border-[#F4CDD2]">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-[#746B63] leading-relaxed font-normal">
                Cozy milky cream background, warm white paper surfaces, deep espresso typography, and gentle dusty rose & sage accents.
              </p>
            </div>

            {/* Dark Mode Card */}
            <div
              onClick={() => {
                if (theme !== 'dark') toggleTheme();
              }}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                theme === 'dark'
                  ? 'border-[#D47984] bg-[#221C18] shadow-xs'
                  : 'border-[#E6DED4] dark:border-[#38312B] bg-[#1E1A17] hover:border-[#D4C9BC] dark:hover:border-[#4B3F36]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-950/60 flex items-center justify-center text-indigo-300">
                    <Moon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-[#F5EFEB]">
                    Warm Charcoal Dark
                  </span>
                </div>
                {theme === 'dark' && (
                  <span className="text-[11px] font-bold text-[#D47984] bg-[#2B181B] px-2.5 py-0.5 rounded-full border border-[#4B2227]">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-[#A89D95] leading-relaxed font-normal">
                Warm dark espresso surfaces, comforting contrast, soft pastel accents, and zero cold eye-strain.
              </p>
            </div>
          </div>
        </div>

        {/* Data Persistence, Privacy & Backups */}
        <div className="p-6 sm:p-7 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EEF5F0] dark:bg-[#1B271E] text-[#4A7255] dark:text-[#88B894] border border-[#CFE3D4] dark:border-[#2C4030] flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#302923] dark:text-[#F5EFEB]">
                Local-First Storage & Data Portability
              </h3>
              <p className="text-xs text-[#746B63] dark:text-[#A89D95]">
                No login, account, or cloud tracking required. Everything is stored directly in your browser.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F5F0] dark:bg-[#1A1715] border border-[#E6DED4] dark:border-[#38312B] text-xs space-y-1.5 leading-relaxed text-[#746B63] dark:text-[#A89D95]">
            <div className="flex items-center gap-2 font-bold text-[#302923] dark:text-[#F5EFEB]">
              <ShieldCheck className="w-4 h-4 text-[#668A72]" />
              <span>Private & Stored Locally (IndexedDB)</span>
            </div>
            <p>
              Your weekly targets, notes, and question practice ticks save instantly to this device. Clearing your browser cookies or site storage will reset your local study state. We recommend downloading a portable JSON backup periodically below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#302923] dark:text-[#F5EFEB] bg-[#F8F5F0] dark:bg-[#251F1B] hover:bg-[#F2ECE4] dark:hover:bg-[#2F2722] rounded-xl border border-[#E6DED4] dark:border-[#38312B] transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4 text-[#C77D8A] dark:text-[#D47984]" />
              <span>Export Portable JSON Backup</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#302923] dark:text-[#F5EFEB] bg-[#F8F5F0] dark:bg-[#251F1B] hover:bg-[#F2ECE4] dark:hover:bg-[#2F2722] rounded-xl border border-[#E6DED4] dark:border-[#38312B] transition-colors cursor-pointer shadow-2xs"
            >
              <Upload className="w-4 h-4 text-[#668A72] dark:text-[#85B393]" />
              <span>Import JSON Backup</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* Mockup Reset & Plan Tools */}
        <div className="p-6 sm:p-7 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FDF2F3] dark:bg-[#2B181B] text-[#C77D8A] dark:text-[#D47984] border border-[#F4CDD2] dark:border-[#4B2227] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#302923] dark:text-[#F5EFEB]">
                Sample Data & Reset
              </h3>
              <p className="text-xs text-[#746B63] dark:text-[#A89D95]">
                Restore the initial mockup sample plan or clear this week.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#C77D8A] dark:text-[#D47984] bg-[#FDF2F3] dark:bg-[#2B181B] hover:bg-[#F9E2E5] rounded-xl border border-[#F4CDD2] dark:border-[#4B2227] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restore Mockup Sample Plan</span>
            </button>

            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#C84B5B] hover:text-[#B33C4C] bg-[#F8F5F0] dark:bg-[#241D19] hover:bg-[#FDF2F3] dark:hover:bg-[#2E181B] rounded-xl border border-[#E6DED4] dark:border-[#38312B] transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Current Week Plan</span>
            </button>
          </div>
        </div>

        {/* 78-Chapter Syllabus Verification */}
        <div className="p-6 sm:p-7 bg-white dark:bg-[#221E1B] border border-[#E6DED4] dark:border-[#38312B] rounded-3xl shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EEF5F0] dark:bg-[#1B271E] text-[#4A7255] dark:text-[#88B894] border border-[#CFE3D4] dark:border-[#2C4030] flex items-center justify-center">
              <CheckCircle className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#302923] dark:text-[#F5EFEB]">
                Syllabus Verification ({MASTER_SYLLABUS.length} Chapters Total)
              </h3>
              <p className="text-xs text-[#746B63] dark:text-[#A89D95]">
                Redox Reactions and Electrochemistry separated into independent entries.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
            <div className="p-4 rounded-2xl bg-[#F4F7FB] dark:bg-[#1C222C] border border-[#D7E1EE] dark:border-[#2C3848] text-[#3D5578] dark:text-[#A7BEDE]">
              <span className="font-bold block text-sm mb-1">Physics</span>
              <span className="tabular-nums font-bold text-base">
                {PHYSICS_CHAPTERS.length} chapters
              </span>
              <p className="text-[11px] text-[#5A7398] dark:text-[#8FA4C7] mt-1">
                4 Practice Blocks (80 Qs) + 80 Qs Test
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F3F7F4] dark:bg-[#1B251F] border border-[#D1E3D6] dark:border-[#293D30] text-[#396245] dark:text-[#9ECBB0]">
              <span className="font-bold block text-sm mb-1">Chemistry</span>
              <span className="tabular-nums font-bold text-base">
                {CHEMISTRY_CHAPTERS.length} chapters
              </span>
              <p className="text-[11px] text-[#558062] dark:text-[#86B393] mt-1">
                Includes separate Redox & Electrochemistry
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F4FA] dark:bg-[#221B27] border border-[#E7D9EC] dark:border-[#3D2C46] text-[#5F436E] dark:text-[#CDAFDE]">
              <span className="font-bold block text-sm mb-1">Mathematics</span>
              <span className="tabular-nums font-bold text-base">
                {MATHEMATICS_CHAPTERS.length} chapters
              </span>
              <p className="text-[11px] text-[#7F5E90] dark:text-[#B89FCC] mt-1">
                Class, DPP, Module, PYQ + 80 Qs Test
              </p>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Restore Sample Mockup Plan?"
        message="This will restore the sample weekly plan and practice checkmarks from your original mockup image."
        confirmLabel="Restore Mockup Data"
        onConfirm={() => {
          resetToMockupData();
          setShowResetConfirm(false);
        }}
        onCancel={() => setShowResetConfirm(false)}
      />

      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Clear Current Week Plan?"
        message="This will remove all tasks from this week's active board. Your PCM practice marks and notes remain safe."
        confirmLabel="Clear Week"
        isDestructive={true}
        onConfirm={() => {
          clearCurrentWeek();
          setShowClearConfirm(false);
        }}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
};
