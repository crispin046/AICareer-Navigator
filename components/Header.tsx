
import React from 'react';
import { ArrowPathIcon } from './icons.tsx';

interface HeaderProps {
  showReset?: boolean;
  onReset?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showReset = false, onReset }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-sky-500 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-800">AI Career Navigator</h1>
        </div>
        {showReset && (
          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors text-sm font-medium"
            aria-label="Start Over"
          >
            <ArrowPathIcon className="h-4 w-4" />
            <span>Start Over</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
