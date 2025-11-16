
import React, { useState, useCallback } from 'react';
import { UserLevel, AssessmentData, Recommendation, AppScreen } from './types.ts';
import OnboardingScreen from './components/OnboardingScreen.tsx';
import LevelSelectorScreen from './components/LevelSelectorScreen.tsx';
import AssessmentScreen from './components/AssessmentScreen.tsx';
import DashboardScreen from './components/DashboardScreen.tsx';
import Header from './components/Header.tsx';
import { getRecommendation } from './lib/gemini.ts';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import { ExclamationTriangleIcon } from './components/icons.tsx';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnboardingComplete = useCallback(() => {
    setScreen('level-selector');
  }, []);

  const handleLevelSelect = useCallback((level: UserLevel) => {
    setUserLevel(level);
    setScreen('assessment');
    setError(null);
  }, []);

  const handleAssessmentComplete = useCallback(async (data: AssessmentData) => {
    setIsLoading(true);
    setError(null);
    
    let effectiveLevel = userLevel;
    // Check if the user is a high school student who wants to explore
    if (userLevel === 'HighSchool' && data.post_hs_plans === 'explore') {
      effectiveLevel = 'HighSchool_Explorer';
    }

    try {
      if (!effectiveLevel) throw new Error("User level is not set.");
      
      const result = await getRecommendation(effectiveLevel, data);
      setRecommendation(result);
      setScreen('dashboard');
    } catch (err) {
      console.error("Failed to get recommendations:", err);
      const message = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Sorry, we couldn't generate your recommendations. Please try again. (Error: ${message})`);
      setScreen('assessment'); // Stay on assessment screen to allow retry
    } finally {
      setIsLoading(false);
    }
  }, [userLevel]);

  const handleReset = useCallback(() => {
    setScreen('level-selector');
    setUserLevel(null);
    setRecommendation(null);
    setError(null);
  }, []);

  const renderScreen = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
          <p className="mt-4 text-lg font-medium text-slate-600">Analyzing your results...</p>
          <p className="mt-2 text-sm text-slate-500">Our AI is crafting your personalized career path with a focus on STEM and African growth.</p>
        </div>
      );
    }

    switch (screen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'level-selector':
        return <LevelSelectorScreen onSelect={handleLevelSelect} />;
      case 'assessment':
        if (!userLevel) return <LevelSelectorScreen onSelect={handleLevelSelect} />;
        return (
          <>
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 mr-3"/>
                {error}
              </div>
            )}
            <AssessmentScreen level={userLevel} onComplete={handleAssessmentComplete} />
          </>
        );
      case 'dashboard':
        if (!recommendation) return <LevelSelectorScreen onSelect={handleLevelSelect} />;
        return <DashboardScreen recommendation={recommendation} onReset={handleReset} />;
      default:
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header showReset={screen === 'dashboard' || screen === 'assessment'} onReset={handleReset} />
      <main className="container mx-auto px-4 py-8">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
