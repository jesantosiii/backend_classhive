import React from "react";
import Sidebar from "@/components/ui/sidebarupdated";
import { PfTopBar } from "@/components/ui/profile topbar";
import { ProfilePage } from "../Components/profile-page";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-white relative">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-[270px]">
        <PfTopBar />
        <main className="relative flex-1 p-6 bg-gray-50">
          <ProfilePage />
        </main>
      </div>
    </div>
  );
};

export default App;

