/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlannerProvider, usePlanner } from './context/PlannerContext';
import { Navbar } from './components/Navigation/Navbar';
import { VisionBoardView } from './components/VisionBoard/VisionBoardView';
import { PCMTrackersView } from './components/PCMTrackers/PCMTrackersView';
import { WeeklyHistoryView } from './components/WeeklyHistory/WeeklyHistoryView';
import { NotesView } from './components/Notes/NotesView';
import { SettingsView } from './components/Settings/SettingsView';
import { ChapterDetailModal } from './components/ChapterModal/ChapterDetailModal';
import { ToastContainer } from './components/common/ToastContainer';
import { WelcomeModal } from './components/common/WelcomeModal';
import { ChapterLibrary } from './components/ChapterLibrary/ChapterLibrarySidebar';
import { Footer } from './components/Footer';

const MainAppContent: React.FC = () => {
  const { currentView, isLibraryOpen, closeLibrary, librarySubjectFilter } = usePlanner();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5F0] dark:bg-[#1A1715] text-[#302923] dark:text-[#F5EFEB] transition-colors duration-200">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Spacious Content Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">
        {currentView === 'vision-board' && <VisionBoardView />}
        {currentView === 'pcm-trackers' && <PCMTrackersView />}
        {currentView === 'weekly-history' && <WeeklyHistoryView />}
        {currentView === 'notes' && <NotesView />}
        {currentView === 'settings' && <SettingsView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
      <ChapterDetailModal />
      <WelcomeModal />
      <ToastContainer />

      {/* Global Slide-Over Chapter Library Drawer */}
      {isLibraryOpen && (
        <div
          onClick={closeLibrary}
          className="fixed inset-0 z-50 flex justify-end bg-[#2A2420]/40 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md sm:max-w-lg h-full bg-[#FAF8F5] dark:bg-[#201C19] shadow-2xl animate-in slide-in-from-right duration-200"
          >
            <ChapterLibrary
              filterSubject={librarySubjectFilter}
              onClose={closeLibrary}
              isDrawer={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <PlannerProvider>
      <MainAppContent />
    </PlannerProvider>
  );
}
