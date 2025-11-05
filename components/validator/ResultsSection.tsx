import { ValidationResult, mapToCriteria } from "@/data/validation";
import { ScoreCard } from "./ScoreCard";
import { SummaryCard } from "./SummaryCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ResultsSectionProps {
  result: ValidationResult;
  onBack: () => void;
  onExport?: () => void;
}

export function ResultsSection({ result, onBack, onExport }: ResultsSectionProps) {
  const criteria = mapToCriteria(result);

  return (
    <div className="space-y-6">
      {/* summary */}
      <SummaryCard result={result} onExport={onExport} />
      
      {/* improvements */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Improvements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.priority_improvements.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full text-white flex items-center justify-center shrink-0 text-sm font-semibold">
                  {idx + 1}
                </div>
                <p className="text-white text-sm pt-0.5">{item}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* detailed scores */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Scores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {criteria.map((criterion, idx) => (
            <ScoreCard key={idx} criterion={criterion} />
          ))}
        </CardContent>
      </Card>
      
      {/* back button */}
      <Button
        onClick={onBack}
        variant="outline"
        className="w-full text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Input
      </Button>
    </div>
  );
}