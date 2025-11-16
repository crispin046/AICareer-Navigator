
import React, { useRef, useState } from 'react';
import { Recommendation, ExplorerResult } from '../../types.ts';
import { ClipboardDocumentListIcon, LightBulbIcon, DocumentArrowDownIcon } from '../icons.tsx';
import { generatePdf } from '../../lib/pdf.ts';

interface DashboardProps {
  recommendation: Recommendation;
  onReset: () => void;
}

const ExplorerCard: React.FC<{ result: ExplorerResult }> = ({ result }) => (
  <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md">
    <h4 className="text-xl font-bold text-sky-600">{result.course}</h4>
    <div className="mt-4">
      <h5 className="text-sm font-semibold text-slate-500 mb-1">Leads to roles like:</h5>
      <p className="text-slate-700">{result.typical_roles.join(', ')}</p>
    </div>
    <div className="mt-3">
      <h5 className="text-sm font-semibold text-slate-500 mb-1">Typical time to first job:</h5>
      <p className="text-slate-700">{result.time_to_entry}</p>
    </div>
    <div className="mt-4 pt-4 border-t border-slate-200">
      <h5 className="text-sm font-semibold text-slate-600 mb-2 flex items-center"><ClipboardDocumentListIcon className="h-5 w-5 mr-2 text-sky-500"/>Try this for 2 weeks:</h5>
      <p className="text-slate-700 bg-slate-100 p-3 rounded-md">{result.exploration_task}</p>
    </div>
  </div>
);

const ExplorerDashboard: React.FC<DashboardProps> = ({ recommendation }) => {
  const { explorer_results, recommended_next_step } = recommendation;
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleExport = async () => {
    if (pdfRef.current) {
      setIsPrinting(true);
      await generatePdf(pdfRef.current, "AI-Career-Navigator-Explorer-Report.pdf");
      setIsPrinting(false);
    }
  };

  if (!explorer_results) return null;

  return (
    <div ref={pdfRef} className="max-w-4xl mx-auto animate-fade-in space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Let's Explore Your Future!</h2>
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
        <p className="text-slate-600 max-w-2xl">It's perfectly okay to be unsure. The best way to find your path is to start exploring. Here are a few areas that match your interests, along with simple tasks to see what you enjoy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {explorer_results.map((result, i) => <ExplorerCard key={i} result={result} />)}
      </div>

      {recommended_next_step && (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-center flex items-center justify-center"><LightBulbIcon className="h-6 w-6 mr-3 text-yellow-400"/>Your Recommended Next Step</h3>
          <div className="bg-sky-50 border-t-4 border-sky-400 text-sky-900 p-6 rounded-b-lg shadow-md text-center">
            <p className="font-bold text-lg">{recommended_next_step}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorerDashboard;
