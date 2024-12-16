import React, { useState } from 'react';
import StatCard from '@/teacherside_components/Components/statcard';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Student } from '@/teacherside_components/types/report';

const Report: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>('name');

  const mainStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: '#f5f6f8',
    minHeight: '100vh',
    marginTop: '10px',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  };

  const statsAndButtonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    gap: '20px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const statCardContainerStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    flex: '1',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
    maxWidth: '200px',
    backgroundColor: '#0f172a',
    padding: '16px',
    borderRadius: '8px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 14px', // Reduced padding to make the button smaller
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0f172a',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease', // Transition added for smooth hover effect
    width: '100%',  // Ensure the buttons take full width within their container
  };

  const dropdownStyle: React.CSSProperties = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  };

  const students: Student[] = [
    { name: 'Jett Paul Reyes', section: 'BSIT 4D-G1', timeTaken: '35 minutes', score: '10/10' },
    { name: 'Jerome Ibarreta', section: 'BSIT 4D-G1', timeTaken: '42 minutes', score: '10/10' },
    { name: 'Bob Myron Santiago', section: 'BSIT 4D-G1', timeTaken: '30 minutes', score: '10/10' },
    { name: 'Jett Paul Reyes', section: 'BSIT 4D-G1', timeTaken: '30 minutes', score: '9/10' },
    { name: 'Jerome Ibarreta', section: 'BSIT 4D-G1', timeTaken: '28 minutes', score: '8/10' },
    { name: 'Bob Myron Santiago', section: 'BSIT 4D-G1', timeTaken: '5 minutes', score: '8/10' },
    { name: 'Jett Paul Reyes', section: 'BSIT 4D-G1', timeTaken: '28 minutes', score: '8/10' },
    { name: 'Jerome Ibarreta', section: 'BSIT 4D-G1', timeTaken: '42 minutes', score: '7/10' },
    { name: 'Bob Myron Santiago', section: 'BSIT 4D-G1', timeTaken: '41 minutes', score: '7/10' },
  ];

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'score') return parseInt(b.score) - parseInt(a.score);
    return 0;
  });

  return (
    <div>
      <main style={mainStyle}>
        <div style={headerStyle}>
          <div>
            <h1 style={{ margin: '0', marginBottom: '4px' }}>Introduction to Python</h1>
            <span style={{ color: '#666' }}>Date Created: 11-17-2024</span>
          </div>
        </div>

        {/* Stats and Button Container */}
        <div style={statsAndButtonContainerStyle}>
          <div style={statCardContainerStyle}>
            <StatCard
              icon={<div>👥</div>}
              title="Total of Students"
              value={55}
            />
          </div>
          <div style={statCardContainerStyle}>
            <StatCard
              icon={<div>📊</div>}
              title="Total Student Progress"
              value={50}
            />
          </div>
          <div style={statCardContainerStyle}>
            <StatCard
              icon={<div>❓</div>}
              title="Questions"
              value={10}
            />
          </div>

          <div style={buttonContainerStyle}>
            <button
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#374151'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}
            >
              Reveal Answers
            </button>
            <button
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#374151'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}
            >
              Download Report
            </button>
          </div>
        </div>

        {/* Participants Section with Background Color */}
        <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#fff' }}>Participants</h2>
            <select
              style={dropdownStyle}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="score">Sort by Score</option>
            </select>
          </div>
        </div>

        {/* Table with Sorted Data */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: '#e9f5fe' }}>
                <TableHead>Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Time Taken</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStudents.map((student, index) => (
                <TableRow
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#e9f5fe',
                  }}
                >
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.timeTaken}</TableCell>
                  <TableCell>{student.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Report;
