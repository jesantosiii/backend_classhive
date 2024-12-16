import React from 'react';
import { StatCard } from '../types/report';

const StatCardComponent: React.FC<StatCard> = ({ icon, title, value }) => {
  const cardStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '4px',
  };

  const titleStyle: React.CSSProperties = {
    color: '#666',
    fontSize: '14px',
  };

  return (
    <div style={cardStyle}>
      <div>{icon}</div>
      <div>
        <div style={valueStyle}>{value}</div>
        <div style={titleStyle}>{title}</div>
      </div>
    </div>
  );
};

export default StatCardComponent;

