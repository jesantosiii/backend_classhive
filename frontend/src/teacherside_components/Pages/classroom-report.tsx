import React, { useState } from 'react';
import StatCard from '@/teacherside_components/Components/statcard';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Student } from '@/teacherside_components/types/report';

const Report: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>('name');

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

  const exportToCSV = () => {
    const headers = ['Name', 'Section', 'Time Taken', 'Score'];
    const rows = sortedStudents.map(student => [
      student.name,
      student.section,
      student.timeTaken,
      student.score
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <main className="p-5 bg-gray-100 min-h-screen mt-2.5">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Introduction to Python</h1>
            <span className="text-gray-600">Date Created: 11-17-2024</span>
          </div>
        </div>

        <div className="flex justify-between items-start mb-6 gap-5 bg-white p-5 rounded-lg shadow-md">
          <div className="flex-1 bg-white p-5 rounded-lg shadow-sm">
            <StatCard
              icon={<div>👥</div>}
              title="Total of Students"
              value={55}
            />
          </div>
          <div className="flex-1 bg-white p-5 rounded-lg shadow-sm">
            <StatCard
              icon={<div>📊</div>}
              title="Total Student Progress"
              value={50}
            />
          </div>
          <div className="flex-1 bg-white p-5 rounded-lg shadow-sm">
            <StatCard
              icon={<div>❓</div>}
              title="Questions"
              value={10}
            />
          </div>

          <div className="flex flex-col items-start gap-4 max-w-[200px] bg-gray-900 p-4 rounded-lg">
            <button className="w-full py-2 px-3.5 rounded bg-gray-900 text-white font-bold transition-colors hover:bg-gray-700">
              Reveal Answers
            </button>
            <button
              className="w-full py-2 px-3.5 rounded bg-gray-900 text-white font-bold transition-colors hover:bg-gray-700"
              onClick={exportToCSV}
            >
              Download Report
            </button>
            <button className="w-full py-2 px-3.5 rounded bg-gray-900 text-white font-bold transition-colors hover:bg-gray-700">
              View
            </button>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-xl font-bold">Participants</h2>
            <select
              className="p-2 rounded border border-gray-300"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="score">Sort by Score</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
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
                  className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}
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

