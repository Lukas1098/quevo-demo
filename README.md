# Quevo Demo

An AI-powered web application for evaluating and improving Central Ideas in the International Baccalaureate Primary Years Programme (IB PYP). This tool provides automated validation against IB PYP standards and generates actionable improvement suggestions using advanced language models.

## Overview

Quevo Demo assists educators in developing high-quality Central Ideas that align with IB PYP pedagogical standards. The application evaluates submitted Central Ideas across five critical criteria and provides comprehensive feedback, scores, and automatically improved versions.

## Features

### Validation Agent
- **Comprehensive Evaluation**: Assesses Central Ideas against five IB PYP criteria:
  - Connection to Theme and Curriculum
  - Conceptual Depth
  - Transfer and Relevance
  - Inquiry and Assessment Potential
  - Language and Structure
- **Scoring System**: Provides 0-5 scores for each criterion with detailed rationales
- **Overall Assessment**: Calculates overall score and rating (Exemplary, Strong, Developing, Emerging, Needs Work)
- **Priority Improvements**: Generates 2-5 actionable improvement suggestions
- **Suggested Rewrite**: Produces an improved version that meets IB PYP standards

### Quick Fix Agent
- **Instant Improvement**: Automatically rewrites Central Ideas to meet IB PYP standards
- **Smart Editing**: Removes pronouns, prescriptive language, and weak verbs
- **Strong Action Verbs**: Utilizes powerful verbs (shapes, influences, creates, drives, maintains, transforms)
- **Grade-Level Adaptation**: Adjusts complexity based on selected grade level
- **Change Documentation**: Explains modifications made and provides estimated score improvement

## Technology Stack

### Core Framework
- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe development

### AI Integration
- **Vercel AI SDK 5.0.87** - AI integration framework
- **Mistral AI SDK 2.0.23** - Mistral Large Latest model
- **Structured Output**: Zod schemas for type-safe AI responses

### UI and Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Motion (Framer Motion) 12.23.24** - Animation library
- **Lenis 1.3.14** - Smooth scrolling
- **Lucide React** - Icon library

### Form Management
- **React Hook Form 7.66.0** - Form state management
- **Zod 4.1.12** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Additional Libraries
- **DOMPurify** - HTML sanitization
- **class-variance-authority** - Component variant management
- **clsx** - Conditional class names

## Prerequisites

- Node.js 18+ or higher
- pnpm (recommended), npm, yarn, or bun
- Mistral AI API key

## Installation

1. Clone the repository:
git clone [https://github.com/Lukas1098/quevo-demo.git]
cd quevo-demo2. Install dependencies:
pnpm install
# or
npm install
# or
yarn install3. Create a `.env.local` file in the root directory:
MISTRAL_API_KEY=your_mistral_api_key_here4. Run the development server:
pnpm dev
# or
npm run dev
# or
yarn dev5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Validating a Central Idea

1. Fill in the form with:
   - **Grade Level**: Select from Kindergarten through Grade 6
   - **Transdisciplinary Theme**: Choose one of the six IB PYP themes
   - **Theme Descriptor** (optional): Provide additional context
   - **Central Idea**: Enter your Central Idea (minimum 20 characters)

2. Click **"Validate Idea"** to receive a comprehensive evaluation

3. Review the results:
   - Overall score and rating
   - Detailed scores for each criterion
   - Rationales explaining each score
   - Priority improvements
   - Suggested rewrite

4. Export results as JSON if needed

### Quick Fix

1. Fill in the form with your Central Idea details

2. Click **"Quick Fix"** to automatically improve your Central Idea

3. The improved version will replace the text in the Central Idea field

4. Review the changes and use the improved version

## API Endpoints

### POST `/api/validation`

Validates a Central Idea against IB PYP criteria.

**Request Body:**
{
  "gradeLevel": "Grade 3",
  "theme": "Sharing the Planet",
  "descriptor": "Exploring relationships between humans and the natural world",
  "centralIdea": "We should take care of animals because they need our help."
}**Response:**
{
  "theme_connection_score": 5,
  "conceptual_depth_score": 3,
  "transfer_relevance_score": 4,
  "inquiry_potential_score": 4,
  "language_structure_score": 3,
  "theme_connection_rationale": "Detailed explanation...",
  "conceptual_depth_rationale": "Detailed explanation...",
  "transfer_relevance_rationale": "Detailed explanation...",
  "inquiry_potential_rationale": "Detailed explanation...",
  "language_structure_rationale": "Detailed explanation...",
  "overall_score": 3.8,
  "overall_rating": "Strong",
  "priority_improvements": [
    "Remove prescriptive language such as 'should' or 'need to'.",
    "Strengthen the conceptual link between concepts."
  ],
  "suggested_rewrite": "Human actions influence animal survival and ecosystem balance."
}### POST `/api/fix`

Generates an improved version of a Central Idea.

**Request Body:**
{
  "gradeLevel": "Grade 3",
  "theme": "Sharing the Planet",
  "descriptor": "Optional descriptor",
  "centralIdea": "Original Central Idea text"
}**Response:**son
{
  "rewritten_idea": "Improved Central Idea",
  "changes_made": [
    "Removed pronouns and prescriptive language",
    "Replaced weak verbs with strong action verbs",
    "Linked multiple concepts clearly"
  ],
  "key_improvements": "Summary of main improvements",
  "estimated_score": "4.0-4.5"
}## Project Structure
