
import { Type } from '@google/genai';

// --- Reusable Sub-Schemas ---

const OpportunitySchema = {
    type: Type.OBJECT,
    properties: {
        type: { type: Type.STRING, enum: ['Scholarship', 'Online Course', 'Community', 'Bootcamp'] },
        title: { type: Type.STRING },
        organization: { type: Type.STRING },
        description: { type: Type.STRING },
        url: { type: Type.STRING },
    },
    required: ["type", "title", "organization", "description", "url"]
};

const AfricaRelevanceSchema = {
    type: Type.OBJECT,
    description: "Scores related to the career's relevance to African development.",
    properties: {
      development_contribution: {
        type: Type.STRING,
        description: "How this role contributes to local/continental development (e.g., 'Supports local health innovation & food security').",
      },
      stem_alignment_score: {
        type: Type.NUMBER,
        description: "A score (0.0-1.0) indicating how strongly this role aligns with STEM fields.",
      },
      problem_centrality_score: {
        type: Type.NUMBER,
        description: "The overall 'Problem Centrality Score' (0.0-1.0) based on STEM relevance, contribution to African growth, and skill gap alignment.",
      },
    },
    required: ["development_contribution", "stem_alignment_score", "problem_centrality_score"]
};

const CareerMatchSchema = {
    type: Type.OBJECT,
    properties: {
      role: { type: Type.STRING, description: "The title of the career role." },
      fit_reasons: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of bullet points explaining why this role is a good fit.",
      },
      market_insight: {
        type: Type.STRING,
        description: "A brief insight into the market demand for this role, especially in an African context.",
      },
      confidence: {
        type: Type.NUMBER,
        description: "The model's confidence score (0.0-1.0) for this specific match.",
      },
      africa_relevance: AfricaRelevanceSchema,
      impact_explanation: {
        type: Type.STRING,
        description: "A concise sentence explaining why this career is impactful for Africa's growth (e.g., 'Biotech is essential for Africa’s healthcare, agriculture, and climate solutions.').",
      },
      opportunities: {
        type: Type.ARRAY,
        items: OpportunitySchema,
        description: "A list of 2-3 concrete opportunities like scholarships, courses, or communities relevant to this career path and the user's region."
      },
      day_in_the_life: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A few bullet points describing typical daily tasks or activities in this role."
      },
      salary_range: {
        type: Type.STRING,
        description: "An estimated entry-level to mid-level salary range for this role in a major city like Nairobi, e.g., 'KES 80,000 - KES 150,000 per month'."
      },
      required_skills: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of key technical or soft skills required for the role."
      }
    },
    required: ["role", "fit_reasons", "market_insight", "confidence", "africa_relevance", "impact_explanation", "opportunities", "day_in_the_life", "salary_range", "required_skills"]
};

// --- Main Schemas for Different Flows ---

export const STANDARD_RECOMMENDATION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    profile_summary: { type: Type.STRING },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    values: { type: Type.ARRAY, items: { type: Type.STRING } },
    top_career_matches: {
      type: Type.ARRAY,
      description: "A list of 5 to 7 recommended career matches. This field is mandatory and must not be empty.",
      items: CareerMatchSchema,
    },
    action_plan: {
      type: Type.OBJECT,
      properties: {
        short_term: { type: Type.ARRAY, items: { type: Type.STRING } },
        medium_term: { type: Type.ARRAY, items: { type: Type.STRING } },
        long_term: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["short_term", "medium_term", "long_term"]
    },
    coach_tip: { type: Type.STRING },
    confidence_score: { type: Type.NUMBER },
  },
  required: [
    "profile_summary",
    "strengths",
    "values",
    "top_career_matches",
    "action_plan",
    "coach_tip",
    "confidence_score",
  ],
};

export const EXPLORER_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        explorer_results: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    course: { type: Type.STRING },
                    typical_roles: { type: Type.ARRAY, items: { type: Type.STRING } },
                    time_to_entry: { type: Type.STRING },
                    exploration_task: { type: Type.STRING },
                },
                required: ["course", "typical_roles", "time_to_entry", "exploration_task"]
            },
        },
        recommended_next_step: { type: Type.STRING }
    },
    required: ["explorer_results", "recommended_next_step"]
};

export const CBC_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        cbc_profile: {
            type: Type.OBJECT,
            properties: {
                competency_scores: {
                    type: Type.OBJECT,
                    properties: {
                        literacy: { type: Type.NUMBER },
                        numeracy: { type: Type.NUMBER },
                        creativity: { type: Type.NUMBER },
                        critical_thinking: { type: Type.NUMBER },
                        digital_literacy: { type: Type.NUMBER },
                        collaboration: { type: Type.NUMBER },
                    }
                },
                learning_preferences: { type: Type.ARRAY, items: { type: Type.STRING } },
                micro_pathways: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["competency_scores", "learning_preferences", "micro_pathways"]
        },
        recommended_activities: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        teacher_notes: { type: Type.STRING }
    },
    required: ["cbc_profile", "recommended_activities", "teacher_notes"]
};
