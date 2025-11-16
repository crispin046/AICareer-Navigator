
import React, { useState } from 'react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [consentGiven, setConsentGiven] = useState(false);

  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      <h2 className="text-4xl font-bold text-sky-600 mb-4">Welcome to Your Future</h2>
      <p className="text-lg text-slate-600 mb-8">
        The AI Career Navigator is here to help you discover your path. By answering a few simple questions, our AI will analyze your strengths and interests to suggest exciting career options for you.
      </p>
      
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <h3 className="text-2xl font-semibold mb-4">Let's Get Started</h3>
        <p className="text-slate-500 mb-6">
          To provide personalized recommendations, we need to process your answers. Your data is handled privately and securely.
        </p>
        
        <div className="flex items-center justify-center space-x-3 mb-8">
          <input
            type="checkbox"
            id="consent"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            className="h-5 w-5 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
          />
          <label htmlFor="consent" className="text-slate-700">
            I understand and agree to begin the assessment.
          </label>
        </div>

        <button
          onClick={onComplete}
          disabled={!consentGiven}
          className="w-full px-8 py-4 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 transition-all duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105"
          aria-label="Begin your journey"
        >
          Begin Your Journey
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
