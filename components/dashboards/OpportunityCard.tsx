
import React from 'react';
import { Opportunity } from '../../types.ts';
import { AcademicCapIcon, ComputerDesktopIcon, UserGroupIcon, RocketLaunchIcon, LinkIcon } from '../icons.tsx';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const getIcon = () => {
    switch (opportunity.type) {
      case 'Scholarship':
        return <AcademicCapIcon className="h-6 w-6 text-amber-600" />;
      case 'Online Course':
        return <ComputerDesktopIcon className="h-6 w-6 text-sky-600" />;
      case 'Community':
        return <UserGroupIcon className="h-6 w-6 text-emerald-600" />;
      case 'Bootcamp':
        return <RocketLaunchIcon className="h-6 w-6 text-purple-600" />;
      default:
        return <LinkIcon className="h-6 w-6 text-slate-600" />;
    }
  };

  const getBorderColor = () => {
    switch (opportunity.type) {
      case 'Scholarship':
        return 'border-amber-200';
      case 'Online Course':
        return 'border-sky-200';
      case 'Community':
        return 'border-emerald-200';
      case 'Bootcamp':
        return 'border-purple-200';
      default:
        return 'border-slate-200';
    }
  };

  return (
    <a
      href={opportunity.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-4 rounded-lg border ${getBorderColor()} bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all duration-200 group`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div>
          <p className="font-bold text-slate-800 text-sm leading-tight">{opportunity.title}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">{opportunity.organization}</p>
          <p className="text-xs text-slate-600 mt-2">{opportunity.description}</p>
        </div>
        <LinkIcon className="h-4 w-4 text-slate-400 group-hover:text-sky-500 transition-colors flex-shrink-0 ml-auto" />
      </div>
    </a>
  );
};

export default OpportunityCard;
