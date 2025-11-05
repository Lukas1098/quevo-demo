export const gradeLevels = [
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
] as const

export const themes = [
  "Who we are",
  "Where we are in place and time",
  "How we express ourselves",
  "How the world works",
  "How we organize ourselves",
  "Sharing the planet",
] as const

export type GradeLevel = typeof gradeLevels[number]
export type Theme = typeof themes[number]

export interface ValidationCriterion {
  name: string;
  score: number; 
  rationale: string; 
}

export interface ValidationResult {
  // Scores
  theme_connection_score: number;
  conceptual_depth_score: number;
  transfer_relevance_score: number;
  inquiry_potential_score: number;
  language_structure_score: number;

  // Rationals
  theme_connection_rationale: string;
  conceptual_depth_rationale: string;
  transfer_relevance_rationale: string;
  inquiry_potential_rationale: string;
  language_structure_rationale: string;

  
  overall_score: number; 
  overall_rating: "Exemplary" | "Strong" | "Developing" | "Emerging" | "Needs Work";

  // Improvements
  suggested_rewrite: string; 
  priority_improvements: string[]; 
}


export function mapToCriteria(result: ValidationResult): ValidationCriterion[] {
  return [
    {
      name: "Theme Connection",
      score: result.theme_connection_score,
      rationale: result.theme_connection_rationale,
    },
    {
      name: "Conceptual Depth",
      score: result.conceptual_depth_score,
      rationale: result.conceptual_depth_rationale,
    },
    {
      name: "Transfer & Relevance",
      score: result.transfer_relevance_score,
      rationale: result.transfer_relevance_rationale,
    },
    {
      name: "Inquiry Potential",
      score: result.inquiry_potential_score,
      rationale: result.inquiry_potential_rationale,
    },
    {
      name: "Language Structure",
      score: result.language_structure_score,
      rationale: result.language_structure_rationale,
    },
  ];
}