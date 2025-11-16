
import React from 'react';
import { Recommendation } from '../types.ts';
import StandardDashboard from './dashboards/StandardDashboard.tsx';
import CBCDashboard from './dashboards/CBCDashboard.tsx';
import ExplorerDashboard from './dashboards/ExplorerDashboard.tsx';

interface DashboardScreenProps {
  recommendation: Recommendation;
  onReset: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ recommendation, onReset }) => {
  // Render CBC dashboard if cbc_profile is present
  if (recommendation.cbc_profile) {
    return <CBCDashboard recommendation={recommendation} onReset={onReset} />;
  }

  // Render Explorer dashboard if explorer_results are present
  if (recommendation.explorer_results) {
    return <ExplorerDashboard recommendation={recommendation} onReset={onReset} />;
  }

  // Render the standard dashboard for all other cases
  return <StandardDashboard recommendation={recommendation} onReset={onReset} />;
};

export default DashboardScreen;
