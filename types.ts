
export type UserLevel = 'Primary' | 'HighSchool' | 'University' | 'Adult' | 'Primary_CBC' | 'HighSchool_Explorer';

export type AppScreen = 'onboarding' | 'level-selector' | 'assessment' | 'dashboard';

export interface AssessmentQuestion {
  id: string;
  type: 'multiple-choice' | 'text' | 'rating' | 'icon-select';
  questionText: string;
  options?: { label: string; value: string | number; icon?: React.FC<any> }[];
}

export interface AssessmentData {
  [key: string]: string | number | string[];
}

export interface AfricaRelevance {
  development_contribution: string;
  stem_alignment_score: number;
  problem_centrality_score: number;
}

export interface Opportunity {
  type: 'Scholarship' | 'Online Course' | 'Community' | 'Bootcamp';
  title: string;
  organization: string;
  description: string;
  url: string;
}

export interface CareerMatch {
  role: string;
  fit_reasons: string[];
  market_insight: string;
  confidence: number;
  africa_relevance: AfricaRelevance;
  impact_explanation: string;
  opportunities: Opportunity[];
  day_in_the_life: string[];
  salary_range: string;
  required_skills: string[];
}

export interface ActionPlan {
  short_term: string[];
  medium_term: string[];
  long_term: string[];
}

export interface SkillGap {
  skill: string;
  current_level: 'beginner' | 'intermediate' | 'advanced';
  recommended_action: string;
}

export interface MarketData {
  sources: string[];
  date: string;
}

export interface CBCProfile {
  competency_scores: Record<string, number>;
  learning_preferences: string[];
  micro_pathways: string[];
}

export interface TransitionSupport {
  recommended_courses: string[];
  exploration_tasks: string[];
  bridging_programs: string[];
}

export interface ExplorerResult {
  course: string;
  typical_roles: string[];
  time_to_entry: string;
  exploration_task: string;
}

export interface Recommendation {
  profile_summary: string;
  strengths: string[];
  values: string[];
  top_career_matches: CareerMatch[];
  action_plan: ActionPlan;
  skill_gap_analysis: SkillGap[];
  market_data_used: MarketData;
  coach_tip: string;
  confidence_score: number;
  explainability: string[];
  
  // Optional fields for new features
  cbc_profile?: CBCProfile;
  transition_support?: TransitionSupport;
  explorer_results?: ExplorerResult[];
  recommended_activities?: string[];
  teacher_notes?: string;
  recommended_next_step?: string;
}
