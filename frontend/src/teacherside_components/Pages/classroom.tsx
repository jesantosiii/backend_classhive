import React, { useState } from "react";
import Sidebar from "@/components/ui/sidebarupdated";
import { TopBar } from "@/components/ui/topbar";
import LogoL from "../../assets/Logo/Classhive L.png";
import { Button } from "@/components/ui/button";
import CreateClassForm from "../Components/create-class";

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const closeForm = () => setShowForm(false);

  return (
    <div className="min-h-screen flex bg-white relative">
      <Sidebar />
      <div className="flex flex-col flex-1 msl-[270px]">
        <TopBar />
        <main className="flex-1 flex flex-col justify-center items-center">
          <div className="-mb-10 -translate-y-20">
            <img src={LogoL} alt="Logo" className="w-[300px] h-[300px] object-contain" />
          </div>
          <div className="text-center mb-3 -translate-y-20">
            <h1 className="text-gray-600 text-lg font-medium">
              Create a class to get started
            </h1>
          </div>
          <div className="-translate-y-20">
            <Button
              variant="ghost"
              className="w-32 h-11 bg-[#496089] text-white rounded-xl"
              onClick={() => setShowForm(true)}
            >
              Create Class
            </Button>
          </div>
        </main>
      </div>

      {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeForm} 
        >
          <div
            className="relative bg-white rounded-2xl shadow-lg max-w-3xl w-full overflow-hidden"
            style={{
              marginLeft: "calc(var(--sidebar-width) + 50px)", 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <CreateClassForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
