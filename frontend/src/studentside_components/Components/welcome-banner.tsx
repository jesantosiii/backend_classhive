import React from 'react';
import StudentPicture from '../../assets/Student Dashboard Design.png'

interface WelcomeBannerProps {
  studentName: string;
  date: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ date }) => {
  return (
    <div className="bg-[#0B1F38] rounded-xl p-8 text-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-full">
        <img 
          src={StudentPicture}
          alt="Student illustration"
          className="object-cover h-full"
        />
      </div>
      <div className="relative z-10">
        <p className="text-gray-300 mb-2">{date}</p>
        <h1 className="text-3xl font-bold mb-2">Welcome back to ClassHive!</h1>
        <p className="text-gray-300">Be busy as a bee</p>
      </div>
    </div>
  );
};

