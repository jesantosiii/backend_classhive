import React from 'react';
import { QuizCard } from './quiz-card';

export const RecentQuizzes: React.FC = () => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Quizzes</h2>
        <button className="text-sky-900 hover:text-sky-600 flex items-center">
          See all
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <QuizCard 
          title="Object oriented programming"
        />
        <QuizCard 
          title="Fundamentals of database systems"
        />
      </div>
    </div>
  );
};

