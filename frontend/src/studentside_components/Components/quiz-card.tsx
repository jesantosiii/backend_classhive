import React from 'react';

interface QuizCardProps {
  title: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({ title }) => {
  return (
    <div className="bg-[#0B1F38] rounded-xl p-6 text-white flex flex-col justify-between min-h-[200px] place-content-center">
      <div className="flex flex-col items-center">
        <div className="mb-4"></div>
        <h3 className="text-3xl font-semibold mb-4 text-center">{title}</h3>
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500/20 hover:bg-blue-500/30 w-48 h-16 text-2xl text-white px-6 py-2 rounded transition-colors">
          View
        </button>
      </div>
    </div>
  );
};
