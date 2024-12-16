import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarStudent from "@/components/ui/studentsidebar";
import { TopBarStudent } from "@/components/ui/topbar-student";
import { QuizCard } from "@/studentside_components/Components/classwork-card";
import { ClassHeader } from "@/teacherside_components/Components/class-header.tsx";
import { getTokens } from "../../../config.ts";

interface Quiz {
  id: number;
  name: string;
  description: string; // Added description to match backend response
}

const App: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const tokens = getTokens();
      if (!tokens) {
        console.error("No tokens available, user might not be authenticated.");
        return;
      }

      try {
        // Fetch all quizzes from the correct endpoint
        const response = await axios.get("http://127.0.0.1:8000/quizzes/api/student/quizzes/", {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });
        console.log(response.data);
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleStartQuiz = (quizId: number) => {
    console.log("Starting quiz with ID:", quizId);
    // Navigate to quiz-taking page or perform another action
  };

  return (
    <div className="min-h-screen flex bg-white relative">
      <SidebarStudent />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBarStudent />
        <main className="relative flex-1 p-6 bg-gray-50">
          <div className="w-full max-w-4xl mx-auto space-y-6">
            <ClassHeader />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  name={quiz.name}
                  description={quiz.description} // Pass description to the QuizCard
                  onStart={() => handleStartQuiz(quiz.id)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
