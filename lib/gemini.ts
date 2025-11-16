
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { UserLevel, AssessmentData, Recommendation } from '../types.ts';
import { STANDARD_RECOMMENDATION_SCHEMA, EXPLORER_SCHEMA, CBC_SCHEMA } from './gemini-schemas.ts';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set. Real API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY, vertexai: true });

function generatePromptAndSchema(level: UserLevel, data: AssessmentData): { prompt: string, schema: object } {
  const userDataString = JSON.stringify(data, null, 2);

  const marketSnapshot = {
    sources: ["national_stats_ke", "indeed_global", "au_agenda_2063_priorities"],
    date: new Date().toISOString().split('T')[0],
    top_roles: ["Data Scientist", "Cybersecurity Analyst", "AgriTech Specialist", "HealthTech Innovator", "Renewable Energy Technician"],
    growth_by_role: { "Data Scientist": 0.25, "Cybersecurity Analyst": 0.30, "AgriTech Specialist": 0.22 },
    africa_growth_priority: ["STEM", "Agriculture Tech", "Fintech", "HealthTech", "Renewable Energy", "Digital Infrastructure"],
    local_skill_gaps: {
      "data_science": "high",
      "software_engineering": "very high",
      "biotech": "medium",
      "cybersecurity": "high"
    },
    sector_problems: {
        teacher_shortages_stem: true,
        limited_lab_access: true,
        gender_disparities_tech: true,
        cost_barrier_tertiary: "high",
    },
    opportunity_examples: {
        scholarships: ["Mastercard Foundation Scholars Program", "Equity Leaders Program"],
        online_courses: ["Coursera", "Pluralsight"],
        bootcamps: ["ALX Africa", "Moringa School"],
        communities: ["Forloop Africa", "local tech hubs"]
    },
    notes: "Strong push for digital transformation and STEM skills. Recommendations should consider resource limitations (e.g., suggest online labs, TVET programs) and highlight scholarship opportunities where possible."
  };

  const marketSnapshotString = JSON.stringify(marketSnapshot, null, 2);

  const baseSystemPrompt = `You are "AI Career Navigator (ACN)", an expert educational and career advisor for users in Africa. Your primary goal is to guide users towards impactful careers, with a strong emphasis on STEM fields and sectors crucial for Africa's growth. Use the provided user data and market signals to generate a detailed, encouraging, and actionable plan. Your entire output MUST be a single, valid JSON object that strictly matches the provided schema. Do not include any text or formatting before or after the JSON object.`;

  const problemCentralityInstruction = `You MUST compute a "Problem Centrality Score" for each career path, weighting factors like STEM relevance, contribution to African growth challenges (health, climate, agriculture), local employability, and alignment with continental goals like AU Agenda 2063. Also consider educational barriers from the market snapshot. For each career match, you MUST also provide: 1) 2-3 concrete opportunities (Scholarship, Online Course, Community, or Bootcamp) relevant to an African user. 2) A 'day_in_the_life' summary. 3) A typical 'salary_range' for the region. 4) A list of 'required_skills'.`;

  const config = `{ locale: "KE", language: "en", guidance_tone: "encouraging" }`;

  if (level === 'Primary_CBC') {
    const prompt = `
SYSTEM: ${baseSystemPrompt} Your task is to translate the child's competency scores into a positive, simple, and actionable report for parents and teachers. Focus on nurturing early interests.

INPUT:
user_level: ${level}
user_data: ${userDataString}

TASK: Generate a JSON output strictly matching the provided schema. Populate the 'cbc_profile', 'recommended_activities', and 'teacher_notes' fields.
`;
    return { prompt, schema: CBC_SCHEMA };
  }

  if (level === 'HighSchool_Explorer') {
    const prompt = `
SYSTEM: ${baseSystemPrompt} The user is a high school student who is unsure about their future. Your task is to act as a "Market Explorer". Based on their general interests and the market snapshot, suggest 3-4 relevant course clusters and associated career paths. For each, provide a simple, 2-week exploration task.

INPUT:
user_level: ${level}
user_data: ${userDataString}
market_snapshot: ${marketSnapshotString}

TASK: Generate a JSON output strictly matching the provided schema. Populate the 'explorer_results' and 'recommended_next_step' fields.
`;
    return { prompt, schema: EXPLORER_SCHEMA };
  }
  
  // Default prompt for HighSchool, University, Adult
  const prompt = `
SYSTEM: ${baseSystemPrompt} ${problemCentralityInstruction}

INPUT:
user_level: ${level}
user_data: ${userDataString}
market_snapshot: ${marketSnapshotString}
config: ${config}

TASK: Generate a JSON output strictly matching the provided schema. The output MUST include a detailed 'profile_summary', 5 to 7 'top_career_matches' (which must not be an empty array), a full 'action_plan', and a 'coach_tip'. Your recommendations should strongly connect the user's favorite subjects, problem-solving style, and ambitions to the career paths.
`;
  return { prompt, schema: STANDARD_RECOMMENDATION_SCHEMA };
}

export const getRecommendation = async (level: UserLevel, data: AssessmentData): Promise<Recommendation> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  const { prompt, schema } = generatePromptAndSchema(level, data);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [{ text: prompt }],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const startIndex = jsonText.indexOf('{');
    const endIndex = jsonText.lastIndexOf('}');
    if (startIndex === -1 || endIndex === -1) {
        throw new Error("Invalid JSON response from AI: No JSON object found.");
    }
    const validJsonText = jsonText.substring(startIndex, endIndex + 1);

    const result = JSON.parse(validJsonText) as Recommendation;
    
    // For High School, ensure top_career_matches exists and is not empty.
    if (level === 'HighSchool' && (!result.top_career_matches || result.top_career_matches.length === 0)) {
        throw new Error("AI response for High School level did not contain the required 'top_career_matches'.");
    }

    return result;

  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while fetching recommendations from the AI.");
  }
};
