import React from 'react';
import { IconType } from 'react-icons';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: IconType;
  iconColor: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, iconColor }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-xl transition-shadow hover:shadow-2xl">
      <div className={`mb-4 inline-flex rounded-lg p-2 ${iconColor}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};
