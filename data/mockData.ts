import { ValidationResult } from "./validation";

/**
 * Genera datos mock para testing de la UI
 */
export function generateMockValidationResult(formData?: {
  gradeLevel?: string;
  theme?: string;
  centralIdea?: string;
}): ValidationResult {
  // La estructura debe coincidir exactamente con ValidationResult
  return {
    // Scores (números del 1-5)
    theme_connection_score: 4,
    conceptual_depth_score: 3,
    transfer_relevance_score: 4,
    inquiry_potential_score: 4,
    language_structure_score: 3,

    // Rationales (strings explicativos)
    theme_connection_rationale: "The Central Idea shows good alignment with the selected theme, though it could be more explicitly connected to the transdisciplinary context.",
    conceptual_depth_rationale: "Concepts are present but could benefit from stronger verbs and clearer links between ideas. Consider using action verbs that emphasize relationships.",
    transfer_relevance_rationale: "The idea has good potential for transfer across contexts and demonstrates relevance beyond a single situation.",
    inquiry_potential_rationale: "Invites exploration and questioning, though it could be structured to encourage even deeper inquiry.",
    language_structure_rationale: "Language is clear but may need adjustment for the selected grade level. Consider simplifying complex structures.",

    // Overall assessment
    overall_score: 3.8,
    overall_rating: "Strong",

    // Improvements
    suggested_rewrite: "Living things adapt to their environment through behavioral and physical changes that help them survive in different conditions.",
    priority_improvements: [
      "Strengthen the connection between concepts using stronger action verbs",
      "Ensure age-appropriate language for the selected grade level",
      "Add more explicit links to the transdisciplinary theme",
      "Increase inquiry potential by making it more open-ended"
    ]
  };
}

/**
 * Mock data para Quick Fix
 */
export function generateMockQuickFix(formData?: {
  centralIdea?: string;
}): { rewritten_idea: string } {
  const originalIdea = formData?.centralIdea || "Living things change to survive";
  
  return {
    rewritten_idea: originalIdea.includes("adapt")
      ? originalIdea
      : `${originalIdea.replace(/\.$/, "")}. Living things adapt their behaviors and physical features to thrive in diverse environments.`
  };
}