import { ValidationCriterion } from "@/data/validation";

interface ScoreCardProps {
    criterion: ValidationCriterion;
}

export function ScoreCard({ criterion }: ScoreCardProps) {
    const { name, score, rationale } = criterion;

    const getScoreColor = (score: number) => {
        if (score === 5) return "bg-green-500";
        if (score === 4) return "bg-blue-500";
        if (score === 3) return "bg-yellow-500";
        if (score === 2) return "bg-orange-500";
        return "bg-red-500";
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">{name}</span>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white">{score}</span>
                    <span className="text-sm text-gray-500">/ 5</span>
                </div>
            </div>

            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                        key={dot}
                        className={`h-2 flex-1 rounded-full ${dot <= score ? getScoreColor(score) : "bg-gray-200"
                            }`}
                    />
                ))}
            </div>

            <p className="text-sm text-white leading-relaxed">{rationale}</p>
        </div>
    );
}