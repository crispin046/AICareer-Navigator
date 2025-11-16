
import React, { useState } from 'react';
import { UserLevel, AssessmentData, AssessmentQuestion } from '../types.ts';
import { ASSESSMENT_QUESTIONS } from '../constants.ts';

interface AssessmentScreenProps {
  level: UserLevel;
  onComplete: (data: AssessmentData) => void;
}

const AssessmentScreen: React.FC<AssessmentScreenProps> = ({ level, onComplete }) => {
  const questions = ASSESSMENT_QUESTIONS[level];
  const [answers, setAnswers] = useState<AssessmentData>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerChange = (id: string, value: string | number | string[]) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const renderInput = (q: AssessmentQuestion) => {
    switch (q.type) {
      case 'text':
        return (
          <input
            type="text"
            id={q.id}
            value={answers[q.id] as string || ''}
            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            className="w-full mt-4 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            placeholder="Type your answer here..."
          />
        );
      case 'rating':
        return (
          <input
            type="number"
            id={q.id}
            value={answers[q.id] as number || ''}
            onChange={(e) => handleAnswerChange(q.id, parseInt(e.target.value, 10))}
            className="w-full mt-4 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            min="0"
            max="20"
          />
        );
      case 'multiple-choice':
        return (
          <div className="mt-4 space-y-3">
            {q.options?.map(opt => (
              <button
                key={opt.value.toString()}
                onClick={() => handleAnswerChange(q.id, opt.value)}
                className={`w-full p-4 border rounded-lg text-left transition-all duration-200 ${answers[q.id] === opt.value ? 'bg-sky-500 text-white border-sky-500 shadow-md' : 'bg-white hover:bg-sky-50 border-slate-300'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        );
      case 'icon-select':
        return (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {q.options?.map(opt => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value.toString()}
                  onClick={() => handleAnswerChange(q.id, opt.value)}
                  className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-all duration-200 ${answers[q.id] === opt.value ? 'bg-sky-500 text-white border-sky-500 shadow-lg' : 'bg-white hover:bg-sky-50 hover:shadow-md border-slate-200'}`}
                >
                  {Icon && <Icon className="h-10 w-10" />}
                  <span className="font-medium text-sm">{opt.label}</span>
                </button>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-sky-600">Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-sky-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-slate-800">{currentQuestion.questionText}</h2>
        
        <div>{renderInput(currentQuestion)}</div>

        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
          className="w-full mt-8 px-6 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 transition-all duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish & See Results'}
        </button>
      </div>
    </div>
  );
};

export default AssessmentScreen;
