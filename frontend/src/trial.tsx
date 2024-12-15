import React from "react";
import SidebarStudent from "@/components/ui/studentsidebar";
import { TopBarStudent } from "@/components/ui/topbar-student";
import Take from "@/studentside_components/Components/quiz_taking"

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-white relative">
      <SidebarStudent />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBarStudent />
        <main className="relative flex-1 p-6 bg-gray-50">
        <Take/>
        </main>
      </div>
    </div>
  );
};

export default App;