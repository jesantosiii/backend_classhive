import React from 'react';
import { WelcomeBanner } from './welcome-banner';
import { RecentQuizzes } from './recent-quizzes';

export const StudentDashboard: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="max-w-7xl mx-auto">
      <WelcomeBanner
        date={currentDate}
      />
    </div>
  );
};

