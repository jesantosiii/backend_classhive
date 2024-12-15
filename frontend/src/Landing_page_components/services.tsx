import React from 'react';
import { FaCheckCircle, FaBullseye, FaQuestionCircle, FaLightbulb } from 'react-icons/fa';
import { ServiceCard } from '../Landing_page_components/services-card';
import ServicePic from '../assets/Services pic.png';

export const Services: React.FC = () => {
  const services = [
    {
      title: 'Interactive learning',
      description: 'Engages students through dynamic, hands-on activities such as quizzes, discussions.',
      icon: FaCheckCircle,
      iconColor: 'text-blue-500',
    },
    {
      title: 'Grade Tracking',
      description: 'Tracks student progress, offering insights into performance and areas for improvement.',
      icon: FaBullseye,
      iconColor: 'text-cyan-500',
    },
    {
      title: 'Progress Reports',
      description: 'Track student performance over time with detailed reports and analytics to monitor growth and identify learning gaps.',
      icon: FaQuestionCircle,
      iconColor: 'text-purple-500',
    },
    {
      title: 'Collaborative Learning',
      description: 'Enable students and teachers to collaborate on projects and discussions, fostering a community of learning.',
      icon: FaLightbulb,
      iconColor: 'text-amber-500',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
          OUR SERVICES
        </h2>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr_600px]">
          <div className="grid gap-8 md:grid-cols-2 lg:col-span-2">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          <div className="relative hidden lg:block">
            <img
              src={ServicePic}
              alt="Students learning"
              className="rounded-lg object-cover"
              style={{ width: '500px', height: '400px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

