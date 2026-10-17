import React from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { VisionBoardHeader } from './VisionBoardHeader';
import { SubjectColumn } from './SubjectColumn';
import { CompletedSection } from './CompletedSection';

export const VisionBoardView: React.FC = () => {
  const { activeTasksBySubject, openLibrary } = usePlanner();

  return (
    <div className="relative space-y-8 sm:space-y-10">
      {/* Top Week Header & Progress Stats */}
      <VisionBoardHeader />

      {/* 3 Spacious Subject Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-start">
        <SubjectColumn
          subject="physics"
          tasks={activeTasksBySubject.physics}
          onOpenLibraryForSubject={openLibrary}
        />
        <SubjectColumn
          subject="chemistry"
          tasks={activeTasksBySubject.chemistry}
          onOpenLibraryForSubject={openLibrary}
        />
        <SubjectColumn
          subject="mathematics"
          tasks={activeTasksBySubject.mathematics}
          onOpenLibraryForSubject={openLibrary}
        />
      </div>

      {/* Completed This Week Section */}
      <CompletedSection />
    </div>
  );
};
