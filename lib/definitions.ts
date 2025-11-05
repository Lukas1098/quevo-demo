import { z } from "zod";

export const validationSchema = z.object({
    theme_connection_score: z.number().min(0).max(5),
    conceptual_depth_score: z.number().min(0).max(5),
    transfer_relevance_score: z.number().min(0).max(5),
    inquiry_potential_score: z.number().min(0).max(5),
    language_structure_score: z.number().min(0).max(5),
    theme_connection_rationale: z.string().min(50),
    conceptual_depth_rationale: z.string().min(50),
    transfer_relevance_rationale: z.string().min(50),
    inquiry_potential_rationale: z.string().min(50),
    language_structure_rationale: z.string().min(50),
    overall_score: z.number().min(0).max(5),
    overall_rating: z.enum(["Exemplary", "Strong", "Developing", "Emerging", "Needs Work"]),
    priority_improvements: z.array(z.string()).min(2).max(5),
    suggested_rewrite: z.string().min(20),
});

export const quickFixSchema = z.object({
    rewritten_idea: z.string().min(20),
    changes_made: z.array(z.string()).min(2).max(5),
    key_improvements: z.string(),
    estimated_score: z.string(),
});
