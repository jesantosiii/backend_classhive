import React from "react";

import { TopBar } from "../../components/ui/topbar";
import Sidebar from "../../components/ui/sidebarupdated";
import Report from "./classroom-report";



const App: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-white relative">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBar />
        <main className="relative flex-1 p-6 bg-gray-50">
        <Report/>
        </main>
      </div>
    </div>
  );
};

export default App;