import { CentralIdeaFormData } from "@/components/validator/InputForm";
import { THEME_GUIDANCE } from "./config";

export function buildQuickFixPrompt(input: CentralIdeaFormData): string {
  const themeGuidance = THEME_GUIDANCE[input.theme] || "Align with the selected theme.";

  let prompt = `Improve this Central Idea for IB PYP standards.

## CONTEXT
Grade Level: ${input.gradeLevel}
Transdisciplinary Theme: ${input.theme}`;

  if (input.descriptor) {
    prompt += `\nTheme Descriptor: ${input.descriptor}`;
  }

  prompt += `

## ORIGINAL CENTRAL IDEA
"${input.centralIdea}"

## IMPROVEMENT RULES

### Remove These Issues:
- All pronouns (we, our, they, you, I)
- Prescriptive language (should, must, need to)
- Weak verbs (is, are, has, needs, affects, helps)

### Apply These Fixes:
- Use strong action verbs: shapes, influences, creates, drives, maintains, transforms
- Link at least 2 concepts clearly
- Add qualifiers (can, may, might) when it adds inquiry potential
- Match grade-level complexity:
  * K-Grade 1: 6-10 words, simple
  * Grade 2-4: 10-15 words, moderate
  * Grade 5-6: 12-18 words, sophisticated

### Theme Alignment for "${input.theme}":
${themeGuidance}

## OUTPUT FORMAT
Respond with valid JSON only:

{
  "rewritten_idea": "Your improved Central Idea here",
  "changes_made": [
    "Brief explanation of change 1",
    "Brief explanation of change 2",
    "Brief explanation of change 3"
  ],
  "key_improvements": "One sentence summarizing the main improvement",
  "estimated_score": "Expected score range (e.g., '4.0-4.5')"
}

Keep the core meaning. Make it conceptual, transferable, and inquiry-rich.`;

  return prompt;
}

export function buildValidationPrompt(input: CentralIdeaFormData): string {
  const themeGuidance = THEME_GUIDANCE[input.theme] || "Align with the selected theme.";

  let prompt = `Evaluate this Central Idea against IB PYP validation criteria.

## CONTEXT
Grade Level: ${input.gradeLevel}
Transdisciplinary Theme: ${input.theme}`;

  if (input.descriptor) {
    prompt += `\nTheme Descriptor: ${input.descriptor}`;
  }

  prompt += `

## CENTRAL IDEA TO EVALUATE
"${input.centralIdea}"

## EVALUATION CRITERIA

You must evaluate this Central Idea against five IB PYP criteria:

### 1. Connection to Theme and Curriculum
- Does it align with the chosen transdisciplinary theme?
- Is it appropriate for the grade level?
- Does it connect to curricular intent?

### 2. Conceptual Depth
- Are concepts clearly linked with strong action verbs?
- Avoid weak verbs: is, are, has, needs, affects, helps
- Prefer strong verbs: shapes, influences, creates, drives, maintains, transforms
- Does it show abstract relationships?

### 3. Transfer and Relevance
- Can this idea apply across time, place, and culture?
- Is it transferable beyond a single context?
- Does it have universal relevance?

### 4. Inquiry and Assessment Potential
- Does it promote investigation and questioning?
- Can students explore different perspectives?
- Does it encourage critical thinking?

### 5. Language and Structure
- Is it clear and age-appropriate for the grade level?
- Is the tone appropriate (avoid prescriptive language)?
- Is the structure sound and grammatical?

### Theme Alignment for "${input.theme}":
${themeGuidance}

## SCORING GUIDELINES

Score each criterion 0-5:
- 5: Exemplary (fully meets IB standards)
- 4: Strong (clear and effective)
- 3: Developing (shows potential, needs refinement)
- 2: Emerging (factual or prescriptive, needs major work)
- 1: Needs Work (not aligned with IB expectations)
- 0: Unacceptable (does not meet basic requirements)

Calculate overall_score as the average of all five scores.

Determine overall_rating based on overall_score:
- 4.5-5.0: "Exemplary"
- 3.5-4.4: "Strong"
- 2.5-3.4: "Developing"
- 1.5-2.4: "Emerging"
- 0-1.4: "Needs Work"

## OUTPUT FORMAT
Respond with valid JSON only (no text outside JSON):

{
  "theme_connection_score": 5,
  "conceptual_depth_score": 3,
  "transfer_relevance_score": 4,
  "inquiry_potential_score": 4,
  "language_structure_score": 3,
  "theme_connection_rationale": "Detailed explanation of score (minimum 50 characters)",
  "conceptual_depth_rationale": "Detailed explanation of score (minimum 50 characters)",
  "transfer_relevance_rationale": "Detailed explanation of score (minimum 50 characters)",
  "inquiry_potential_rationale": "Detailed explanation of score (minimum 50 characters)",
  "language_structure_rationale": "Detailed explanation of score (minimum 50 characters)",
  "overall_score": 3.8,
  "overall_rating": "Strong",
  "priority_improvements": [
    "Specific, actionable improvement 1",
    "Specific, actionable improvement 2",
    "Specific, actionable improvement 3"
  ],
  "suggested_rewrite": "Improved Central Idea (minimum 20 characters, no pronouns, strong verbs)"
}

## REQUIREMENTS
- Every rationale must be at least 50 characters long
- suggested_rewrite must be at least 20 characters
- Avoid pronouns (we, our, they, you, I) in suggested_rewrite
- Use strong action verbs in suggested_rewrite
- Link at least 2 concepts in suggested_rewrite
- Be objective, professional, and pedagogically aligned`;

  return prompt;
}