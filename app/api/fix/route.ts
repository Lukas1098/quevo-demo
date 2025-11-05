import { NextRequest } from "next/server";
import { generateObject } from "ai";
import { mistral } from '@ai-sdk/mistral';
import { buildQuickFixPrompt } from "@/lib/prompts/builders";
import { QUICK_FIX_SYSTEM_PROMPT } from "@/lib/prompts/config";
import { quickFixSchema } from "@/lib/definitions"

export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      
      if (!body.gradeLevel || !body.theme || !body.centralIdea) {
        return Response.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
  
      const userPrompt = buildQuickFixPrompt(body);
  
      const { object } = await generateObject({
        model: mistral('mistral-large-latest'),
        system: QUICK_FIX_SYSTEM_PROMPT,
        prompt: userPrompt,
        schema: quickFixSchema,
        temperature: 0.3,
      });
      
      return Response.json(object);
      
    } catch (error) {
      console.error("Quick Fix error:", error);
      return Response.json(
        { error: "Failed to process quick fix" },
        { status: 500 }
      );
    }
  }