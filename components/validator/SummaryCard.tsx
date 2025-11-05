import { ValidationResult } from "@/data/validation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";

interface SummaryCardProps {
  result: ValidationResult;
  onExport?: () => void;
}

export function SummaryCard({ result, onExport }: SummaryCardProps) {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Exemplary":
        return "text-green-600 bg-green-50 border-green-200";
      case "Strong":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "Developing":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Emerging":
        return "text-orange-600 bg-orange-50 border-orange-200";
      default:
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  return (
    <Card className="md:mt-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Overall Assessment</CardTitle>
        {onExport && (
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
 
        <div className="flex items-center gap-6">
          <div className="shrink-0">
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {result.overall_score.toFixed(1)}
                </div>
                <div className="text-xs text-indigo-100">out of 5</div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border-2 mb-2 ${getRatingColor(result.overall_rating)}`}>
              {result.overall_rating}
            </div>
            <p className="text-sm text-white">
              Your Central Idea shows {result.overall_rating.toLowerCase()} alignment with IB PYP standards.
            </p>
          </div>
        </div>

        <div className="bg-linear-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-black shrink-0 mt-0.5" />
            <h4 className="font-semibold text-gray-900">Suggested Improvement</h4>
          </div>
          <p className="text-gray-700 leading-relaxed pl-7">
          &ldquo;{result.suggested_rewrite}&ldquo;
          </p>
        </div>
      </CardContent>
    </Card>
  );
}