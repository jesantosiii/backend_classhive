import React, { useState } from "react";
import { SearchBar } from "@/studentside_components/Components/quiz-searchbar";
import { Quiz } from "../types/quiz";
import SidebarStudent from "@/components/ui/studentsidebar";
import { TopBarStudent } from "@/components/ui/topbar-student";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";


const paginate = (array: any[], pageSize: number, pageNumber: number) => {
  const start = pageSize * (pageNumber - 1);
  const end = start + pageSize;
  return array.slice(start, end);
};

const StudentQuizzes: React.FC = () => {
  const [quizzes] = useState<Quiz[]>([
    {
      quizName: "Math 1",
      subject: "Mathematics",
      date: "10-9-2024",
      totalItems: 80,
      score: 50,
    },
    {
      quizName: "Math 2",
      subject: "Mathematics",
      date: "09-08-2024",
      totalItems: 60,
      score: 50,
    },
    {
      quizName: "Science 1",
      subject: "Science",
      date: "09-07-2024",
      totalItems: 100,
      score: 50,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Fixed page size of 5 items per page

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // Implement search logic here
  };

  const handleSort = (sortOption: string) => {
    console.log("Sort option:", sortOption);
    // Implement sort logic here
  };

  // Get paginated quizzes
  const paginatedQuizzes = paginate(quizzes, pageSize, currentPage);

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < Math.ceil(quizzes.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex bg-white relative">
      <SidebarStudent />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBarStudent />
        <div className="flex-1 overflow-hidden pt-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-[#0A192F] mb-6">All Quizzes</h2>
            <SearchBar onSearch={handleSearch} onSort={handleSort} />
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quiz Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Items</TableHead>
                    <TableHead>Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedQuizzes.map((quiz, index) => (
                    <TableRow key={index}>
                      <TableCell>{quiz.quizName}</TableCell>
                      <TableCell>{quiz.subject}</TableCell>
                      <TableCell>{quiz.date}</TableCell>
                      <TableCell>{quiz.totalItems}</TableCell>
                      <TableCell>{quiz.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination controls placed at bottom-right */}
            <div className="flex justify-end items-center mt-4">
              {/* Left Arrow (hidden if on first page) */}
              {currentPage > 1 && (
                <button
                  onClick={prevPage}
                  className="bg-gray-300 p-2 rounded-md mx-2"
                >
                  &lt;
                </button>
              )}
              {/* Page numbers */}
              {Array.from(
                { length: Math.ceil(quizzes.length / pageSize) },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 mx-1 rounded-md text-sm ${
                    page === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
              {/* Right Arrow (hidden if on last page) */}
              {currentPage < Math.ceil(quizzes.length / pageSize) && (
                <button
                  onClick={nextPage}
                  className="bg-gray-300 p-2 rounded-md mx-2"
                >
                  &gt;
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuizzes;
