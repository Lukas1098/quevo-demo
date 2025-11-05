import { NextRequest } from "next/server";
import { generateObject } from "ai";
import { mistral } from '@ai-sdk/mistral';
import { z } from "zod";
import { buildValidationPrompt } from "@/lib/prompts/builders";
import { VALIDATION_SYSTEM_PROMPT } from "@/lib/prompts/config";
import { validationSchema } from "@/lib/definitions"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.gradeLevel || !body.theme || !body.centralIdea) {
      return Response.json(
        { error: "Missing required fields: gradeLevel, theme, and centralIdea are required" },
        { status: 400 }
      );
    }

    const userPrompt = buildValidationPrompt(body);

    const { object } = await generateObject({
      model: mistral('mistral-large-latest'),
      system: VALIDATION_SYSTEM_PROMPT,
      prompt: userPrompt,
      schema: validationSchema,
      temperature: 0.3,
    });
    
    return Response.json(object);
    
  } catch (error: any) {
    console.error("Validation error:", error);
    
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", JSON.stringify(error.issues, null, 2));
      return Response.json(
        { 
          error: "Validation schema error",
          details: error.issues,
          message: error.message
        },
        { status: 500 }
      );
    }
    
    if (error?.cause) {
      console.error("Error cause:", error.cause);
    }
    
    return Response.json(
      { 
        error: "Failed to process validation request",
        message: error?.message || "Unknown error",
        details: error?.stack || error?.toString()
      },
      { status: 500 }
    );
  }
}