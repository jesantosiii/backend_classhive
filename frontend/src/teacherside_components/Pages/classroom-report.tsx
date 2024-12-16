import React, { useState, useEffect } from "react";
import StatCard from "@/teacherside_components/Components/statcard";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import axios from "axios";
import { getTokens } from "../../../config.ts";

interface Student {
  name: string;
  section: string;
  timeTaken: string;
  score: string;
}

const Report: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("name");
  const [students, setStudents] = useState<Student[]>([]); // State for students data
  const [loading, setLoading] = useState<boolean>(true);
  const [quizName, setQuizName] = useState<string>("");

  useEffect(() => {
    // Retrieve the quiz name from localStorage
    const storedQuizName = localStorage.getItem("selectedQuizName");
    if (storedQuizName) {
      setQuizName(storedQuizName); // Set quiz name dynamically
    }

    const fetchQuizScores = async () => {
      try {
        const tokens = getTokens();
        if (!tokens || !tokens.access) {
          throw new Error("Access token is missing.");
        }

        const classroomId = localStorage.getItem("selectedClassroomId");
        const quizId = localStorage.getItem("selectedQuizId");

        if (!classroomId || !quizId) {
          throw new Error("Classroom ID or Quiz ID is missing in localStorage.");
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/quizzes/api/classrooms/${classroomId}/quizzes/${quizId}/scores/`,
          {
            headers: {
              Authorization: `Bearer ${tokens.access}`,
            },
          }
        );

        // Check the structure of the response
        console.log(response.data);

        // Transform data based on the provided structure
        const transformedData = response.data.map((attempt: any) => ({
          name: attempt.student.trim() || "Unknown", // Adjusting the name to trim any extra spaces
          section: attempt.quiz.classroom || "N/A", // Assuming "classroom" is the section, adjust if necessary
          timeTaken: attempt.start_time || "N/A", // Using start_time as the time taken (adjust if needed)
          score: attempt.score, // Assuming "Completed" or other status for score
          status: attempt.status_display,
        }));

        setStudents(transformedData);
      } catch (error) {
        console.error("Error fetching quiz scores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizScores();
  }, []);

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "name") {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return nameA.localeCompare(nameB);
    }
    if (sortBy === "score") {
      const scoreA = a.score === "Completed" ? 1 : 0; // Assigning score as 1 for Completed, 0 for others
      const scoreB = b.score === "Completed" ? 1 : 0;
      return scoreB - scoreA;
    }
    return 0;
  });

  const exportToCSV = () => {
    const headers = ["Name", "Section", "Time Taken", "Score"];
    const rows = sortedStudents.map((student) => [
      student.name,
      student.section,
      student.timeTaken,
      student.score,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Placeholder function for Reveal Answer button
  const revealAnswer = () => {
    alert("Answers revealed!");
  };

  // Placeholder function for View Quiz button
  const viewQuiz = () => {
    alert("Viewing quiz!");
  };

  return (
    <div>
      <main className="p-5 bg-gray-100 min-h-screen mt-2.5">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">{quizName || "Quiz Report"}</h1> {/* Dynamic quiz name */}
          </div>
        </div>

        <div className="flex justify-between items-start mb-6 gap-5 bg-white p-5 rounded-lg shadow-md">
          <div className="flex-1 bg-white p-5 rounded-lg shadow-sm">
            <StatCard
              icon={<div>👥</div>}
              title="Total of Students"
              value={students.length}
            />
          </div>
          <div className="flex-1 bg-white p-5 rounded-lg shadow-sm">
            <StatCard
              icon={<div>📊</div>}
              title="Total Student Progress"
              value={students.filter((s) => s.status === "Completed").length}
            />
          </div>
          <div className="flex flex-col items-start gap-4 max-w-[200px] bg-gray-900 p-4 rounded-lg">
            <button
                className="w-full py-2 px-3.5 rounded bg-gray-900 text-white font-bold transition-colors hover:bg-gray-700"
                onClick={exportToCSV}
            >
              Download Report
            </button>
            <button
                className="w-full py-2 px-3.5 rounded bg-gray-900 text-white font-bold transition-colors hover:bg-gray-700"
                onClick={revealAnswer}
            >
              Reveal Answer
            </button>
            <button
                className="w-full py-2 px-3.5 rounded bg-gray-900 text-white font-bold transition-colors hover:bg-gray-700"
                onClick={viewQuiz}
            >
              View Quiz
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

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            {students.length === 0 ? (
              <p className="text-center text-gray-500">No students to display</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead>Name</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Date Taken</TableHead>
                    <TableHead>Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedStudents.map((student, index) => (
                    <TableRow
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                    >
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>{student.timeTaken}</TableCell>
                      <TableCell>{student.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Report;
