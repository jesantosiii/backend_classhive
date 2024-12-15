import React from "react";

interface QuizScore {
  quizName: string;
  totalItems: number;
  totalScore: number;
}

interface GradeCardProps {
  studentName: string;
  className: string;
  scores: QuizScore[];
}

export function GradeCard({
  studentName,
  className,
  scores,
}: GradeCardProps) {
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{studentName}</h2>
        <p className="text-sm text-gray-600">{className}</p>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-3 py-3 border-b border-gray-300 text-sm font-semibold text-gray-700">
          <div className="text-left px-4">Quiz Name</div>
          <div className="text-center">Total Items</div>
          <div className="text-right px-4">Total Score</div>
        </div>

        <div
          className={`space-y-2 ${
            scores.length > 6
              ? "max-h-[384px] overflow-y-auto pr-4 your-scrollable-container" 
              : ""
          }`}
        >
          {scores.map((score, index) => (
            <div
                className={`grid grid-cols-3 items-center py-4 rounded-md ${
                index % 2 === 0 ? "bg-blue-50" : "bg-white"
                }`}
                style={{ height: "64px" }} 
            >
                <div className="text-sm text-gray-800 px-4">{score.quizName}</div>
                <div className="text-sm text-center text-gray-800">{score.totalItems}</div>
                <div
                className={`text-sm text-right px-4 font-semibold ${
                    score.totalScore < score.totalItems * 0.5
                    ? "text-red-600"
                    : "text-gray-900"
                }`}
                >
                {score.totalScore}
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
