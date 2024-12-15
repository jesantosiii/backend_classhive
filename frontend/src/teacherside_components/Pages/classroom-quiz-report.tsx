import React from "react";
import Sidebar from "@/components/ui/sidebarupdated";
import { TopBar } from "@/components/ui/topbar";
import QuizReport from "../Components/class-report";
import Quiz from '../Components/quiz-creation'

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-white relative">
      <Sidebar/>
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBar />
        <main className="relative flex-1 p-6 bg-gray-50">
          <QuizReport/>
        </main>
      </div>
    </div>
  );
};

export default App;

