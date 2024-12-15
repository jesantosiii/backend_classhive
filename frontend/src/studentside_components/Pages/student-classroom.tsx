import React from "react";
import SidebarStudent from "@/components/ui/studentsidebar";
import { TopBarStudent } from "@/components/ui/topbar-student";
import LogoL from '../../assets/Logo/Classhive L.png'

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-white relative">
      <SidebarStudent />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBarStudent />
        <main className="flex-1 flex flex-col justify-center items-center">
          <div className="-mb-10 -translate-y-20">
            <img src={LogoL} alt="Logo" className="w-[300px] h-[300px] object-contain" />
          </div>
          <div className="text-center mb-3 -translate-y-20">
            <h1 className="text-gray-600 text-lg font-medium">
              Join a Class to get started!
            </h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
