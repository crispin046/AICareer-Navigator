
import React from 'react';
import { UserLevel } from '../types.ts';
import { AcademicCapIcon, BeakerIcon, BuildingOffice2Icon, UserGroupIcon, PuzzlePieceIcon } from './icons.tsx';

interface LevelSelectorScreenProps {
  onSelect: (level: UserLevel) => void;
}

const levels: { level: UserLevel; title: string; description: string; icon: React.FC<any> }[] = [
  { level: 'Primary', title: 'Primary (Discovery)', description: 'For young explorers finding their first interests.', icon: BeakerIcon },
  { level: 'Primary_CBC', title: 'Primary (CBC)', description: 'For learners in a Competency-Based Curriculum.', icon: PuzzlePieceIcon },
  { level: 'HighSchool', title: 'High School', description: 'For students thinking about subjects and future studies.', icon: AcademicCapIcon },
  { level: 'University', title: 'University', description: 'For college students refining their career focus.', icon: BuildingOffice2Icon },
  { level: 'Adult', title: 'Career Switcher', description: 'For adults looking to change or advance their career.', icon: UserGroupIcon },
];

const LevelSelectorScreen: React.FC<LevelSelectorScreenProps> = ({ onSelect }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-2">Tell us about yourself</h2>
      <p className="text-lg text-slate-600 text-center mb-10">Choose the stage that best describes you to get a personalized assessment.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {levels.map(({ level, title, description, icon: Icon }) => (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className="group bg-white p-6 rounded-xl shadow-md border border-slate-200 text-left hover:shadow-xl hover:border-sky-500 transition-all duration-300 transform hover:-translate-y-1"
            aria-label={`Select ${title}`}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-sky-100 text-sky-600 p-3 rounded-lg">
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{title}</h3>
                <p className="text-slate-500 mt-1">{description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelectorScreen;
