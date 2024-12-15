import React from "react";
import Sidebar from "@/components/ui/sidebarupdated";
import { TopBar } from "@/components/ui/topbar";
import Quiz from '../../teacherside_components/Components/quiz-creation'

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-white relative">
      <Sidebar/>
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBar />
        <main className="relative flex-1 p-6 bg-gray-50">
          <Quiz/>
        </main>
      </div>
    </div>
  );
};

export default App;

