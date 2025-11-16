
import React, { useRef, useState } from 'react';
import { Recommendation } from '../../types.ts';
import { LightBulbIcon, PuzzlePieceIcon, SparklesIcon, DocumentArrowDownIcon } from '../icons.tsx';
import { generatePdf } from '../../lib/pdf.ts';

interface DashboardProps {
  recommendation: Recommendation;
  onReset: () => void;
}

const CompetencyMeter: React.FC<{ label: string; score: number }> = ({ label, score }) => {
  const percentage = Math.max(10, score * 100); // Ensure a minimum width for visibility
  let color = 'bg-sky-500';
  if (score > 0.8) color = 'bg-emerald-500';
  else if (score > 0.6) color = 'bg-cyan-500';

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-slate-700 capitalize">{label.replace('_', ' ')}</span>
        <span className="text-sm font-medium text-slate-500">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

const CBCDashboard: React.FC<DashboardProps> = ({ recommendation }) => {
  const { cbc_profile, recommended_activities, teacher_notes } = recommendation;
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleExport = async () => {
    if (pdfRef.current) {
      setIsPrinting(true);
      await generatePdf(pdfRef.current, "AI-Career-Navigator-CBC-Report.pdf");
      setIsPrinting(false);
    }
  };

  if (!cbc_profile) return null;

  return (
    <div ref={pdfRef} className="max-w-4xl mx-auto animate-fade-in space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Young Explorer Profile</h2>
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
        <p className="text-slate-600 max-w-2xl">Here are the amazing strengths and interests we've discovered! This is a great starting point for nurturing your child's talents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center"><SparklesIcon className="h-6 w-6 mr-3 text-yellow-500"/>Core Competencies</h3>
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
            {Object.entries(cbc_profile.competency_scores).map(([key, value]) => (
              <CompetencyMeter key={key} label={key} score={value} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center"><PuzzlePieceIcon className="h-6 w-6 mr-3 text-sky-500"/>Fun Pathways to Explore</h3>
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
            {cbc_profile.micro_pathways.map((path, i) => (
              <div key={i} className="bg-sky-50 p-4 rounded-md">
                <p className="font-bold text-sky-800">{path}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Suggested Activities</h3>
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              {recommended_activities?.map((activity, i) => <li key={i}>{activity}</li>)}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center"><LightBulbIcon className="h-6 w-6 mr-3 text-yellow-400"/>Notes for Parents & Teachers</h3>
          <div className="bg-emerald-50 border-l-4 border-emerald-400 text-emerald-800 p-6 rounded-r-lg shadow-sm">
            <p className="font-medium">{teacher_notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CBCDashboard;
