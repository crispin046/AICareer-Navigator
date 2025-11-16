
import React, { useState, useRef } from 'react';
import { Recommendation, CareerMatch } from '../../types.ts';
import { ArrowTrendingUpIcon, BriefcaseIcon, CheckBadgeIcon, GlobeAltIcon, LightBulbIcon, ListBulletIcon, SparklesIcon, ChevronDownIcon, ChevronUpIcon, BuildingStorefrontIcon, ExclamationTriangleIcon, DocumentArrowDownIcon, ClockIcon, BanknotesIcon, WrenchScrewdriverIcon } from '../icons.tsx';
import OpportunityCard from './OpportunityCard.tsx';
import { generatePdf } from '../../lib/pdf.ts';

interface DashboardProps {
  recommendation: Recommendation;
  onReset: () => void;
}

const ConfidenceBadge: React.FC<{ score: number }> = ({ score }) => {
  const percentage = Math.round(score * 100);
  let colorClasses = 'bg-red-100 text-red-800';
  if (percentage > 85) {
    colorClasses = 'bg-green-100 text-green-800';
  } else if (percentage > 70) {
    colorClasses = 'bg-yellow-100 text-yellow-800';
  }
  return (
    <div className={`flex items-center space-x-1 text-xs font-medium px-2 py-0.5 rounded-full ${colorClasses}`}>
      <CheckBadgeIcon className="h-3 w-3" />
      <span>{percentage}% Fit</span>
    </div>
  );
};

const AfricaImpactBadge: React.FC<{ score: number }> = ({ score }) => {
    const percentage = Math.round(score * 100);
    let colorClasses = 'bg-blue-100 text-blue-800';
    if (percentage > 0.8) {
        colorClasses = 'bg-emerald-100 text-emerald-800';
    } else if (percentage > 0.6) {
        colorClasses = 'bg-cyan-100 text-cyan-800';
    }
    return (
      <div className={`flex items-center space-x-1 text-xs font-medium px-2 py-0.5 rounded-full ${colorClasses}`}>
        <GlobeAltIcon className="h-3 w-3" />
        <span>{percentage}% Africa Impact</span>
      </div>
    );
};

const CareerMatchCard: React.FC<{ match: CareerMatch; defaultOpen?: boolean }> = ({ match, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex justify-between items-start">
          <h4 className="text-xl font-bold text-sky-600 pr-2">{match.role}</h4>
          <div className="flex flex-col items-end space-y-1.5 flex-shrink-0">
            <ConfidenceBadge score={match.confidence} />
            <AfricaImpactBadge score={match.africa_relevance.problem_centrality_score} />
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-2">{match.impact_explanation}</p>
      </div>

      {isOpen && (
        <div className="px-6 pb-6 animate-fade-in-down">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
            <div>
              <h5 className="text-sm font-semibold text-slate-600 mb-2 flex items-center"><ClockIcon className="h-4 w-4 mr-2 text-slate-400"/>A Day in the Life:</h5>
              <ul className="list-disc list-inside space-y-1 text-slate-500 text-sm">
                {match.day_in_the_life.map((task, i) => <li key={i}>{task}</li>)}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-slate-600 mb-2 flex items-center"><BanknotesIcon className="h-4 w-4 mr-2 text-slate-400"/>Salary Range (KES):</h5>
              <p className="text-slate-500 text-sm">{match.salary_range}</p>
            </div>
            <div className="md:col-span-2">
              <h5 className="text-sm font-semibold text-slate-600 mb-2 flex items-center"><WrenchScrewdriverIcon className="h-4 w-4 mr-2 text-slate-400"/>Required Skills:</h5>
              <div className="flex flex-wrap gap-2">
                {match.required_skills.map((skill, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
          </div>
          
          {match.opportunities && match.opportunities.length > 0 && (
            <div className="border-t border-slate-200 pt-4">
              <h5 className="text-base font-bold text-slate-700 mb-3">Your Next Steps & Opportunities</h5>
              <div className="space-y-3">
                {match.opportunities.map((opp, i) => <OpportunityCard key={i} opportunity={opp} />)}
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-medium py-3 flex items-center justify-center space-x-2 border-t border-slate-200"
        aria-expanded={isOpen}
      >
        <span>{isOpen ? 'Show Less' : 'Show More Details & Opportunities'}</span>
        {isOpen ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
      </button>
    </div>
  );
};


const StandardDashboard: React.FC<DashboardProps> = ({ recommendation, onReset }) => {
  const { profile_summary, strengths, top_career_matches, action_plan, coach_tip, confidence_score } = recommendation;
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleExport = async () => {
    if (pdfRef.current) {
      setIsPrinting(true);
      await generatePdf(pdfRef.current, "AI-Career-Navigator-Report.pdf");
      setIsPrinting(false);
    }
  };

  return (
    <div ref={pdfRef} className="max-w-5xl mx-auto animate-fade-in space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-3">Your Career Profile</h2>
                <div className="flex justify-start mb-4">
                    {confidence_score && <ConfidenceBadge score={confidence_score} />}
                </div>
            </div>
            <button
                onClick={handleExport}
                disabled={isPrinting}
                className="flex items-center space-x-2 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors text-sm font-medium disabled:bg-slate-400"
                aria-label="Download Report"
            >
                <DocumentArrowDownIcon className="h-5 w-5" />
                <span>{isPrinting ? 'Generating...' : 'Download Report'}</span>
            </button>
        </div>
        <p className="text-slate-600 max-w-3xl">{profile_summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {strengths?.map((strength, i) => (
            <span key={i} className="bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1 rounded-full">{strength}</span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 flex items-center"><BriefcaseIcon className="h-6 w-6 mr-3 text-sky-500"/>Top Career Matches</h3>
        <div className="space-y-6">
          {top_career_matches && top_career_matches.length > 0 ? (
            top_career_matches.map((match, i) => <CareerMatchCard key={i} match={match} defaultOpen={i === 0} />)
          ) : (
            <div className="text-center py-12 px-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-center mb-4">
                <ExclamationTriangleIcon className="h-12 w-12 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">No Career Matches Found</h3>
              <p className="text-slate-500 mt-2 max-w-md mx-auto">
                We couldn't find specific career matches based on your answers right now. This can sometimes happen with unique combinations of interests. Please try starting over and perhaps adjusting your answers slightly.
              </p>
            </div>
          )}
        </div>
      </div>

      {action_plan && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center"><ListBulletIcon className="h-6 w-6 mr-3 text-sky-500"/>Your Action Plan</h3>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
              <div>
                <h4 className="font-bold text-slate-700">Short Term</h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-500 text-sm">
                  {action_plan.short_term.map((action, i) => <li key={i}>{action}</li>)}
                </ul>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-bold text-slate-700">Medium Term</h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-500 text-sm">
                  {action_plan.medium_term.map((action, i) => <li key={i}>{action}</li>)}
                </ul>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-bold text-slate-700">Long Term</h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-500 text-sm">
                  {action_plan.long_term.map((action, i) => <li key={i}>{action}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {coach_tip && (
            <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center"><LightBulbIcon className="h-6 w-6 mr-3 text-yellow-400"/>Coach's Tip</h3>
                <div className="bg-sky-50 border-l-4 border-sky-400 text-sky-800 p-6 rounded-r-lg shadow-sm">
                    <p className="font-medium">{coach_tip}</p>
                </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StandardDashboard;
