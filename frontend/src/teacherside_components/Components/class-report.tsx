"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from 'lucide-react'

interface Quiz {
  quizCode: string
  quizName: string
  section: string
  dateCreated: string
}

const initialQuizzes: Quiz[] = [
  {
    quizCode: "400100",
    quizName: "Introduction to Python Quiz",
    section: "BSIT 4D - 01",
    dateCreated: "11-17-24",
  },
  {
    quizCode: "400101",
    quizName: "Python Programming Fundamentals Quiz",
    section: "BSIT 4D - 02",
    dateCreated: "11-17-24",
  },
  {
    quizCode: "400102",
    quizName: "Python Basics Quiz",
    section: "BSIT 4D - 03",
    dateCreated: "11-17-24",
  },
]

const QuizReport = () => {
  const [quizzes] = useState<Quiz[]>(initialQuizzes)
  const [searchQuizName, setSearchQuizName] = useState("")
  const [searchSection, setSearchSection] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesQuizName = quiz.quizName.toLowerCase().includes(searchQuizName.toLowerCase());
    const matchesSection = quiz.section.toLowerCase().includes(searchSection.toLowerCase());
    const matchesDate = (!dateFrom || new Date(quiz.dateCreated) >= new Date(dateFrom)) &&
                        (!dateTo || new Date(quiz.dateCreated) <= new Date(dateTo));
    
    return matchesQuizName && matchesSection && matchesDate;
  });

  const downloadCSV = () => {
    const csvData = [
      ["Quiz Code", "Quiz Name", "Section", "Date Created"], // Header
      ...filteredQuizzes.map(quiz => [quiz.quizCode, quiz.quizName, quiz.section, quiz.dateCreated]) // Data
    ];

    const csvString = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quizzes.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-[#f0f7ff] min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search Quiz/Quiz Name"
                className="w-[200px]"
                value={searchQuizName}
                onChange={(e) => setSearchQuizName(e.target.value)}
              />
              <Input
                placeholder="Search by Section"
                className="w-[200px]"
                value={searchSection}
                onChange={(e) => setSearchSection(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">To</span>
                <Input
                  type="date"
                  className="w-[150px]"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
                <span className="text-sm text-gray-500">From</span>
                <Input
                  type="date"
                  className="w-[150px]"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
            </div>
            <Button 
              variant="outline" 
              className="bg-[#031C30] text-white hover:bg-[#042a47]"
              onClick={downloadCSV}
            >
              Export as CSV
            </Button>
          </div>
        </div>

 <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-100">
              <TableHead className="font-semibold">Quiz Code</TableHead>
              <TableHead className="font-semibold">Quiz Name</TableHead>
              <TableHead className="font-semibold">Section</TableHead>
              <TableHead className="font-semibold">Date Created</TableHead>
              <TableHead className="w-[80px] font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuizzes.map((quiz, index) => (
              <TableRow 
                key={quiz.quizCode}
                className={index % 2 === 0 ? "bg-blue-50" : "bg-white"} // Alternating background colors
              >
                <TableCell>{quiz.quizCode}</TableCell>
                <TableCell>{quiz.quizName}</TableCell>
                <TableCell>{quiz.section}</TableCell>
                <TableCell>{quiz.dateCreated}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default QuizReport;