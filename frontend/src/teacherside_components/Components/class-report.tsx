"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getTokens } from "../../../config.ts";

interface Quiz {
  id: number;
  name: string;
  description: string;
  classroom: number;
}

const QuizReport = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]); // Store quizzes from the backend
  const [searchQuizName, setSearchQuizName] = useState("");
  const [searchSection, setSearchSection] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Fetch quizzes from the backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const tokens = getTokens(); // Retrieve tokens from config.ts
        if (!tokens || !tokens.access) {
          throw new Error("Access token is missing");
        }

        const response = await axios.get("http://127.0.0.1:8000/quizzes/teacher/quizzes/", {
          headers: {
            Authorization: `Bearer ${tokens.access}`, // Add the token to the Authorization header
          },
        });

        // Transform the data to match the UI structure
        const transformedQuizzes = response.data.map((quiz: Quiz) => ({
          id: quiz.id,
          name: quiz.name,
          description: quiz.description,
          classroom: quiz.classroom,
        }));

        setQuizzes(transformedQuizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  // Store Quiz_ID and Classroom_ID in localStorage and navigate
  const handleViewClick = (quizId: number, classroomId: number, quizName: string) => {
  localStorage.setItem("selectedQuizId", quizId.toString());
  localStorage.setItem("selectedClassroomId", classroomId.toString());
  localStorage.setItem("selectedQuizName", quizName);  // Store the quiz name in localStorage

  navigate("/teacher/classroomreport");
};


  // Filter quizzes based on user input
  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesQuizName = quiz.name
      .toLowerCase()
      .includes(searchQuizName.toLowerCase());
    const matchesSection = quiz.description
      .toLowerCase()
      .includes(searchSection.toLowerCase());
    const matchesDate =
      (!dateFrom || new Date(quiz.classroom) >= new Date(dateFrom)) &&
      (!dateTo || new Date(quiz.classroom) <= new Date(dateTo));

    return matchesQuizName && matchesSection && matchesDate;
  });

  // Export filtered quizzes as CSV
  const downloadCSV = () => {
    const csvData = [
      ["ID", "Name", "Description", "Classroom"], // Header
      ...filteredQuizzes.map((quiz) => [
        quiz.id,
        quiz.name,
        quiz.description,
        quiz.classroom,
      ]), // Data
    ];

    const csvString = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "quizzes.csv";
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
              <TableHead className="font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">Classroom</TableHead>
              <TableHead className="w-[80px] font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuizzes.map((quiz, index) => (
              <TableRow
                key={quiz.id}
                className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}
              >
                <TableCell>{quiz.id}</TableCell>
                <TableCell>{quiz.name}</TableCell>
                <TableCell>{quiz.description}</TableCell>
                <TableCell>{quiz.classroom}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleViewClick(quiz.id, quiz.classroom, quiz.name)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-xl"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QuizReport;
