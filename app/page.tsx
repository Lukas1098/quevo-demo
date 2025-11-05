"use client"

import { useState } from "react";
import { CentralIdeaForm, CentralIdeaFormData } from "@/components/validator/InputForm";
import { ResultsSection } from "@/components/validator/ResultsSection";
import { ValidationResult } from "@/data/validation";
import { useScroll as SmoothScroll } from "@/hooks/useScroll"
import { motion } from 'motion/react'
import { VARIANTS_CONTAINER, VARIANTS_SECTION, TRANSITION_SECTION } from "@/data/constants";
import { EmptyState } from "@/lib/empty-state";
import { Spotlight } from "@/components/motion-primitives/SpotLight";

export default function Home() {
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rewrittenIdea, setRewrittenIdea] = useState<string | undefined>(undefined);

  const handleValidate = async (data: CentralIdeaFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/validation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Validation failed");
      }

      const validationResult = await response.json();
      setResult(validationResult);
      console.log("Validation result:", { validationResult })
    } catch (error) {
      console.error("Validation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFix = async (data: CentralIdeaFormData) => {
    setIsLoading(true);

    // littel delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    try {
      const response = await fetch("/api/fix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Quick fix failed");
      }

      const { rewritten_idea, changes_made, key_improvements, estimated_score } = await response.json();
      setRewrittenIdea(rewritten_idea)
      console.log("Quick fix result:", { rewritten_idea, changes_made, key_improvements, estimated_score });
    } catch (error) {
      console.error("Quick fix error:", error);

    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setResult(null);
  };

  const handleExport = () => {
    if (!result) return;

    // blob with json
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });

    // download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `validation-result-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="container mx-auto p-6 pt-24">
      <motion.section
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <SmoothScroll />
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill="white"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* form */}
            <CentralIdeaForm
              onValidate={handleValidate}
              onQuickFix={handleQuickFix}
              isLoading={isLoading}
              rewrittenIdea={rewrittenIdea}
            />

            {/* results */}
            {result ? (
              <ResultsSection
                result={result}
                onBack={handleBack}
                onExport={handleExport}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}